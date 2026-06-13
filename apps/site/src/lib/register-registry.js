/**
 * Reading-register registry and availability helpers.
 *
 * This module is plain JavaScript so it can be imported by Astro config through
 * `route-map.js` and by browser-side TypeScript. Keep it small and dependency
 * free.
 */

export const READING_REGISTERS = Object.freeze(['everyday', 'orientation', 'practitioner']);

export const DEFAULT_REGISTER = 'practitioner';

export const EVERYDAY_UNAVAILABLE_MESSAGE = 'Everyday is not available for this page yet.';
export const EVERYDAY_TO_ORIENTATION_FALLBACK_MESSAGE =
  'Everyday is not available for this page yet. Showing Orientation instead.';

// `DEFAULT_REGISTER` (practitioner) is the no-JS / pre-paint substrate and the
// ultimate parse fallback. The page-level default is the gentlest register a
// page can actually render: everyday where it exists, otherwise orientation.
// These two values intentionally differ. Do not collapse `defaultRegister` back
// to `DEFAULT_REGISTER`.
export const DEFAULT_REGISTER_AVAILABILITY = Object.freeze({
  defaultRegister: 'orientation',
  available: Object.freeze(['practitioner', 'orientation']),
  absent: Object.freeze({
    everyday: EVERYDAY_UNAVAILABLE_MESSAGE,
  }),
});

export const isReadingRegister = (value) =>
  typeof value === 'string' && READING_REGISTERS.includes(value);

const uniqueRegisters = (values) =>
  Object.freeze([...new Set(values.filter((value) => isReadingRegister(value)))]);

export const normalizeRegisterAvailability = (availability = DEFAULT_REGISTER_AVAILABILITY) => {
  const available = uniqueRegisters(
    availability.available ?? DEFAULT_REGISTER_AVAILABILITY.available,
  );
  const defaultRegister = available.includes(availability.defaultRegister)
    ? availability.defaultRegister
    : available.includes(DEFAULT_REGISTER)
      ? DEFAULT_REGISTER
      : (available[0] ?? DEFAULT_REGISTER);
  const absent = Object.freeze(
    Object.fromEntries(
      Object.entries(availability.absent ?? {}).filter(([register]) => isReadingRegister(register)),
    ),
  );

  return Object.freeze({
    defaultRegister,
    available,
    absent,
  });
};

const createResolution = ({ register, requested, reason, message, availability }) =>
  Object.freeze({
    register,
    resolved: register,
    requested,
    reason,
    fallbackReason: reason,
    message,
    fallbackMessage: message,
    availability,
  });

export const resolveRegister = (value, availability = DEFAULT_REGISTER_AVAILABILITY) => {
  const normalizedAvailability = normalizeRegisterAvailability(availability);
  const requested = isReadingRegister(value) ? value : null;

  if (requested && normalizedAvailability.available.includes(requested)) {
    return createResolution({
      register: requested,
      requested,
      reason: null,
      message: null,
      availability: normalizedAvailability,
    });
  }

  if (requested === 'everyday' && normalizedAvailability.available.includes('orientation')) {
    return createResolution({
      register: 'orientation',
      requested,
      reason: 'unavailable',
      message: EVERYDAY_TO_ORIENTATION_FALLBACK_MESSAGE,
      availability: normalizedAvailability,
    });
  }

  const register = normalizedAvailability.defaultRegister;
  // A fresh visitor provides no register (no `?register=` and no stored value).
  // That is the normal default, not an error, so it stays silent. Only an
  // actually provided, non-empty value that is not a reading register is
  // genuinely "unknown" and earns a visible notice.
  const hasUnknownRequest = !requested && typeof value === 'string' && value.trim() !== '';
  const reason = requested ? 'unavailable' : hasUnknownRequest ? 'unknown' : null;
  const message = requested
    ? (normalizedAvailability.absent[requested] ?? `${requested} is not available for this page.`)
    : hasUnknownRequest
      ? 'Unknown register requested. Showing the default register.'
      : null;

  return createResolution({
    register,
    requested,
    reason,
    message,
    availability: normalizedAvailability,
  });
};
