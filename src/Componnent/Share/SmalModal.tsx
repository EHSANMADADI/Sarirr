import React from 'react'
import { MdClose } from "react-icons/md";
interface ModalInput {
  Open: boolean,
  onClose: () => void,
  children: any,
  
}
export default function SmalModal({ Open, onClose, children }: ModalInput) {


  if (!Open) return null;


  const Handelclose = (e: { target: { id: string; }; }) => {
    if (e.target.id === 'wrapper') onClose();
  }

  return (
    <div className='fixed inset-y-32 right-0 lg:w-2/3 w-full flex justify-center h-screen items-center transition-colors bg-opacity-25 z-50 ' id='wrapper' onClick={() => Handelclose}>
      <div className='w-full sm:w-3/5 max-h-96  flex flex-col sm:mx-0 mx-auto'>
        <div className='bg-gray-50 border-2 border-blue-300 rounded p-5 h-[78vh] overflow-auto flex-col '>
          <button className=' text-3xl bg-transparent p-2 mb-1' onClick={() => onClose()}><MdClose className='text-3xl bg-white' /></button>
          <div className='w-full flex-col items-center justify-center'>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}