import Chatuser from "./Chatuser"
import Message from "./Message"
import Typesend from "./Typesend"
const Right = () => {
  return (
    <div className='w-[70%] bg-slate-900 flex flex-col h-screen text-gray-300'>
       <Chatuser/>
       <div className=' flex-1 overflow-y-auto' style={{ minHeight: "calc(83vh)" }}><Message/></div>
       <Typesend/>
    </div>
  )
}

export default Right