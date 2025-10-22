import React from 'react'

const Modal = ({meal, isopen, onClose , loading}) => {
  return (
    <div className='flex w-full h-full fixed justify-center items-center top-0 right-0 z-100'>
      <div className='absolute z-100 w-full h-full  bg-gray-400 opacity-50'>
      </div>

    <div className='z-110  w-[65vw] bg-white border-1 border-gray-300 rounded-md '>
        {loading ? (
          <div className='flex justify-center items-center h-64'>
            <p>Loading...</p>
          </div>
        ) : meal ? (
          <div className='relative max-h-[85vh] min-h-[70vh] overflow-y-auto' >
            <button onClick={()=>{onClose()}} className='absolute top-5 right-5 bg-white text-black w-8 h-8 flex justify-center items-center rounded-full p-2'>&#10005;</button>
            <img 
              src={meal.strMealThumb} 
              alt="meal" 
              className='w-full h-60 mb-3 object-cover object-center'
            />
            <div className='p-2'>
            <h2 className='text-2xl font-semibold my-4'>{meal.strMeal}</h2>
            <h1><u>Ingredients</u></h1>
            </div>
          </div>
        ) : (
          <p>No meal data available</p>
        )}

    </div>
    </div>
  )
}

export default Modal
