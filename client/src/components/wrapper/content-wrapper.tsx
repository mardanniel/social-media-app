import React from 'react';

/**
 * Wrapper used if navigation is being utilized.
 * @param children
 * @returns React.ReactNode
 */
export default function ContentWrapper({ children }: React.PropsWithChildren) {
  return <div className='pt-14'>{children}</div>;
}
