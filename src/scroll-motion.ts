import type { MotionPreference } from './motion-preference.ts';
export function moduleVisibility(top: number, bottom: number, viewport: number) {
  const edge = Math.min(160,viewport * .18);
  const opacity = Math.max(0,Math.min(1,(viewport-top)/edge,bottom/edge));
  return {opacity,offset:(1-opacity)*8*(top>viewport/2?1:-1)};
}

export function setupModuleMotion(reduced: MotionPreference) {
  const modules = [...document.querySelectorAll<HTMLElement>('main > section,main > footer')];
  modules.forEach(element=>element.classList.add('scroll-module'));
  let frame=0;
  const update=()=>{
    frame=0;
    modules.forEach(element=>{
      if(reduced.matches){element.style.removeProperty('--module-opacity');element.style.removeProperty('--module-offset');return}
      const rect=element.getBoundingClientRect();
      // Offset is applied to an inner visual via CSS translate, not document flow.
      const previous = parseFloat(element.style.getPropertyValue('--module-offset')) || 0;
      const {opacity,offset}=moduleVisibility(rect.top-previous,rect.bottom-previous,innerHeight);
      element.style.setProperty('--module-opacity',String(opacity));
      element.style.setProperty('--module-offset',`${offset}px`);
    });
  };
  const schedule=()=>{if(!frame)frame=requestAnimationFrame(update)};
  addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule,{passive:true});
  reduced.addEventListener('change',schedule);
  new ResizeObserver(schedule).observe(document.querySelector('main')!);
  update();
}
