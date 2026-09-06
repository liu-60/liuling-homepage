const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const navLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>('.nav-link'));
const sections = Array.from(document.querySelectorAll<HTMLElement>('main > section[id]'));
function setActive(id: string) {
  navLinks.forEach((link) => {
    const active = link.hash === `#${id}`;
    link.classList.toggle('is-active', active);
    if (active) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
}
// Read geometry at section boundary crossings, not on every scroll frame.
function updateActiveSection() {
  const threshold = window.innerHeight * 0.42;
  const active = [...sections].reverse().find((section) => section.getBoundingClientRect().top <= threshold);
  if (active) setActive(active.id);
}
let sectionObserver: IntersectionObserver;
let observedHeight = 0;
function observeSections() {
  if (observedHeight === window.innerHeight) return;
  observedHeight = window.innerHeight;
  sectionObserver?.disconnect();
  // IntersectionObserver percentage margins use width, so use height-derived pixels.
  sectionObserver = new IntersectionObserver(updateActiveSection, {
    rootMargin: `-${Math.round(observedHeight * .15)}px 0px -${Math.round(observedHeight * .55)}px 0px`, threshold: 0,
  });
  sections.forEach((section) => sectionObserver.observe(section));
  updateActiveSection();
}
document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', () => {
    const id = link.hash.slice(1);
    if (sections.some((section) => section.id === id)) setActive(id);
  });
});
const entranceObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entranceObserver.unobserve(entry.target);
    const element = entry.target as HTMLElement;
    if (reducedMotion.matches) return;
    const delay = Math.min(Number(element.style.getPropertyValue('--order') || 0) * 60, 180);
    element.animate([{opacity:0,transform:'translateY(8px)'},{opacity:1,transform:'translateY(0)'}], {duration:350,delay,easing:'cubic-bezier(.2,.7,.2,1)',fill:'backwards'});
  });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach((element) => entranceObserver.observe(element));
const countObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    countObserver.unobserve(entry.target);
    const element = entry.target as HTMLElement, finalValue = Number(element.dataset.count), suffix = element.dataset.suffix || '';
    if (!Number.isFinite(finalValue) || reducedMotion.matches) return;
    const decimals = (String(finalValue).split('.')[1] || '').length, start = performance.now();
    const tick = (now: number) => {
      const progress = reducedMotion.matches ? 1 : Math.min((now - start) / 700, 1);
      element.textContent = `${(finalValue * (1 - (1 - progress) ** 3)).toFixed(decimals)}${suffix}`;
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
});
document.querySelectorAll('[data-count]').forEach((element) => countObserver.observe(element));
reducedMotion.addEventListener('change', (event) => {
  if (event.matches) document.getAnimations().forEach((animation) => animation.finish());
});
const shell = document.querySelector<HTMLElement>('.page-shell')!;
const profileCard = document.querySelector<HTMLElement>('.profile-card')!;
const floating = document.querySelector<HTMLElement>('.floating-actions')!;
function updateLayout() {
  const rightGutter = window.innerWidth - shell.getBoundingClientRect().right;
  floating.classList.toggle('is-floating', rightGutter >= 168 && window.innerWidth >= 1024);
  profileCard.classList.toggle('fits-viewport', profileCard.offsetHeight + 80 <= window.innerHeight);
  observeSections();
}
new ResizeObserver(updateLayout).observe(profileCard);
window.addEventListener('resize', updateLayout, {passive:true});
updateLayout();
