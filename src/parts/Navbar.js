import { forwardRef } from 'react';
import { FiShoppingCart, FiSearch } from 'react-icons/fi';

function Navbar(_, ref) {
  return (
    <div ref={ref} className="flex py-3 px-10 bg-black text-white items-center fixed z-20 w-full shadow-md">
      <div className="w-1/4 text-xl flex">
        Toko<span className="font-bold tracking-wider">pedro</span>
      </div>
      <div className="w-3/4 flex justify-end space-x-4">
        <div className="flex w-2/3 bg-white rounded-sm items-center pl-4">
          <input type="text" placeholder="Search for something..." className="w-full border-0 outline-0 text-black " />
          <button className="bg-gray-400 px-3 h-full flex items-center justify-center rounded-r-sm rounded-b-sm hover:bg-gray-500">
            <FiSearch color="black" />
          </button>
        </div>
        <button className="flex items-center">
          <FiShoppingCart size={24} />
        </button>
        <div className="h-auto w-1 border-l border-gray-700" />
        <div className="flex space-x-2">
          <button className="px-4 py-2 border border-white rounded-sm flex justify-center align-items text-sm ">Log In</button>
          <button className="px-4 py-2 bg-white rounded-sm flex justify-center align-items text-sm text-black text-medium">Sign Up</button>
        </div>
      </div>
    </div>
  )
}

export default forwardRef(Navbar);