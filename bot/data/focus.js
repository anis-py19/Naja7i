import { BAC_FOCUS_TIPS } from '../../src/data/focusTipsData.js';

export { BAC_FOCUS_TIPS };

export function getRandomFocusTip() {
  if (!BAC_FOCUS_TIPS.length) return null;
  return BAC_FOCUS_TIPS[Math.floor(Math.random() * BAC_FOCUS_TIPS.length)];
}
