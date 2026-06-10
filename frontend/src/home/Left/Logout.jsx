import React from 'react'
import { CiLogout } from "react-icons/ci";
const Logout = () => {
  return (
    <div className=''>
        <button className='m-2 w-full flex items-center '>
            <CiLogout className='text-4xl ml-3 p-1.5 hover:bg-gray-300 hover:rounded-full hover:text-black'/>
            
        </button>
    </div>
  )
}

export default Logout