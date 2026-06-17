import React from 'react'
import Logout from './Logout'
import Seach from './Seach'
import User from './User'

const Left = () => {
    return (
        <div className='w-[30%] bg-black text-gray-300'>
            <Seach/>
            <User/>
            <Logout/>
        </div>
    )
}

export default Left
