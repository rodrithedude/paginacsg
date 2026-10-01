/* CSG — Construcciones y Soluciones Globales */
(() => {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Menú a pantalla completa ---------- */
  const menu = document.querySelector('[data-menu]');
  const openers = document.querySelectorAll('[data-menu-open]');
  let lastFocus = null;

  const setExpanded = (value) => openers.forEach((b) => b.setAttribute('aria-expanded', String(value)));

  function openMenu() {
    lastFocus = document.activeElement;
    menu.hidden = false;
    requestAnimationFrame(() => {
      menu.classList.add('is-open');
      document.body.classList.add('menu-open');
      setExpanded(true);
      menu.querySelector('.menu__nav a')?.focus({ preventScroll: true });
    });
  }

  function closeMenu({ restoreFocus = true } = {}) {
    if (!menu.classList.contains('is-open')) return;
    menu.classList.remove('is-open');
    document.body.classList.remove('menu-open');
    setExpanded(false);
    const hide = () => { if (!menu.classList.contains('is-open')) menu.hidden = true; };
    if (reduceMotion) hide();
    else menu.addEventListener('transitionend', hide, { once: true });
    if (restoreFocus && lastFocus) lastFocus.focus({ preventScroll: true });
  }

  if (menu) {
    openers.forEach((b) => b.addEventListener('click', openMenu));
    menu.querySelector('[data-menu-close]')?.addEventListener('click', () => closeMenu());
    menu.querySelectorAll('[data-menu-link]').forEach((a) =>
      a.addEventListener('click', () => closeMenu({ restoreFocus: false }))
    );
    document.addEventListener('keydown', (e) => {
      if (!menu.classList.contains('is-open')) return;
      if (e.key === 'Escape') closeMenu();
      if (e.key === 'Tab') {
        const items = [...menu.querySelectorAll('a, button')];
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
  }

  /* ---------- Barra superior compacta ---------- */
  const topbar = document.querySelector('[data-topbar]');
  const hero = document.querySelector('.hero');
  if (topbar && hero && 'IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
      topbar.classList.toggle('is-visible', !entry.isIntersecting);
    }, { rootMargin: '-120px 0px 0px 0px' }).observe(hero.querySelector('.hero__intro') || hero);
  }

  /* ---------- Acordeón de principios ---------- */
  document.querySelectorAll('[data-accordion]').forEach((group) => {
    const items = [...group.querySelectorAll('.acc')];
    items.forEach((item) => {
      const btn = item.querySelector('.acc__btn');
      btn.addEventListener('click', () => {
        const willOpen = !item.classList.contains('is-open');
        items.forEach((other) => {
          other.classList.remove('is-open');
          other.querySelector('.acc__btn').setAttribute('aria-expanded', 'false');
        });
        if (willOpen) {
          item.classList.add('is-open');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });
  });

  /* ---------- Carrusel de proyectos ---------- */
  const track = document.querySelector('[data-carousel-track]');
  const prev = document.querySelector('[data-carousel-prev]');
  const next = document.querySelector('[data-carousel-next]');
  if (track && prev && next) {
    const step = () => track.querySelector('.project')?.getBoundingClientRect().width || track.clientWidth;
    const update = () => {
      const max = track.scrollWidth - track.clientWidth - 2;
      prev.disabled = track.scrollLeft <= 2;
      next.disabled = track.scrollLeft >= max;
    };
    prev.addEventListener('click', () => track.scrollBy({ left: -step(), behavior: reduceMotion ? 'auto' : 'smooth' }));
    next.addEventListener('click', () => track.scrollBy({ left: step(), behavior: reduceMotion ? 'auto' : 'smooth' }));
    track.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  }

  /* ---------- Contadores ---------- */
  const counters = document.querySelectorAll('[data-count]');
  const runCounter = (el) => {
    const target = Number(el.dataset.count);
    if (reduceMotion || !target) return;
    const duration = 1400;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased);
      if (p < 1) requestAnimationFrame(tick);
    };
    el.textContent = '0';
    requestAnimationFrame(tick);
  };

  /* ---------- Aparición al hacer scroll ---------- */
  const revealables = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && !reduceMotion) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        entry.target.querySelectorAll('[data-count]').forEach(runCounter);
        io.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealables.forEach((el) => io.observe(el));
  } else {
    revealables.forEach((el) => el.classList.add('is-in'));
    counters.forEach((el) => { el.textContent = el.dataset.count; });
  }

  /* ---------- Formulario de contacto ----------
     Sin servidor: arma un correo con los datos y abre el cliente de correo.
     Para recibir los mensajes directamente (Formspree, Netlify Forms, etc.)
     basta con cambiar el envío en este bloque. */
  const form = document.querySelector('[data-contact-form]');
  if (form) {
    const status = form.querySelector('[data-form-status]');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let firstInvalid = null;
      form.querySelectorAll('[required]').forEach((input) => {
        const ok = input.value.trim() !== '' && input.checkValidity();
        input.closest('.field')?.classList.toggle('is-invalid', !ok);
        if (!ok && !firstInvalid) firstInvalid = input;
      });
      if (firstInvalid) {
        status.textContent = 'Revisa los campos marcados con *.';
        status.classList.add('is-error');
        firstInvalid.focus();
        return;
      }
      status.classList.remove('is-error');

      const data = new FormData(form);
      const body = [
        `Nombre: ${data.get('nombre')}`,
        `Empresa: ${data.get('empresa') || '-'}`,
        `Correo: ${data.get('correo')}`,
        `Teléfono: ${data.get('telefono') || '-'}`,
        `Tipo de proyecto: ${data.get('tipo')}`,
        '',
        data.get('mensaje'),
      ].join('\n');
      const subject = `Solicitud de cotización — ${data.get('nombre')}`;
      window.location.href = `mailto:${form.dataset.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      status.textContent = 'Abriendo tu correo para enviar la solicitud…';
    });
    form.addEventListener('input', (e) => {
      e.target.closest('.field')?.classList.remove('is-invalid');
    });
  }

  /* ---------- Año del pie de página ---------- */
  document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });
})();
