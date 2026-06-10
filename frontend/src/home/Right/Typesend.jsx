import React from 'react'
import { IoSend } from "react-icons/io5";

const Typesend = () => {
    return (
        <div className='flex gap-2 h-[8vh] text-center justify-center items-center bg-gray-800'>
         <div className='w-[80%]'>
             <input  type="text" placeholder="Type here" className="border outline-none rounded-full border-gray-400 p-2 w-full" />
         </div>
          <button className=' '>
            <IoSend className='text-4xl'/>
          </button>
        </div>  
    )
}

export default Typesend