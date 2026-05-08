/**
 * Rebuilds the Starlight Table of Contents to reflect the active register.
 *
 * Starlight generates the ToC at build time from all headings in the page.
 * When register content is toggled via CSS visibility, the ToC still shows
 * headings from the hidden register. This function scans the visible
 * register's content block and rebuilds the ToC list to match.
 */

export function rebuildToc(): void {
  const tocNavs = document.querySelectorAll(
    'starlight-toc nav > ul, mobile-starlight-toc nav > ul',
  );
  if (tocNavs.length === 0) return;

  const register = document.documentElement.dataset.register || 'practitioner';
  const defaultRegister = document.documentElement.dataset.registerDefault || 'practitioner';
  const content =
    document.querySelector(`[data-register-content="${register}"]`) ??
    document.querySelector(`[data-register-content="${defaultRegister}"]`);
  if (!content) return;

  const headings = content.querySelectorAll('h2, h3');
  if (headings.length === 0) return;

  tocNavs.forEach((tocNav) => {
    tocNav.innerHTML = '';
    let currentH2Li: HTMLLIElement | null = null;

    headings.forEach((h) => {
      if (!h.id || !h.textContent) return;
      const li = document.createElement('li');
      const a = document.createElement('a');
      const targetId = h.id;
      a.href = `#${targetId}`;
      a.textContent = h.textContent.trim();
      a.addEventListener('click', (event) => {
        event.preventDefault();

        const selector = `#${CSS.escape(targetId)}`;
        const target = content.querySelector(selector);
        if (!(target instanceof HTMLElement)) return;

        target.scrollIntoView({ block: 'start' });
        history.replaceState(null, '', `#${targetId}`);
      });

      if (h.tagName === 'H3' && currentH2Li) {
        let sub = currentH2Li.querySelector(':scope > ul');
        if (!sub) {
          sub = document.createElement('ul');
          currentH2Li.appendChild(sub);
        }
        li.appendChild(a);
        sub.appendChild(li);
      } else {
        li.appendChild(a);
        tocNav.appendChild(li);
        if (h.tagName === 'H2') currentH2Li = li;
      }
    });
  });
}
