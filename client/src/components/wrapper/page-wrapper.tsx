import React from 'react';

export default function PageWrapper({ children }: React.PropsWithChildren) {
  return <div className='bg-gray-800 text-white h-auto relative'>{children}</div>;
}
