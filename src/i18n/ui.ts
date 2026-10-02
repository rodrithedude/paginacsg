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
      homeDesc: `${site.name} (${site.brand}): pavimentos, movimientos de tierra y excavación de sótanos, obra civil para vivienda y edificios, estructuras metálicas, diseño estructural y manejo de cuencas en Guatemala desde ${site.foundingDate.slice(0, 4)}.`,
      projectsTitle: `Proyectos | ${site.brand}`,
      projectsDesc:
        'Carreteras, calles, control de ríos, movimientos de tierra y obra civil para el sector público, municipalidades y empresas privadas de Guatemala.',
      clientsTitle: `Clientes | ${site.brand}`,
      clientsDesc: `Ministerios, municipalidades y empresas privadas que han confiado en ${site.brand} para construir obras de ingeniería civil en Guatemala.`,
    },
    hero: {
      since: (y: number) => `Desde ${y}`,
      title: 'Eficiencia desde el primer metro hasta el último.',
      lead: 'Pavimentamos carreteras, movemos tierra, excavamos sótanos y levantamos edificios para el sector público, las municipalidades y la empresa privada.',
      note: 'Seis líneas de trabajo con un mismo estándar: personal calificado, maquinaria propia y control estricto de cada etapa.',
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
      p1: 'Somos una empresa guatemalteca fundada el 28 de junio de 2000 y nos dedicamos a diversas ramas de la ingeniería civil. Con más de 25 años de experiencia, garantizamos a nuestros clientes la capacidad de desarrollar sus proyectos con la más alta calidad y responsabilidad, desde el primer metro de construcción hasta el último. Desde el inicio buscamos la excelencia a través de personal altamente calificado y el equipo más moderno.',
    },
    services: {
      eyebrow: 'Servicios',
      title: 'Seis líneas de trabajo, un mismo estándar.',
      lead: 'Desde el diseño de pavimentos hasta el manejo de cuencas hídricas, cada obra se ejecuta con personal calificado, maquinaria propia y control estricto de cada etapa.',
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
      more: (name: string) => `Ver fotos de ${name}`,
      filterAria: 'Filtrar obras por tipo',
      filterAll: 'Todas',
      photos: (n: number) => (n === 1 ? '1 foto' : `${n} fotos`),
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
      mapTitle: 'Mapa: oficina principal de CSG',
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
      lead: (n: number, withPhotos: number) =>
        `${n} proyectos de pavimentación, movimiento de tierra, obra civil y manejo de cuencas; ${withPhotos} con fotografías.`,
      filterService: 'Tipo de obra',
      filterSector: 'Sector',
      all: 'Todos',
      search: 'Buscar',
      searchPlaceholder: 'Río, carretera, municipio…',
      showing: (a: number, b: number) => `Mostrando ${a} de ${b} proyectos`,
      none: 'No hay proyectos con esos filtros.',
      reset: 'Quitar filtros',
      client: 'Cliente',
      work: 'Obra',
      type: 'Tipo',
      listTitle: 'Lista de proyectos',
      photosTitle: 'Obras con fotografías',
      moreTitle: 'Más proyectos',
      filtersAria: 'Filtrar proyectos',
      note: 'Esta lista recoge una selección de los más de 200 proyectos completados.',
    },
    clientsPage: {
      eyebrow: 'Clientes',
      title: 'Quiénes han confiado en nosotros.',
      lead: 'Ministerios, entidades de gobierno, municipalidades y empresas privadas de Guatemala.',
      cta: (n: number) => (n === 1 ? 'Ver 1 proyecto' : `Ver ${n} proyectos`),
    },
    lightbox: { label: 'Fotos del proyecto', close: 'Cerrar', prev: 'Foto anterior', next: 'Foto siguiente', open: (name: string) => `Ver fotos de ${name}` },
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
      homeDesc: `${site.name} (${site.brand}): paving, earthworks and basement excavation, civil works for housing and buildings, steel structures, structural design and watershed management in Guatemala since ${site.foundingDate.slice(0, 4)}.`,
      projectsTitle: `Projects | ${site.brand}`,
      projectsDesc:
        'Highways, streets, river control, earthworks and civil works for Guatemala’s public sector, municipalities and private companies.',
      clientsTitle: `Clients | ${site.brand}`,
      clientsDesc: `Ministries, municipalities and private companies that have trusted ${site.brand} to build civil engineering works in Guatemala.`,
    },
    hero: {
      since: (y: number) => `Since ${y}`,
      title: 'Efficiency from the first meter to the last.',
      lead: 'We pave roads, move earth, excavate basements and raise buildings for the public sector, municipalities and private companies.',
      note: 'Six lines of work, one standard: qualified people, our own machinery and strict control at every stage.',
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
      p1: 'We are a Guatemalan company founded on June 28, 2000, working across many fields of civil engineering. With more than 25 years of experience, we guarantee our clients the capacity to deliver their projects with the highest quality and responsibility, from the first meter of construction to the last. From the start we have pursued excellence through highly qualified people and the most modern equipment.',
    },
    services: {
      eyebrow: 'Services',
      title: 'Six lines of work, one standard.',
      lead: 'From pavement design to watershed management, every project is delivered by qualified people, with our own machinery and strict control at every stage.',
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
      more: (name: string) => `See photos of ${name}`,
      filterAria: 'Filter projects by type',
      filterAll: 'All',
      photos: (n: number) => (n === 1 ? '1 photo' : `${n} photos`),
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
      mapTitle: 'Map: CSG head office',
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
      lead: (n: number, withPhotos: number) =>
        `${n} paving, earthworks, civil works and watershed projects; ${withPhotos} with photos.`,
      filterService: 'Type of work',
      filterSector: 'Sector',
      all: 'All',
      search: 'Search',
      searchPlaceholder: 'River, highway, town…',
      showing: (a: number, b: number) => `Showing ${a} of ${b} projects`,
      none: 'No projects match those filters.',
      reset: 'Clear filters',
      client: 'Client',
      work: 'Project',
      type: 'Type',
      listTitle: 'Project list',
      photosTitle: 'Projects with photos',
      moreTitle: 'More projects',
      filtersAria: 'Filter projects',
      note: 'This list is a selection of our more than 200 completed projects.',
    },
    clientsPage: {
      eyebrow: 'Clients',
      title: 'Who has trusted us.',
      lead: 'Ministries, government agencies, municipalities and private companies in Guatemala.',
      cta: (n: number) => (n === 1 ? 'See 1 project' : `See ${n} projects`),
    },
    lightbox: { label: 'Project photos', close: 'Close', prev: 'Previous photo', next: 'Next photo', open: (name: string) => `See photos of ${name}` },
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
