import React, { createElement, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { createPortalElement } from '../../shared/helper/createPortalElement';

type PortalProps = {
  children: React.ReactNode;
  portalElementID: string;
};

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
