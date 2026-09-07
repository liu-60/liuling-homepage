// No animation loop at rest: pointer/scroll updates share at most one pending frame each.
import type { MotionPreference } from './motion-preference.ts';
export function setupPointer(reducedMotion: MotionPreference) {
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
  const cursor = document.querySelector<HTMLElement>('.custom-cursor')!;
  const root = document.documentElement;
  let frame = 0;
  let x = 0, y = 0;
  let target: Element | null = null;
  const hide = () => {
    cancelAnimationFrame(frame); frame = 0;
    root.classList.remove('cursor-ready');
  };
  const move = (event: PointerEvent) => {
    if (!finePointer.matches || reducedMotion.matches || event.pointerType !== 'mouse') return hide();
    target = event.target instanceof Element ? event.target : null;
    // Native text cursors and browser scrollbars keep their expected behavior.
    if (target?.closest('input,textarea,[contenteditable="true"]') || event.clientX >= root.clientWidth) return hide();
    x = event.clientX; y = event.clientY;
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      cursor.style.transform = `translate3d(${x - 5}px,${y - 3}px,0)`;
      root.classList.add('cursor-ready');
    });
  };
  document.addEventListener('pointermove', move, {passive:true});
  document.addEventListener('pointerout', (event) => { if (!event.relatedTarget) hide(); }, {passive:true});
  document.addEventListener('pointerdown', (event) => { if (event.pointerType !== 'mouse') hide(); }, {passive:true});
  document.addEventListener('keydown', hide);
  document.addEventListener('visibilitychange', hide);
  window.addEventListener('blur', hide);
  finePointer.addEventListener('change', hide);
  reducedMotion.addEventListener('change', hide);
}

export function setupScrollProgress() {
  const bar = document.querySelector<HTMLElement>('.scroll-progress')!;
  const track = bar.parentElement!;
  let frame = 0;
  const update = () => {
    frame = 0;
    const range = document.documentElement.scrollHeight - window.innerHeight;
    const progress = range > 0 ? Math.min(1, Math.max(0, window.scrollY / range)) : 0;
    bar.style.transform = `scaleY(${progress})`;
    track.classList.toggle('is-visible', range > 0);
  };
  const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
  window.addEventListener('scroll', schedule, {passive:true});
  window.addEventListener('resize', schedule, {passive:true});
  new ResizeObserver(schedule).observe(document.body);
  update();
}
