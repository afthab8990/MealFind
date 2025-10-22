
import { useState, useEffect } from 'react'
import axios from 'axios'
import Hero from './components/Hero'
import Navbar from './components/Navbar'

function App() {
  const [cat, setCat] = useState([])
  const [selectedCat, setSelectedCategory] = useState('all')
  const [meals, setMeals] = useState([])
  const [favorites, setFavorites] = useState([]) // Add favorites state
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    axios.get('https://www.themealdb.com/api/json/v1/1/categories.php')
      .then(res => setCat(res.data.categories))
      .catch(err => alert("Error fetching categories", err))
  }, [])

  // Load favorites from sessionStorage on mount
  useEffect(() => {
    const storedFavorites = sessionStorage.getItem('mealFavorites')
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites))
    }
  }, [])

  // Save favorites to sessionStorage when favorites change
  useEffect(() => {
    sessionStorage.setItem('mealFavorites', JSON.stringify(favorites))
  }, [favorites])

  useEffect(() => {
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
  }, [selectedCat])

  const handleCategorySelect = (category) => {
    setSelectedCategory(category)
  }

  // Favorite functions
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

  return (<>
    <div>
      <Navbar 
        categories={cat} 
        onCategorySelect={handleCategorySelect}
        favorites={favorites}
      />
      <Hero 
        meals={meals} 
        selectedCategory={selectedCat} 
        loading={loading}
        onAddToFavorites={addToFavorites}
        onRemoveFromFavorites={removeFromFavorites}
        isFavorite={isFavorite}
      />

    </div>
  </>)
}

export default App
