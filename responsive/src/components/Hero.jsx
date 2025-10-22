import React, { useState } from 'react'
import { ReactTyped } from "react-typed";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { IoInformationCircleOutline } from "react-icons/io5";

const Hero = ({ meals, selectedCategory, loading, onAddToFavorites, onRemoveFromFavorites, isFavorite }) => {
  
  const handleFavoriteClick = (meal) => {
    if (isFavorite(meal.idMeal)) {
      onRemoveFromFavorites(meal.idMeal)
    } else {
      onAddToFavorites(meal)
    }

  }
  return (
    <>
      <div className='bg-white mx-12 sm:mx-7 md:mx-24'>
        <h1 className='headings'>
          {selectedCategory === 'all' ? 'All Meals' : `${selectedCategory} Meals`}
        </h1>
        
        {loading ? (
          <div>Loading meals...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
            {meals.map((meal) => (
              <div key={meal.idMeal} className="border rounded-lg text-center relative overflow-hidden">
                                <button
                onClick={() => handleFavoriteClick(meal)}
                className="absolute top-2 right-2 z-10 p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform">
                {isFavorite(meal.idMeal) ? (
                  <FaHeart className="h-4 w-4 text-red-500" />) : (<FaRegHeart className="h-4 w-4 text-black hover:text-red-500" />
                )}
              </button>
                <img src={meal.strMealThumb} alt={meal.strMeal} className="w-100 h-40 mb-3 object-cover object-center"/>
                <div className='p-4 relative'>

                <h4 className="font-medium">{meal.strMeal}</h4>
                <button className='btn'>More Details</button>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {!loading && meals.length === 0 && (
          <div>No meals found</div>
        )}
      </div>
    </>
  )
}

export default Hero