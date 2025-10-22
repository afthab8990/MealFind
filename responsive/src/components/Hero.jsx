import React, { useEffect, useState } from 'react'
import { ReactTyped } from "react-typed";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import axios from 'axios';
import Modal from './Modal';

const Hero = ({ meals, selectedCategory, loading, onAddToFavorites, onRemoveFromFavorites, isFavorite }) => {
  const [modal, setModal] = useState('')
  const [loadModal, setLoadModal] = useState(false)
  const [mealDetails, setMealDetails] = useState(null)
  const [random,setRandom] = useState('')
  
  useEffect(() => {
    if (modal) {
      setLoadModal(true)
      axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${modal}`)
        .then(res => {
          console.log(res.data.meals) 
          setMealDetails(res.data.meals ? res.data.meals[0] : null)
        })
        .catch(error => {
          console.error('Error fetching meal details:', error)
          setMealDetails(null)
        })
        .finally(() => {
          setLoadModal(false)
        })
    }
  }, [modal]) 

  const handleModalClick = (mealId) => {
    console.log(mealId)
    setModal(mealId)
  }

  const closeModal = () => {
    console.log("close")
    setModal('')
    setMealDetails(null)
  }

  const handleRandom = () => {
    axios.get('https://www.themealdb.com/api/json/v1/1/random.php')
      .then(res => {
        const randomMeal = res.data.meals[0]; 
        setRandom(randomMeal); 
        setModal(randomMeal.idMeal); 
      })
      .catch(error => {
        console.error('Error fetching random meal:', error);
      });
  }

  const handleFavoriteClick = (meal) => {
    if (isFavorite(meal.idMeal)) {
      onRemoveFromFavorites(meal.idMeal)
    } else {
      onAddToFavorites(meal)
    }
  }

  return (
    <>
      <div className='relative bg-none m-12 sm:m-7 md:m-24 mt-20'> 
        <h1 className='text-2xl sm:text-3xl md:text-4xl my-4'>
          {selectedCategory === 'all' ? 'All Meals' : `${selectedCategory} Meals`}
        </h1>
      
      {/* Card load */}
        {loading ? (
          <div>Loading meals...</div>
        ) : (
          // Card grid
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
            {/* random laoder */}
            <div  className="border bg-blue-600 hover:bg-blue-700 cursor-pointer text-white flex justify-center items-center border-gray-300 rounded-lg hover:shadow-md text-center relative overflow-hidden transition-all" onClick={()=>{handleRandom()}}>
                <div className='p-2 relative'>
                  <h2 className="font-bold text-2xl">Click for random</h2>
                </div>
              </div>

              {/* Card mapper */}
            {meals.map((meal) => (
              <div key={meal.idMeal} className="border bg-white border-gray-300 rounded-lg hover:shadow-md text-center relative overflow-hidden transition-all">
                <button
                  onClick={() => handleFavoriteClick(meal)}
                  className="absolute top-2 right-2 z-10 p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform">
                  {isFavorite(meal.idMeal) ? (
                    <FaHeart className="h-4 w-4 text-red-500" />) : (<FaRegHeart className="h-4 w-4 text-black hover:text-red-500" />
                  )}
                </button>
                <img src={meal.strMealThumb} alt={meal.strMeal} className="w-100 h-40 mb-3 object-cover object-center"/>
                <div className='p-2 relative'>
                  <h2 className="font-medium">{meal.strMeal}</h2>
                  <button 
                    onClick={() => handleModalClick(meal.idMeal)} 
                    className=' btn w-full border-1 border-gray-200 hover:border-none'
                  >
                    More Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {!loading && meals.length === 0 && (
          <div>No meals found</div>
        )}
        
        {/* Prop set */}
        {loadModal ? (
          <Modal 
            meal={mealDetails} 
            isOpen={!!modal} 
            onClose={closeModal} 
            loading={loadModal}
          />
        ) : modal && (
          <Modal 
            meal={mealDetails} 
            isOpen={!!modal} 
            onClose={closeModal} 
            loading={loadModal}
          />
        )}
      </div>
    </>
  )
}

export default Hero