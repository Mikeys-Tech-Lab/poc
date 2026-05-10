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

export const DEFAULT_REGISTER_AVAILABILITY = Object.freeze({
  defaultRegister: DEFAULT_REGISTER,
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
  const reason = requested ? 'unavailable' : 'unknown';
  const message = requested
    ? (normalizedAvailability.absent[requested] ?? `${requested} is not available for this page.`)
    : 'Unknown register requested. Showing the default register.';

  return createResolution({
    register,
    requested,
    reason,
    message,
    availability: normalizedAvailability,
  });
};
