/* CSG — interacciones comunes a todas las páginas */

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Años de experiencia y año actual siempre al día ---------- */
const now = new Date();
document.querySelectorAll<HTMLElement>('[data-years-since]').forEach((el) => {
  const d = new Date(el.dataset.yearsSince + 'T00:00:00');
  let y = now.getFullYear() - d.getFullYear();
  if (now.getMonth() < d.getMonth() || (now.getMonth() === d.getMonth() && now.getDate() < d.getDate())) y--;
  el.textContent = String(y);
  el.dataset.count = String(y);
});
document.querySelectorAll<HTMLElement>('[data-current-year]').forEach((el) => {
  el.textContent = String(now.getFullYear());
});

/* ---------- Menú a pantalla completa ---------- */
const menu = document.querySelector<HTMLElement>('[data-menu]');
const openers = document.querySelectorAll<HTMLButtonElement>('[data-menu-open]');
let lastFocus: HTMLElement | null = null;

const setExpanded = (value: boolean) => openers.forEach((b) => b.setAttribute('aria-expanded', String(value)));

function openMenu() {
  if (!menu) return;
  lastFocus = document.activeElement as HTMLElement | null;
  menu.hidden = false;
  requestAnimationFrame(() => {
    menu.classList.add('is-open');
    document.body.classList.add('menu-open');
    setExpanded(true);
    menu.querySelector<HTMLElement>('.menu__nav a')?.focus({ preventScroll: true });
  });
}

function closeMenu({ restoreFocus = true } = {}) {
  if (!menu || !menu.classList.contains('is-open')) return;
  menu.classList.remove('is-open');
  document.body.classList.remove('menu-open');
  setExpanded(false);
  const hide = () => {
    if (!menu.classList.contains('is-open')) menu.hidden = true;
  };
  if (reduceMotion) hide();
  else menu.addEventListener('transitionend', hide, { once: true });
  if (restoreFocus) lastFocus?.focus({ preventScroll: true });
}

if (menu) {
  openers.forEach((b) => b.addEventListener('click', openMenu));
  menu.querySelector('[data-menu-close]')?.addEventListener('click', () => closeMenu());
  menu.querySelectorAll('[data-menu-link]').forEach((a) =>
    a.addEventListener('click', () => closeMenu({ restoreFocus: false })),
  );
  document.addEventListener('keydown', (e) => {
    if (!menu.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeMenu();
    if (e.key === 'Tab') {
      const items = [...menu.querySelectorAll<HTMLElement>('a, button')];
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });
}

/* ---------- Barra superior compacta (solo en inicio) ---------- */
const topbar = document.querySelector<HTMLElement>('[data-topbar]');
const heroIntro = document.querySelector<HTMLElement>('.hero__intro');
if (topbar && heroIntro && !topbar.classList.contains('topbar--static') && 'IntersectionObserver' in window) {
  new IntersectionObserver(
    ([entry]) => topbar.classList.toggle('is-visible', !entry.isIntersecting && entry.boundingClientRect.top < 0),
    { rootMargin: '-80px 0px 0px 0px' },
  ).observe(heroIntro);
}

/* ---------- Acordeón ---------- */
document.querySelectorAll<HTMLElement>('[data-accordion]').forEach((group) => {
  const items = [...group.querySelectorAll<HTMLElement>('.acc')];
  items.forEach((item) => {
    const btn = item.querySelector<HTMLButtonElement>('.acc__btn');
    btn?.addEventListener('click', () => {
      const willOpen = !item.classList.contains('is-open');
      items.forEach((other) => {
        other.classList.remove('is-open');
        other.querySelector('.acc__btn')?.setAttribute('aria-expanded', 'false');
      });
      if (willOpen) {
        item.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
});

/* ---------- Carrusel ---------- */
document.querySelectorAll<HTMLElement>('[data-carousel]').forEach((root) => {
  const track = root.querySelector<HTMLElement>('[data-carousel-track]');
  const prev = root.querySelector<HTMLButtonElement>('[data-carousel-prev]');
  const next = root.querySelector<HTMLButtonElement>('[data-carousel-next]');
  if (!track || !prev || !next) return;
  const step = () =>
    track.querySelector<HTMLElement>(':scope > :not([hidden])')?.getBoundingClientRect().width || track.clientWidth;
  const update = () => {
    const max = track.scrollWidth - track.clientWidth - 2;
    prev.disabled = track.scrollLeft <= 2;
    next.disabled = track.scrollLeft >= max;
  };
  const behavior: ScrollBehavior = reduceMotion ? 'auto' : 'smooth';
  prev.addEventListener('click', () => track.scrollBy({ left: -step(), behavior }));
  next.addEventListener('click', () => track.scrollBy({ left: step(), behavior }));
  track.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
});

/* ---------- Filtro por tipo de obra en el carrusel de inicio ---------- */
document.querySelectorAll<HTMLElement>('[data-carousel]').forEach((root) => {
  const chips = [...root.querySelectorAll<HTMLButtonElement>('[data-work-filter]')];
  const track = root.querySelector<HTMLElement>('[data-carousel-track]');
  if (!chips.length || !track) return;
  chips.forEach((chip) =>
    chip.addEventListener('click', () => {
      const cat = chip.dataset.workFilter || '';
      chips.forEach((c) => c.setAttribute('aria-pressed', String(c === chip)));
      track.querySelectorAll<HTMLElement>('.fcard').forEach((card) => {
        card.hidden = Boolean(cat) && !(card.dataset.cats || '').split(' ').includes(cat);
      });
      track.scrollLeft = 0;
      track.dispatchEvent(new Event('scroll'));
    }),
  );
});

/* ---------- Visor de fotos ---------- */
const lightbox = document.querySelector<HTMLDialogElement>('[data-lightbox]');
if (lightbox) {
  type Shot = { src: string; w: number; h: number };
  let shots: Shot[] = [];
  let index = 0;
  let title = '';
  let opener: HTMLElement | null = null;
  const img = lightbox.querySelector<HTMLImageElement>('[data-lb-img]')!;
  const count = lightbox.querySelector<HTMLElement>('[data-lb-count]')!;
  const titleEl = lightbox.querySelector<HTMLElement>('[data-lb-title]')!;
  const prevBtn = lightbox.querySelector<HTMLButtonElement>('[data-lb-prev]')!;
  const nextBtn = lightbox.querySelector<HTMLButtonElement>('[data-lb-next]')!;

  const show = (i: number) => {
    index = (i + shots.length) % shots.length;
    const shot = shots[index];
    img.src = shot.src;
    img.width = shot.w;
    img.height = shot.h;
    img.alt = `${title} (${index + 1}/${shots.length})`;
    count.textContent = shots.length > 1 ? `${index + 1} / ${shots.length}` : '';
    prevBtn.hidden = nextBtn.hidden = shots.length < 2;
  };

  document.addEventListener('click', (e) => {
    const btn = (e.target as HTMLElement).closest<HTMLElement>('[data-gallery]');
    if (!btn) return;
    shots = JSON.parse(btn.dataset.gallery || '[]');
    if (!shots.length) return;
    title = btn.dataset.title || '';
    titleEl.textContent = title;
    opener = btn;
    show(0);
    lightbox.showModal();
    document.body.classList.add('menu-open');
  });
  prevBtn.addEventListener('click', () => show(index - 1));
  nextBtn.addEventListener('click', () => show(index + 1));
  lightbox.querySelector('[data-lb-close]')?.addEventListener('click', () => lightbox.close());
  // Cerrar al tocar fuera de la foto
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) lightbox.close();
  });
  lightbox.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' && shots.length > 1) show(index - 1);
    if (e.key === 'ArrowRight' && shots.length > 1) show(index + 1);
  });
  lightbox.addEventListener('close', () => {
    document.body.classList.remove('menu-open');
    opener?.focus({ preventScroll: true });
  });
}

/* ---------- Contadores y aparición al hacer scroll ---------- */
const runCounter = (el: HTMLElement) => {
  const target = Number(el.dataset.count);
  if (reduceMotion || !target) return;
  const duration = 1400;
  const start = performance.now();
  const tick = (t: number) => {
    const p = Math.min((t - start) / duration, 1);
    el.textContent = String(Math.round(target * (1 - Math.pow(1 - p, 3))));
    if (p < 1) requestAnimationFrame(tick);
  };
  el.textContent = '0';
  requestAnimationFrame(tick);
};

const revealables = document.querySelectorAll<HTMLElement>('[data-reveal]');
if ('IntersectionObserver' in window && !reduceMotion) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target as HTMLElement;
        el.classList.add('is-in');
        el.querySelectorAll<HTMLElement>('[data-count]').forEach(runCounter);
        io.unobserve(el);
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
  );
  revealables.forEach((el) => io.observe(el));
} else {
  revealables.forEach((el) => el.classList.add('is-in'));
}

/* ---------- Formulario de contacto ----------
   Sin servidor: arma un correo con los datos y abre el cliente de correo del visitante.
   Para recibir los mensajes directamente (Formspree, Cloudflare, etc.) se cambia este bloque. */
const form = document.querySelector<HTMLFormElement>('[data-contact-form]');
if (form) {
  const status = form.querySelector<HTMLElement>('[data-form-status]')!;
  const L = JSON.parse(form.dataset.labels || '{}') as Record<string, string>;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let firstInvalid: HTMLInputElement | HTMLTextAreaElement | null = null;
    form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('[required]').forEach((input) => {
      const ok = input.value.trim() !== '' && input.checkValidity();
      input.closest('.field')?.classList.toggle('is-invalid', !ok);
      if (!ok && !firstInvalid) firstInvalid = input;
    });
    if (firstInvalid) {
      status.textContent = form.dataset.msgRequired || '';
      status.classList.add('is-error');
      (firstInvalid as HTMLElement).focus();
      return;
    }
    status.classList.remove('is-error');

    const data = new FormData(form);
    const val = (k: string) => String(data.get(k) || '').trim() || '-';
    const body = [
      `${L.name}: ${val('nombre')}`,
      `${L.company}: ${val('empresa')}`,
      `${L.email}: ${val('correo')}`,
      `${L.phone}: ${val('telefono')}`,
      `${L.type}: ${val('tipo')}`,
      '',
      val('mensaje'),
    ].join('\n');
    const subject = `${form.dataset.subject} — ${val('nombre')}`;
    window.location.href = `mailto:${form.dataset.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    status.textContent = form.dataset.msgOpening || '';
  });
  form.addEventListener('input', (e) => {
    (e.target as HTMLElement).closest('.field')?.classList.remove('is-invalid');
  });
}
