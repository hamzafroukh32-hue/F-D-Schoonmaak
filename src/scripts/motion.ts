// Scroll reveals, header state and a one-time demo of the before/after sliders.
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Reveal on scroll
const targets = document.querySelectorAll<HTMLElement>('[data-reveal], [data-stagger]');
if (reduce || !('IntersectionObserver' in window)) {
  targets.forEach((el) => el.classList.add('is-visible'));
} else {
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      }
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.12 },
  );
  targets.forEach((el) => io.observe(el));
}

// Header shadow + smaller logo after scrolling
const header = document.querySelector<HTMLElement>('[data-header]');
if (header) {
  let ticking = false;
  const update = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 12);
    ticking = false;
  };
  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    },
    { passive: true },
  );
  update();
}

// Before/after: sweep once when the slider first comes into view, unless the visitor touches it.
if (!reduce && 'IntersectionObserver' in window) {
  const sliders = document.querySelectorAll<HTMLElement>('[data-ba]');
  const demo = (el: HTMLElement) => {
    const range = el.querySelector<HTMLInputElement>('[data-ba-range]');
    if (!range) return;
    let stopped = false;
    const stop = () => (stopped = true);
    range.addEventListener('pointerdown', stop, { once: true });
    range.addEventListener('keydown', stop, { once: true });
    const keyframes = [50, 18, 82, 50];
    const segment = 700;
    const start = performance.now();
    const ease = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
    const step = (now: number) => {
      if (stopped) return;
      const t = (now - start) / segment;
      const i = Math.min(Math.floor(t), keyframes.length - 2);
      const local = Math.min(t - i, 1);
      const value = keyframes[i] + (keyframes[i + 1] - keyframes[i]) * ease(local);
      el.style.setProperty('--pos', `${value}%`);
      range.value = String(Math.round(value));
      if (t < keyframes.length - 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          setTimeout(() => demo(e.target as HTMLElement), 400);
          io.unobserve(e.target);
        }
      }
    },
    { threshold: 0.6 },
  );
  sliders.forEach((el) => io.observe(el));
}
