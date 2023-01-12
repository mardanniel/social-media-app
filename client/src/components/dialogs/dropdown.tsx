import { ReactNode, useRef, useState } from 'react';
import useOnClickOutside from '../../hooks/useOnClickOutside';

type DropdownProps = {
  header: ReactNode;
  menuItems: ReactNode[];
  gap?: string;
};

export default function Dropdown({
  header,
  menuItems,
  gap = 'top-10',
}: DropdownProps) {
  const [optionsVisibility, setOptionsVisibility] = useState(false);
  const dropDownRef = useRef(null);
  useOnClickOutside(dropDownRef, () => setOptionsVisibility(false));

  return (
    <div ref={dropDownRef} className='relative w-auto flex flex-col items-end'>
      <button onClick={() => setOptionsVisibility((prevState) => !prevState)}>
        {header}
      </button>
      {optionsVisibility && (
        <ul
          className={`absolute w-auto ${gap} right-0 bg-zinc-800 rounded-lg p-4`}
        >
          {menuItems.map((menuItem, index) => (
            <li key={index}>{menuItem}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

