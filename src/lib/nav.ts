import { anchors, routes, t, type Lang, type PageKey } from '../i18n/ui';

/** Enlaces de navegación y del selector de idioma para una página. */
export function navFor(lang: Lang, page: PageKey) {
  const s = t(lang);
  const a = anchors[lang];
  const home = routes.home[lang];
  const anchor = (id: string) => (page === 'home' ? `#${id}` : `${home}#${id}`);
  const other: Lang = lang === 'es' ? 'en' : 'es';

  return {
    home,
    contact: anchor(a.contact),
    links: [
      { href: page === 'home' ? '#inicio' : home, label: s.nav.home, current: false },
      { href: anchor(a.services), label: s.nav.services, current: false },
      { href: anchor(a.about), label: s.nav.about, current: false },
      { href: routes.projects[lang], label: s.nav.projects, current: page === 'projects' },
      { href: routes.clients[lang], label: s.nav.clients, current: page === 'clients' },
      { href: anchor(a.contact), label: s.nav.contact, current: false },
    ],
    lang: {
      other,
      href: page === 'notFound' ? routes.home[other] : routes[page][other],
      ...s.langSwitch,
    },
  };
}
