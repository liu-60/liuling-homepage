export interface MotionPreference {
  readonly matches: boolean;
  addEventListener(type: 'change', listener: () => void): void;
}
// The owner explicitly requested always-on motion, independent of saved/OS settings.
export function createMotionPreference(): MotionPreference {
  return { matches:false, addEventListener() {} };
}
export function setupMotionPreference() {
  document.documentElement.dataset.motion='full';
  return createMotionPreference();
}
