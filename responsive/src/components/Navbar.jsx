import React, { useEffect, useState } from 'react'
import {AiOutlineClose,AiOutlineMenu} from 'react-icons/ai'
import axios, { Axios } from 'axios'

const Navbar = ({ categories , onCategorySelect}) => { 
    const [nav, setNav] = useState(true)
    const handleNav = () => {
        setNav(!nav)
    }

    const handleCategory = (category) =>{
      onCategorySelect(category)
    }

  return (
    <>
    <div className='flex justify-between bg-white c-primary items-center h-20 max-w-100% mx-auto px-4 z-20'>
      <h1 className='text-xl md:text-3xl sm:text-4xl font-bold c-primary whitespace-nowrap'>MEALfind.</h1>
      
      <input
        type="text"
        placeholder="Search for meals..."
        className="w-1/2 mx-4 pl-4 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
      />
      
      <div onClick={handleNav} className='cursor-pointer z-50 p-2'>
        {!nav ? <AiOutlineClose size={20} className='c-primary'/> : <AiOutlineMenu size={20} className='c-primary'/>}
      </div>
      
      <div className={!nav ? 'fixed top-0 flex-col overflow-x-auto whitespace-nowrap justify-center h-full max-sm:w-[50%] w-[30%] border-r border-gray-900 bg-white ease-in-out duration-500 right-0 mx-auto p-6 ' : 'fixed right-[-100%]'}>
        <h1 className='w-full text-3xl font-bold text-emerald-500 p-4 border-b-black'>MEALfind.</h1>

        <ul >
          <li className='btn border-b-gray-600'>Favourites</li>
          {categories.map((ca) => (  
            <li className='btn' onClick={()=>handleCategory(ca.strCategory)} key={ca.idCategory}>{ca.strCategory}</li>
          ))}
        </ul>
      </div>
    </div>
  </>
  )
}

export default Navbar