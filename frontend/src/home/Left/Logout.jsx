import React from 'react'
import { CiLogout } from "react-icons/ci";
const Logout = () => {
  return (
    <div className='hover:bg-slate-400 hover:rounded-lg hover:text-white transition-colors duration-200'>
        <button className='m-2 w-full flex items-center '>
            <CiLogout className='text-2xl ml-3'/>
            <h1 className='text-xl ml-3'>Logout</h1>
        </button>
    </div>
  )
}

export default Logout