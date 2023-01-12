import React from 'react';
import { SlClose } from 'react-icons/sl';
import Portal from './portal';

type ModalProps = {
  visible: boolean;
  handleClose: () => void;
  children: React.ReactNode;
};

export default function Modal({ visible, handleClose, children }: ModalProps) {
  if (!visible) return null;
  return (
    <Portal portalElementID='modal-portal'>
      <div className='modal fixed inset-0 flex items-center justify-center bg-gray-800/75'>
        <div className='rounded-md flex flex-col p-4'>
          <div className='flex justify-end'>
            <button className='modal__close-btn' onClick={() => handleClose()}>
              <SlClose fill='white' size={25} />
            </button>
          </div>
          <div className='modal__body mt-2'>{children}</div>
        </div>
      </div>
    </Portal>
  );
}
