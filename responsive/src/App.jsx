import { useState, useEffect } from 'react'
import axios from 'axios'
import Hero from './components/Hero'
import Navbar from './components/Navbar'

function App() {
  const [cat, setCat] = useState([])
  const [selectedCat, setSelectedCategory] = useState('all')
  const [meals, setMeals] = useState([])
  const [favorites, setFavorites] = useState([])
  const [loading, setLoading] = useState(false)
  const [showFavorites, setShowFavorites] = useState(false) 

  useEffect(() => {
    axios.get('https://www.themealdb.com/api/json/v1/1/categories.php')
      .then(res => setCat(res.data.categories))
      .catch(err => alert("Error fetching categories", err))
  }, [])

  useEffect(() => {
    const storedFavorites = sessionStorage.getItem('mealFavorites')
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites))
    }
  }, [])

  useEffect(() => {
    sessionStorage.setItem('mealFavorites', JSON.stringify(favorites))
  }, [favorites])

  useEffect(() => {
    if (showFavorites) {
      setLoading(false)
      return
    }

    const fetchMeals = async () => {
      setLoading(true)
      try {
        let apiUrl;
        
        if (selectedCat === 'all') {
          apiUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s='
        } else {
          apiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCat}`
        }

        const response = await axios.get(apiUrl)
        setMeals(response.data.meals || [])
      } catch (err) {
        console.error("Unable to retrieve meals", err)
        setMeals([])
      } finally {
        setLoading(false)
      }
    }

    fetchMeals()
  }, [selectedCat, showFavorites]) 

  const handleCategorySelect = (category) => {
    setSelectedCategory(category)
    setShowFavorites(false)
  }

  const handleShowFavorites = () => {
    setShowFavorites(true)
    setSelectedCategory('favorites')
  }

  const addToFavorites = (meal) => {
    setFavorites(prev => {
      const exists = prev.find(fav => fav.idMeal === meal.idMeal)
      if (!exists) {
        return [...prev, meal]
      }
      return prev
    })
  }

  const removeFromFavorites = (mealId) => {
    setFavorites(prev => prev.filter(fav => fav.idMeal !== mealId))
  }

  const isFavorite = (mealId) => {
    return favorites.some(fav => fav.idMeal === mealId)
  }

  const mealsToDisplay = showFavorites ? favorites : meals
  const displayCategory = showFavorites ? 'Your Favorites' : selectedCat

  return (
    <div>
      <Navbar 
        categories={cat} 
        onCategorySelect={handleCategorySelect}
        onShowFavorites={handleShowFavorites}
      />
      <Hero 
        meals={mealsToDisplay} 
        selectedCategory={displayCategory} 
        loading={loading}
        onAddToFavorites={addToFavorites}
        onRemoveFromFavorites={removeFromFavorites}
        isFavorite={isFavorite}
      />
    </div>
  )
}

export default App