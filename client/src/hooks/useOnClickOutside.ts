import React, { useEffect } from 'react';

export default function useOnClickOutside(
  ref: React.RefObject<HTMLDivElement>,
  onClickOutside: () => void
) {
  useEffect(() => {
    const handleClickListener = (event: MouseEvent) => {
      if (ref.current && !ref.current?.contains(event.target as Node)) {
        onClickOutside();
      }
    };
    document.addEventListener('mousedown', handleClickListener);

    return () => {
      document.removeEventListener('mousedown', handleClickListener);
    };
  }, [ref]);
}
