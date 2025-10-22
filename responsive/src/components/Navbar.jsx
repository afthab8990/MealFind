import React, { useState } from 'react'
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai'

const Navbar = ({ categories, onCategorySelect, onShowFavorites }) => { 
    const [nav, setNav] = useState(false)
    
    const handleNav = () => {
        setNav(!nav)
    }

    const handleCategory = (category) => {
        onCategorySelect(category)
        setNav(false) 
    }

    const handleFavorites = () => {
        onShowFavorites()
        setNav(false)
    }

    return (
        <>

            <div className='flex fixed top-0 right-0 justify-between border-b bg-white items-center h-20 border-gray-300 w-full mx-auto px-4 z-30'>
                <h1 className='text-xl md:text-3xl sm:text-4xl font-bold text-white bg-blue-500 p-2 rounded-sm'>MEALfind.</h1>
                
                <input
                    type="text"
                    placeholder="Search for meals..."
                    className="w-1/2 mx-4 pl-4 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />

                <button className='fixed top-22 right-5 bg-amber-200 p-2 rounded-full'>Random</button>
                

                <div onClick={handleNav} className='cursor-pointer z-55 p-2'>
                    
                    <p className='z-25'>Categories</p>
                </div>
            </div>


            <div className={nav ? 'fixed top-20 right-0 flex-col overflow-x-auto whitespace-nowrap justify-center h-full max-sm:w-1/2 w-1/4 border-l border-t border-gray-300 bg-white ease-in-out duration-500 z-25 p-6' : 'fixed top-[-100%] z-25 opacity-0 '}>

                <ul>
                    <li 
                        className='btn ' 
                        onClick={handleFavorites}>
                        Favourites
                    </li>
                    <hr />

                    {categories.map((ca) => (  
                        <li 
                            className='btn ' 
                            onClick={() => handleCategory(ca.strCategory)} 
                            key={ca.idCategory}>
                            {ca.strCategory}
                        </li>
                
              ))}
                </ul>
            </div>
        </>
    )
}

export default Navbar