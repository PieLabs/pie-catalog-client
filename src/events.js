
export const ELEMENT_CLICK = 'on-element-click';

export function elementClick(element) {
  return new CustomEvent(ELEMENT_CLICK, {
    bubbles: true,
    composed: true,
    detail: { element }
  });
}

