import React from 'react'
import { FaSearch } from "react-icons/fa";
const Seach = () => {
    return (
        <div className='mt-4 ml-2' >
            <form action="" className='flex gap-9'>
                <label className="input w-[70%] bg-slate-900">
                    
                    <input type="search" required placeholder="Search" />
                </label>
                <button className='w-[50px] hover:bg-slate-800 hover:rounded-lg hover:text-white transition-colors duration-200'>
                    <FaSearch className='text-2xl ml-3'/>
                </button>
            </form>
        </div>
    )
}

export default Seach
