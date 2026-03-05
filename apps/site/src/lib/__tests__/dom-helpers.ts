export const createHeading = (tag: 'h2' | 'h3', id: string, text: string): HTMLElement => {
  const el = document.createElement(tag);
  el.id = id;
  el.textContent = text;
  return el;
};

export const createRegisterContent = (
  register: string,
  headings: Array<{ tag: 'h2' | 'h3'; id: string; text: string }>,
): HTMLElement => {
  const div = document.createElement('div');
  div.setAttribute('data-register-content', register);
  for (const h of headings) {
    div.appendChild(createHeading(h.tag, h.id, h.text));
  }
  return div;
};

export const createTocNav = (): HTMLElement => {
  const starlight = document.createElement('starlight-toc');
  const nav = document.createElement('nav');
  const ul = document.createElement('ul');
  nav.appendChild(ul);
  starlight.appendChild(nav);
  document.body.appendChild(starlight);
  return ul;
};

export const setRegisterAttribute = (register: string): void => {
  document.documentElement.dataset.register = register;
};
