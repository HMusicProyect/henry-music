import React from 'react';
import { Dialog, Transition } from '@headlessui/react';

const Modal = (
  {children, isModalOpen, setIsModalOpen}:
  {
    children: React.ReactNode, 
    isModalOpen: boolean, 
    setIsModalOpen: (val: boolean) => void
  }) => {

    return (
      <Transition show={isModalOpen} as={React.Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={setIsModalOpen}
        >
          <div className="flex items-center justify-center min-h-screen">
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-80" />

            <div className="bg-white text-black w-3/5 h-3/5 rounded-2xl flex items-center justify-center">
              {children}

              <button className="bg-transparent border-none outline-none w-8 h-8" />
            </div>
          </div>
        </Dialog>
      </Transition>
    )
}

export default Modal;