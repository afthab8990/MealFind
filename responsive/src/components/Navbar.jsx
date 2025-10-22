import React, { useState } from 'react'
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai'

const Navbar = ({ categories, onCategorySelect, onShowFavorites }) => { 
    const [nav, setNav] = useState(false)
    
    // Sidebar toggle
    const handleNav = () => {
        setNav(!nav)
    }

    // Category load and meals unload
    const handleCategory = (category) => {
        onCategorySelect(category)
        setNav(false) 
    }

    // Favourite loader
    const handleFavorites = () => {
        onShowFavorites()
        setNav(false)
    }

    return (
        <>
            <div className='flex fixed top-0 right-0 justify-between border-b bg-white items-center h-20 border-gray-300 w-full mx-auto px-4 z-30'>
                <h1 className='hidden md:block text-xl md:text-3xl sm:text-2xl font-bold text-white  bg-blue-500 p-2 rounded-sm'>MEALfind.mi</h1>
                {/* Searchbar (Not used) */}
                <input
                    type="text"
                    placeholder="Search for meals..."
                    className="w-1/2 mx-4 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                
                <div onClick={handleNav} className='cursor-pointer z-50 p-2'>
                    <button className='p-2 border-1 border-gray-300 hover:bg-gray-200 rounded-md transition-all duration-200'>Categories &#10093;</button>
                </div>
            </div>
{/* Category sidebar */}
            <div className={nav ? 'fixed top-20 right-0 flex-col overflow-x-auto whitespace-nowrap justify-center h-full max-sm:w-1/2 w-1/4 border-l border-t border-gray-300 bg-white transition-all ease-in-out duration-500 z-30 p-6' : 'hidden fixed top-[-100%]'}>
                <ul>
                    <h1 className='block md:hidden text-xl md:text-3xl sm:text-2xl font-bold text-white bg-blue-500 p-2 rounded-sm'>MEALfind.mi</h1>

                    <li 
                        className='btn' 
                        onClick={handleFavorites}>
                        &#9825; Favourites
                    </li>
                    <li 
                        className='btn' 
                        onClick={() => handleCategory('all')}>
                        All Meals
                    </li>
                    <hr />
                    
                    {/* Category mapper */}
                    {categories.map((ca) => (  
                        <li 
                            className='btn' 
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