export function createPortalElement(portalElementID = 'portal-element') {
  let portalElement = document.createElement('div');
  portalElement.setAttribute('id', portalElementID);
  (document.getElementById('root') as HTMLElement).appendChild(portalElement);
  return portalElement;
}
