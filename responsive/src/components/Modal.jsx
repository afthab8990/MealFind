import React from 'react'

const Modal = ({meal, isopen, onClose, loading}) => {
  return (
    <div className='flex w-full h-full fixed justify-center items-center top-0 right-0 z-100'>
      <div className='absolute z-100 w-full h-full bg-gray-400 opacity-50'></div>
      
      <div className='relative z-110 w-[100vw] sm:w-[65vw] md:w-[40vw] bg-white border-1 border-gray-300 rounded-md p-6'>
        {loading ? (
          <div className='flex justify-center items-center h-64'>
            <p>Loading...</p>
          </div>
        ) : meal ? (
          <div className='relative max-h-[85vh] min-h-[70vh] overflow-y-auto'>
            <button onClick={onClose} className='absolute top-2 right-2 bg-gray-200 hover:bg-gray-300 text-black w-8 h-8 flex justify-center items-center rounded-full p-2'>&#10005;</button>

            <h2 className='text-4xl my-3'>{meal.strMeal}</h2>
            <p className='text-md my-2 text-gray-700'>{meal.strCategory}</p>

            <img 
              src={meal.strMealThumb} 
              alt="meal" 
              className='w-full h-50 sm:h-40 md:h-60 mb-3 object-cover object-center rounded-md'
            />

            <h1 className='text-lg my-2'>Ingredients</h1>
            <div className='flex m-2'>
              <p className='ingredients'>{meal.strIngredient1}</p>
              <p className='ingredients'>{meal.strIngredient2}</p>
              <p className='ingredients'>{meal.strIngredient3}</p>
              <p className='ingredients'>{meal.strIngredient4}</p>
              <p className='ingredients'>{meal.strIngredient5}</p>
              <p className='ingredients'>{meal.strIngredient6}</p>
            </div>
            
            <h1 className='text-lg my-2'>Instructions</h1>
            <p className='font-thin text-sm text-gray-700 text-justify px-2'>{meal.strInstructions}</p>
          </div>
        ) : (
          <p>No meal data available</p>
        )}
      </div>
    </div>
  )
}

export default Modal