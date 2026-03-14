export const buildShareUrl = (href: string): string => {
  const url = new URL(href);
  url.hash = '';
  return url.toString();
};
