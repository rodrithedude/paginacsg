import site from '../data/site.json';

export type Lang = 'es' | 'en';
export type PageKey = 'home' | 'projects' | 'clients' | 'notFound';

/** Rutas equivalentes en cada idioma (para el selector de idioma y hreflang). */
export const routes: Record<PageKey, Record<Lang, string>> = {
  home: { es: '/', en: '/en/' },
  projects: { es: '/proyectos/', en: '/en/projects/' },
  clients: { es: '/clientes/', en: '/en/clients/' },
  notFound: { es: '/404/', en: '/404/' },
};

/** Anclas de las secciones de la página de inicio. */
export const anchors: Record<Lang, Record<'services' | 'about' | 'work' | 'clients' | 'contact', string>> = {
  es: { services: 'servicios', about: 'nosotros', work: 'proyectos', clients: 'clientes', contact: 'contacto' },
  en: { services: 'services', about: 'about', work: 'projects', clients: 'clients', contact: 'contact' },
};

/** Años completos desde la fundación (se recalcula también en el navegador). */
export function yearsSince(isoDate: string, now = new Date()): number {
  const d = new Date(isoDate + 'T00:00:00');
  let y = now.getFullYear() - d.getFullYear();
  const beforeAnniversary =
    now.getMonth() < d.getMonth() || (now.getMonth() === d.getMonth() && now.getDate() < d.getDate());
  if (beforeAnniversary) y -= 1;
  return y;
}

export const foundingYear = Number(site.foundingDate.slice(0, 4));

export function formatDuration(months: number, lang: Lang): string {
  const whole = Math.floor(months);
  const half = months - whole >= 0.5;
  const y = Math.floor(whole / 12);
  const m = whole % 12;
  const L =
    lang === 'es'
      ? { y1: 'año', yN: 'años', m1: 'mes', mN: 'meses' }
      : { y1: 'year', yN: 'years', m1: 'month', mN: 'months' };
  const parts: string[] = [];
  if (y) parts.push(`${y} ${y === 1 ? L.y1 : L.yN}`);
  if (m || half) {
    const label = m === 1 && !half ? L.m1 : L.mN;
    parts.push(`${m}${half ? '½' : ''} ${label}`);
  }
  return parts.join(lang === 'es' ? ' y ' : ' ');
}

export const ui = {
  es: {
    locale: 'es-GT',
    skip: 'Saltar al contenido',
    nav: {
      home: 'Inicio',
      services: 'Servicios',
      about: 'Nosotros',
      projects: 'Proyectos',
      clients: 'Clientes',
      contact: 'Contacto',
      menu: 'Menú',
      close: 'Cerrar',
      menuLabel: 'Menú principal',
      main: 'Secciones',
      footer: 'Pie de página',
      homeAria: `${site.brand}, ir al inicio`,
    },
    langSwitch: { label: 'English', short: 'EN', aria: 'View this page in English' },
    meta: {
      homeTitle: `${site.brand} | Construcción de obras de ingeniería civil en Guatemala`,
      homeDesc: `${site.name} (${site.brand}): pavimentos, control de márgenes fluviales, movimientos de tierra, obra civil y urbanización en Guatemala desde ${site.foundingDate.slice(0, 4)}.`,
      projectsTitle: `Proyectos | ${site.brand}`,
      projectsDesc:
        'Carreteras, calles, control de ríos, movimientos de tierra y obra civil para el sector público, municipalidades y empresas privadas de Guatemala.',
      clientsTitle: `Clientes | ${site.brand}`,
      clientsDesc: `Ministerios, municipalidades y empresas privadas que han confiado en ${site.brand} para construir obras de ingeniería civil en Guatemala.`,
    },
    hero: {
      since: (y: number) => `Desde ${y}`,
      title: 'Eficiencia desde el primer metro hasta el último.',
      lead: 'Construimos carreteras, controlamos ríos y movemos tierra para el sector público, las municipalidades y la empresa privada.',
      note: 'Siete líneas de trabajo con un mismo estándar: personal calificado, maquinaria propia y control estricto de cada etapa.',
      code: 'GT-01',
      cta: 'Ver proyectos',
      photoAlt: `Maquinaria de ${site.brand} trabajando en una obra`,
      photoLabel: 'Foto principal',
    },
    stats: {
      aria: `${site.brand} en cifras`,
      years: 'Años de experiencia',
      projects: 'Proyectos completados',
      employees: 'Colaboradores',
      founded: 'Año de fundación',
    },
    about: {
      eyebrow: 'Nosotros',
      title: 'Una constructora guatemalteca con forma de trabajar propia.',
      p1: `${site.name} es una empresa guatemalteca fundada el 13 de abril de 2000, dedicada a la construcción de obras de ingeniería civil. Desde su inicio, los fundadores tenían una idea clara de la empresa que establecerían: una constructora de carreteras con una visión y una forma de trabajar totalmente diferentes en el país, que buscara siempre la excelencia a través de personal altamente calificado y el equipo más moderno. Su actividad se ha orientado mayormente a la construcción de vialidad en el ámbito regional.`,
    },
    services: {
      eyebrow: 'Servicios',
      title: 'Siete líneas de trabajo, un mismo estándar.',
      lead: 'Desde el control de ríos hasta la urbanización, cada obra se ejecuta con personal calificado, maquinaria propia y control estricto de cada etapa.',
      seeProjects: (n: number) => `Ver obras (${n})`,
      noProjects: 'Consúltenos',
      ctaTitle: '¿Su obra no aparece aquí?',
      ctaText: 'Cuéntenos qué necesita construir y lo revisamos con usted.',
    },
    principles: {
      eyebrow: 'Cómo trabajamos',
      title: 'Personas, maquinaria y control en cada etapa.',
      items: [
        {
          title: 'Misión',
          text: 'Proporcionar a nuestros clientes servicios dinámicos y eficientes, administrados bajo estrictos controles y con calidad total.',
        },
        {
          title: 'Visión',
          text: 'Consolidar nuestra empresa como la constructora con el sistema operativo más eficaz de Centroamérica.',
        },
        {
          title: 'Nuestro equipo',
          text: 'La empresa opera con más de 400 empleados, entre ellos profesionales de diversas ramas con formación técnica multidisciplinaria y vasta experiencia. Todos forman el equipo necesario para realizar grandes obras.',
        },
        {
          title: 'Instalaciones y campamentos',
          text: 'Nuestras oficinas están en la Avenida Las Américas de la ciudad capital. Contamos con un predio que sirve de taller y almacén, donde se da mantenimiento a la maquinaria. Según la ubicación y el tamaño de cada proyecto, establecemos oficinas, talleres y campamentos temporales en el lugar de trabajo.',
        },
      ],
      photoAlt: `Equipo de ${site.brand} en obra`,
    },
    work: {
      eyebrow: 'Proyectos',
      title: 'Obras que hablan por nosotros.',
      lead: 'Una muestra de los proyectos que hemos ejecutado en todo el país.',
      all: (n: number) => `Ver los ${n} proyectos`,
      photoPending: 'Foto de obra',
      prev: 'Proyecto anterior',
      next: 'Proyecto siguiente',
      track: 'Proyectos destacados (desplazable)',
      more: (name: string) => `Ver más proyectos de ${name}`,
    },
    clients: {
      eyebrow: 'Clientes',
      title: 'Han confiado en nosotros.',
      lead: (n: number) => `${n} instituciones y empresas del sector público y privado.`,
      all: 'Ver todos los clientes',
      sectors: { publico: 'Sector público', municipal: 'Municipalidades', privado: 'Sector privado' },
      projectsCount: (n: number) => (n === 1 ? '1 proyecto' : `${n} proyectos`),
    },
    cta: {
      kicker: 'Personal calificado, maquinaria propia y control estricto en cada etapa, desde el primer metro hasta el último.',
      title: 'Construyamos juntos su próximo proyecto.',
      button: 'Contáctenos',
    },
    contact: {
      eyebrow: 'Contacto',
      title: '¿Tiene un proyecto en mente?',
      lead: 'Llámenos o escríbanos y con gusto atenderemos sus preguntas, comentarios e inquietudes.',
      office: 'Oficina principal',
      phone: 'PBX',
      email: 'Correo',
      map: 'Ver en Google Maps',
      jobsTitle: 'Empleos',
      jobsField: 'Trabajo de campo: preséntese en nuestras oficinas con los documentos pertinentes.',
      jobsOffice: 'Trabajo de oficina: envíe su CV y carta de recomendación a',
    },
    form: {
      title: 'Solicitud de cotización',
      name: 'Nombre',
      company: 'Empresa o institución',
      email: 'Correo',
      phone: 'Teléfono',
      type: 'Tipo de obra',
      other: 'Otro',
      message: 'Mensaje',
      submit: 'Enviar solicitud',
      required: 'Revise los campos marcados con *.',
      opening: 'Abriendo su correo para enviar la solicitud…',
      subject: 'Solicitud de cotización',
      labels: { name: 'Nombre', company: 'Empresa', email: 'Correo', phone: 'Teléfono', type: 'Tipo de obra' },
    },
    projectsPage: {
      eyebrow: 'Proyectos',
      title: 'Nuestras obras.',
      lead: (n: number, pub: number, muni: number, priv: number) =>
        `${n} proyectos para el sector público (${pub}), municipalidades (${muni}) y empresas privadas (${priv}).`,
      filterService: 'Tipo de obra',
      filterSector: 'Sector',
      all: 'Todos',
      search: 'Buscar',
      searchPlaceholder: 'Río, carretera, municipio…',
      showing: (a: number, b: number) => `Mostrando ${a} de ${b} proyectos`,
      none: 'No hay proyectos con esos filtros.',
      reset: 'Quitar filtros',
      duration: 'Duración',
      client: 'Cliente',
      work: 'Obra',
      type: 'Tipo',
      listTitle: 'Lista de proyectos',
      filtersAria: 'Filtrar proyectos',
      note: 'Esta lista recoge una selección de los más de 200 proyectos completados.',
    },
    clientsPage: {
      eyebrow: 'Clientes',
      title: 'Quiénes han confiado en nosotros.',
      lead: 'Ministerios, entidades de gobierno, municipalidades y empresas privadas de Guatemala.',
      cta: (n: number) => (n === 1 ? 'Ver 1 proyecto' : `Ver ${n} proyectos`),
    },
    footer: {
      rights: 'Todos los derechos reservados.',
      tagline: 'Construcción de obras de ingeniería civil en Guatemala.',
    },
    notFound: {
      title: 'Página no encontrada',
      lead: 'La página que busca no existe o cambió de dirección.',
      back: 'Volver al inicio',
    },
  },
  en: {
    locale: 'en',
    skip: 'Skip to content',
    nav: {
      home: 'Home',
      services: 'Services',
      about: 'About us',
      projects: 'Projects',
      clients: 'Clients',
      contact: 'Contact',
      menu: 'Menu',
      close: 'Close',
      menuLabel: 'Main menu',
      main: 'Sections',
      footer: 'Footer',
      homeAria: `${site.brand}, go to home page`,
    },
    langSwitch: { label: 'Español', short: 'ES', aria: 'Ver esta página en español' },
    meta: {
      homeTitle: `${site.brand} | Civil engineering construction in Guatemala`,
      homeDesc: `${site.name} (${site.brand}): paving, river control, earthworks, civil works and urban development in Guatemala since ${site.foundingDate.slice(0, 4)}.`,
      projectsTitle: `Projects | ${site.brand}`,
      projectsDesc:
        'Highways, streets, river control, earthworks and civil works for Guatemala’s public sector, municipalities and private companies.',
      clientsTitle: `Clients | ${site.brand}`,
      clientsDesc: `Ministries, municipalities and private companies that have trusted ${site.brand} to build civil engineering works in Guatemala.`,
    },
    hero: {
      since: (y: number) => `Since ${y}`,
      title: 'Efficiency from the first meter to the last.',
      lead: 'We build roads, control rivers and move earth for the public sector, municipalities and private companies.',
      note: 'Seven lines of work, one standard: qualified people, our own machinery and strict control at every stage.',
      code: 'GT-01',
      cta: 'See our projects',
      photoAlt: `${site.brand} machinery working on site`,
      photoLabel: 'Main photo',
    },
    stats: {
      aria: `${site.brand} in numbers`,
      years: 'Years of experience',
      projects: 'Completed projects',
      employees: 'Employees',
      founded: 'Year founded',
    },
    about: {
      eyebrow: 'About us',
      title: 'A Guatemalan builder with its own way of working.',
      p1: `${site.name} is a Guatemalan company founded on April 13, 2000, dedicated to building civil engineering works. From the start, its founders had a clear idea of the company they wanted: a road builder with a vision and a way of working unlike any other in the country, always pursuing excellence through highly qualified people and the most modern equipment. Its work has focused mainly on road construction across the region.`,
    },
    services: {
      eyebrow: 'Services',
      title: 'Seven lines of work, one standard.',
      lead: 'From river control to urban development, every project is delivered by qualified people, with our own machinery and strict control at every stage.',
      seeProjects: (n: number) => `See projects (${n})`,
      noProjects: 'Ask us',
      ctaTitle: 'Not seeing your project?',
      ctaText: 'Tell us what you need to build and we will review it with you.',
    },
    principles: {
      eyebrow: 'How we work',
      title: 'People, machinery and control at every stage.',
      items: [
        {
          title: 'Mission',
          text: 'To provide our clients with dynamic, efficient services, managed under strict controls and with total quality.',
        },
        {
          title: 'Vision',
          text: 'To become the construction company with the most effective operating system in Central America.',
        },
        {
          title: 'Our team',
          text: 'The company employs more than 400 people, including professionals from many fields with multidisciplinary technical training and extensive experience. Together they form the team needed to deliver large-scale works.',
        },
        {
          title: 'Facilities and site camps',
          text: 'Our offices are on Avenida Las Américas in Guatemala City. We also have a yard that serves as workshop and warehouse, where our machinery is maintained. Depending on the location and size of each project, we set up temporary offices, workshops and camps on site.',
        },
      ],
      photoAlt: `${site.brand} team on site`,
    },
    work: {
      eyebrow: 'Projects',
      title: 'Work that speaks for us.',
      lead: 'A sample of the projects we have delivered across the country.',
      all: (n: number) => `See all ${n} projects`,
      photoPending: 'Project photo',
      prev: 'Previous project',
      next: 'Next project',
      track: 'Featured projects (scrollable)',
      more: (name: string) => `See more projects for ${name}`,
    },
    clients: {
      eyebrow: 'Clients',
      title: 'They have trusted us.',
      lead: (n: number) => `${n} public and private institutions and companies.`,
      all: 'See all clients',
      sectors: { publico: 'Public sector', municipal: 'Municipalities', privado: 'Private sector' },
      projectsCount: (n: number) => (n === 1 ? '1 project' : `${n} projects`),
    },
    cta: {
      kicker: 'Qualified people, our own machinery and strict control at every stage, from the first meter to the last.',
      title: 'Let’s build your next project together.',
      button: 'Contact us',
    },
    contact: {
      eyebrow: 'Contact',
      title: 'Have a project in mind?',
      lead: 'Call or write to us and we will gladly answer your questions and comments.',
      office: 'Head office',
      phone: 'Phone',
      email: 'Email',
      map: 'Open in Google Maps',
      jobsTitle: 'Careers',
      jobsField: 'Field positions: apply in person at our offices with the relevant documents.',
      jobsOffice: 'Office positions: send your CV and a letter of recommendation to',
    },
    form: {
      title: 'Request a quote',
      name: 'Name',
      company: 'Company or institution',
      email: 'Email',
      phone: 'Phone',
      type: 'Type of work',
      other: 'Other',
      message: 'Message',
      submit: 'Send request',
      required: 'Please check the fields marked with *.',
      opening: 'Opening your email app to send the request…',
      subject: 'Quote request',
      labels: { name: 'Name', company: 'Company', email: 'Email', phone: 'Phone', type: 'Type of work' },
    },
    projectsPage: {
      eyebrow: 'Projects',
      title: 'Our work.',
      lead: (n: number, pub: number, muni: number, priv: number) =>
        `${n} projects for the public sector (${pub}), municipalities (${muni}) and private companies (${priv}).`,
      filterService: 'Type of work',
      filterSector: 'Sector',
      all: 'All',
      search: 'Search',
      searchPlaceholder: 'River, highway, town…',
      showing: (a: number, b: number) => `Showing ${a} of ${b} projects`,
      none: 'No projects match those filters.',
      reset: 'Clear filters',
      duration: 'Duration',
      client: 'Client',
      work: 'Project',
      type: 'Type',
      listTitle: 'Project list',
      filtersAria: 'Filter projects',
      note: 'This list is a selection of our more than 200 completed projects.',
    },
    clientsPage: {
      eyebrow: 'Clients',
      title: 'Who has trusted us.',
      lead: 'Ministries, government agencies, municipalities and private companies in Guatemala.',
      cta: (n: number) => (n === 1 ? 'See 1 project' : `See ${n} projects`),
    },
    footer: {
      rights: 'All rights reserved.',
      tagline: 'Civil engineering construction in Guatemala.',
    },
    notFound: {
      title: 'Page not found',
      lead: 'The page you are looking for does not exist or has moved.',
      back: 'Back to home',
    },
  },
} as const;

export function t(lang: Lang) {
  return ui[lang];
}
