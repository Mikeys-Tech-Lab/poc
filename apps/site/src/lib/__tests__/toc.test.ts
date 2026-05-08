// @vitest-environment happy-dom
import { beforeEach, describe, expect, it } from 'vitest';
import { rebuildToc } from '../toc';
import { createRegisterContent, createTocNav, setRegisterAttribute } from './dom-helpers';

describe('rebuildToc', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    delete document.documentElement.dataset.register;
  });

  it('does nothing when ToC nav is absent', () => {
    rebuildToc();
    expect(document.body.innerHTML).toBe('');
  });

  it('does nothing when register content block is absent', () => {
    createTocNav();
    setRegisterAttribute('practitioner');

    rebuildToc();

    const items = document.querySelectorAll('starlight-toc nav > ul > li');
    expect(items.length).toBe(0);
  });

  it('rebuilds ToC from h2 headings', () => {
    const tocUl = createTocNav();
    tocUl.innerHTML = '<li><a href="#old">Old</a></li>';

    const content = createRegisterContent('practitioner', [
      { tag: 'h2', id: 'overview', text: 'Overview' },
      { tag: 'h2', id: 'details', text: 'Details' },
    ]);
    document.body.appendChild(content);
    setRegisterAttribute('practitioner');

    rebuildToc();

    const items = document.querySelectorAll('starlight-toc nav > ul > li');
    expect(items.length).toBe(2);
    expect(items[0].querySelector('a')?.getAttribute('href')).toBe('#overview');
    expect(items[0].querySelector('a')?.textContent).toBe('Overview');
    expect(items[1].querySelector('a')?.getAttribute('href')).toBe('#details');
  });

  it('rebuilds desktop and mobile ToC surfaces', () => {
    const desktopToc = createTocNav();
    const mobileToc = createTocNav('mobile-starlight-toc');
    desktopToc.innerHTML = '<li><a href="#old">Old</a></li>';
    mobileToc.innerHTML = '<li><a href="#old">Old</a></li>';

    const content = createRegisterContent('orientation', [
      { tag: 'h2', id: 'orientation-heading', text: 'Orientation Heading' },
    ]);
    document.body.appendChild(content);
    setRegisterAttribute('orientation');

    rebuildToc();

    expect(desktopToc.querySelector('a')?.getAttribute('href')).toBe('#orientation-heading');
    expect(mobileToc.querySelector('a')?.getAttribute('href')).toBe('#orientation-heading');
  });

  it('nests h3 under preceding h2', () => {
    createTocNav();
    const content = createRegisterContent('practitioner', [
      { tag: 'h2', id: 'section', text: 'Section' },
      { tag: 'h3', id: 'subsection', text: 'Subsection' },
    ]);
    document.body.appendChild(content);
    setRegisterAttribute('practitioner');

    rebuildToc();

    const topItems = document.querySelectorAll('starlight-toc nav > ul > li');
    expect(topItems.length).toBe(1);
    const nested = topItems[0].querySelectorAll('ul > li');
    expect(nested.length).toBe(1);
    expect(nested[0].querySelector('a')?.getAttribute('href')).toBe('#subsection');
  });

  it('uses the active register content block', () => {
    createTocNav();
    const practitioner = createRegisterContent('practitioner', [
      { tag: 'h2', id: 'p-heading', text: 'Practitioner Heading' },
    ]);
    const orientation = createRegisterContent('orientation', [
      { tag: 'h2', id: 'o-heading', text: 'Orientation Heading' },
    ]);
    document.body.appendChild(practitioner);
    document.body.appendChild(orientation);
    setRegisterAttribute('orientation');

    rebuildToc();

    const items = document.querySelectorAll('starlight-toc nav > ul > li');
    expect(items.length).toBe(1);
    expect(items[0].querySelector('a')?.textContent).toBe('Orientation Heading');
  });

  it('falls back to the default register content block when active content is absent', () => {
    createTocNav();
    const practitioner = createRegisterContent('practitioner', [
      { tag: 'h2', id: 'p-heading', text: 'Practitioner Heading' },
    ]);
    document.body.appendChild(practitioner);
    setRegisterAttribute('everyday');
    document.documentElement.dataset.registerDefault = 'practitioner';

    rebuildToc();

    const items = document.querySelectorAll('starlight-toc nav > ul > li');
    expect(items.length).toBe(1);
    expect(items[0].querySelector('a')?.textContent).toBe('Practitioner Heading');
  });

  it('skips headings without id or text', () => {
    createTocNav();
    const content = createRegisterContent('practitioner', [
      { tag: 'h2', id: '', text: 'No ID' },
      { tag: 'h2', id: 'valid', text: 'Valid' },
    ]);
    document.body.appendChild(content);
    setRegisterAttribute('practitioner');

    rebuildToc();

    const items = document.querySelectorAll('starlight-toc nav > ul > li');
    expect(items.length).toBe(1);
    expect(items[0].querySelector('a')?.textContent).toBe('Valid');
  });

  it('does nothing when headings list is empty', () => {
    const tocUl = createTocNav();
    tocUl.innerHTML = '<li><a href="#old">Old</a></li>';
    const content = createRegisterContent('practitioner', []);
    document.body.appendChild(content);
    setRegisterAttribute('practitioner');

    rebuildToc();

    expect(tocUl.innerHTML).toBe('<li><a href="#old">Old</a></li>');
  });
});
