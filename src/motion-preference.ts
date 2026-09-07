export interface MotionPreference {
  readonly matches: boolean;
  addEventListener(type: 'change', listener: () => void): void;
}

// Default to the system setting, but honor an explicit choice made on this site.
export function createMotionPreference(system: MotionPreference, storage: Pick<Storage,'getItem'|'setItem'>) {
  let choice: string | null = null;
  try { choice = storage.getItem('portfolio-motion'); } catch { /* Storage is optional. */ }
  const listeners = new Set<() => void>();
  const preference = {
    get matches() { return choice === 'full' ? false : choice === 'reduced' ? true : system.matches; },
    addEventListener(_type: 'change', listener: () => void) { listeners.add(listener); },
    setEnabled(enabled: boolean) {
      choice = enabled ? 'full' : 'reduced';
      try { storage.setItem('portfolio-motion',choice); } catch { /* Keep the in-memory choice. */ }
      listeners.forEach(listener=>listener());
    },
  };
  system.addEventListener('change',()=>listeners.forEach(listener=>listener()));
  return preference;
}

export function setupMotionPreference() {
  const storage = {
    getItem: (key: string) => window.localStorage.getItem(key),
    setItem: (key: string,value: string) => window.localStorage.setItem(key,value),
  };
  const preference=createMotionPreference(matchMedia('(prefers-reduced-motion: reduce)'),storage);
  const button=document.querySelector<HTMLButtonElement>('.motion-toggle')!;
  const sync=()=>{
    const enabled=!preference.matches;
    document.documentElement.dataset.motion=enabled?'full':'reduced';
    button.setAttribute('aria-pressed',String(enabled));
    button.setAttribute('aria-label',enabled?'Pause motion':'Enable motion');
    button.title=enabled?'关闭动效':'开启动效';
    button.querySelector('.motion-label')!.textContent=enabled?'MOTION ON':'MOTION OFF';
  };
  button.hidden=false;
  button.addEventListener('click',()=>preference.setEnabled(preference.matches));
  preference.addEventListener('change',sync);
  sync();
  return preference;
}
