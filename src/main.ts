import { setupPointer, setupScrollProgress } from './pointer.ts';
import { setupModuleMotion } from './scroll-motion.ts';
import { setupMotionPreference } from './motion-preference.ts';
const reducedMotion = setupMotionPreference();
setupPointer(reducedMotion);
setupScrollProgress();
setupModuleMotion(reducedMotion);
let effectsStarted = false;
function loadEffects() {
  if (effectsStarted || reducedMotion.matches) return;
  effectsStarted = true;
  import('./effects.tsx').then(module => module.setupEffects(reducedMotion)).catch(() => { effectsStarted = false; });
}
if ('requestIdleCallback' in window) window.requestIdleCallback(loadEffects,{timeout:1200});
else setTimeout(loadEffects,700);
reducedMotion.addEventListener('change',loadEffects);
const entranceObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entranceObserver.unobserve(entry.target);
    const element = entry.target as HTMLElement;
    if (reducedMotion.matches) return;
    const delay = Math.min(Number(element.style.getPropertyValue('--order') || 0) * 60, 180);
    const duration = element.classList.contains('project') ? 300 : element.dataset.motion === 'skill' ? 320 : 350;
    element.animate([{opacity:0,transform:'translateY(8px)'},{opacity:1,transform:'translateY(0)'}], {duration,delay,easing:'cubic-bezier(.2,.7,.2,1)',fill:'backwards'});

  });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal,.about-socials').forEach((element) => entranceObserver.observe(element));
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
reducedMotion.addEventListener('change', () => {
  if (reducedMotion.matches) document.getAnimations().forEach((animation) => {if(Number.isFinite(animation.effect?.getComputedTiming().endTime)) animation.finish();else animation.cancel()});
});
const shell = document.querySelector<HTMLElement>('.page-shell')!;
const profileCard = document.querySelector<HTMLElement>('.profile-card')!;
const floating = document.querySelector<HTMLElement>('.floating-actions')!;
function updateLayout() {
  const rightGutter = window.innerWidth - shell.getBoundingClientRect().right;
  floating.classList.toggle('is-floating', rightGutter >= 168 && window.innerWidth >= 1024);

}
new ResizeObserver(updateLayout).observe(profileCard);
window.addEventListener('resize', updateLayout, {passive:true});
updateLayout();
