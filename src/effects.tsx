import { h, render, type ComponentType } from 'preact';
import FluidText from './components/originkit/ui/fluid-text';
import BeyondHorizon from './components/originkit/ui/beyond-horizon';
import GlitterWrap from './components/originkit/ui/glitterwrap';
import type { MotionPreference } from './motion-preference.ts';

// The original Originkit shaders/particle renderer run as small, lazy Preact islands.
export function setupEffects(reduced: MotionPreference) {
  const roots: {host:HTMLElement; visible:boolean; active:boolean; failed:boolean; enabled:boolean; component:ComponentType<any>; props:()=>Record<string,unknown>}[] = [];
  function sync() {
    for (const root of roots) {
      const active = root.visible && root.enabled && !document.hidden && !reduced.matches && !root.failed;
      if (active === root.active) continue;
      root.active = active;
      if (active) render(h(root.component, root.props()), root.host);
      else render(null,root.host);
    }
  }
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      const root = roots.find(item=>item.host===entry.target);
      if (root) root.visible = entry.isIntersecting;
    }
    sync();
  },{threshold:0});
  function register(host: HTMLElement, component: ComponentType<any>, props: ()=>Record<string,unknown>, enabled = true) {
    const root = {host,component,props,visible:false,active:false,failed:false,enabled};
    roots.push(root);
    host.addEventListener('webglcontextlost', () => {
      if (!root.active) return;
      root.failed = true;
      sync(); // Preserve the static text/gradient if a GPU context is lost.
    },true);
    observer.observe(host);
    return root;
  }
  const background = document.querySelector<HTMLElement>('.glitter-background');
  if (background) register(background,GlitterWrap,()=>({particleCount:innerWidth<600?60:120,color1:'#ddd5c5',color2:'#ff713d',color3:'#ceff39',speed:1.3,density:35,starSize:10.5,focalDepth:13,turbulence:.4,brightness:90,glitterIntensity:1,trailAmount:25,reverse:false}));
  const horizon = document.querySelector<HTMLElement>('.horizon-effect');
  if (horizon) {
    register(horizon,BeyondHorizon,()=>({background:'#151413',coreColor:'#fff8ed',midColor:'#ff9d62',deepColor:'#643923',brightness:1.7,coreSize:.032,coreHover:.045,speed:.5,parallax:1.2,style:{minWidth:0,minHeight:0}}));
  }

  // Keep the actual DOM letters under the transparent fluid overlay. They are
  // selectable, indexed, accessible, and remain intact on every fallback path.
  document.querySelectorAll<HTMLElement>('.hero-line,.section-heading h1 > span:not(.sr-only),h2 > span:not(.sr-only),.project-case h1,.social-page h1,.horizon-title').forEach(label=>{
    const text = label.innerText;
    const host = document.createElement('span');
    host.className = 'fluid-effect'; host.setAttribute('aria-hidden','true');
    label.classList.add('fluid-label'); label.append(host);
    const props = () => {
      const font = getComputedStyle(label);
      // Browser line wrapping is captured from real text-node character boxes.
      const range = document.createRange();
      const walker = document.createTreeWalker(label,NodeFilter.SHOW_TEXT);
      let node: Node | null, lastTop = -Infinity, lines = [''];
      while ((node=walker.nextNode())) {
        if (host.contains(node)) continue;
        for (let i=0;i<(node.textContent?.length ?? 0);i++) {
          range.setStart(node,i);range.setEnd(node,i+1);
          const box=range.getBoundingClientRect();
          if (!box.height) continue;
          if (box.top > lastTop+3 && lastTop !== -Infinity) lines.push('');
          lines[lines.length-1]+=node.textContent![i];lastTop=box.top;
        }
      }
      return {text:lines.map(line=>line.trim()).join('\n') || text,color:'rgba(0,0,0,0)',paletteColors:['#ff713d','#ceff39','#fff2db'],splatRadius:5,splatForce:8,curl:35,densityDissipation:8,font:{fontFamily:font.fontFamily,fontWeight:font.fontWeight,fontSize:font.fontSize,lineHeight:font.lineHeight,letterSpacing:font.letterSpacing,textAlign:'left' as const}};
    };
    const root = register(host,FluidText,props);
    new ResizeObserver(()=>{if(root.active) render(h(FluidText,props()),host)}).observe(label);
  });
  document.addEventListener('visibilitychange',sync);
  reduced.addEventListener('change',sync);
  window.addEventListener('pagehide',()=>{for (const root of roots) {root.active=false;render(null,root.host)}});
  window.addEventListener('pageshow',sync);
}
