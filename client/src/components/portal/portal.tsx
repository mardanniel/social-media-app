import React, { createElement, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

type PortalProps = {
  children: React.ReactNode;
  portalElementID: string;
};

function createPortalElement(portalElementID = 'portal-element') {
  let portalElement = document.createElement('div');
  portalElement.setAttribute('id', portalElementID);
  (document.getElementById('root') as HTMLElement).appendChild(portalElement);
  return portalElement;
}

export default function Portal({
  children,
  portalElementID = 'portal-element',
}: PortalProps) {
  const [portalElement, setPortalElement] = useState<HTMLElement>(null!);

  useEffect(() => {
    let element = document.getElementById(portalElementID);
    let created = false;
    if (!element) {
      created = true;
      element = createPortalElement(portalElementID);
    }

    setPortalElement(element);
    return () => {
      if (created && element?.parentNode) {
        element.parentNode.removeChild(element);
      }
    };
  }, [portalElementID]);

  if (portalElement === null) return null;

  return createPortal(children, portalElement);
}
