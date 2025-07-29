import axios from "axios"
import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import DishModal from './DishModal'
import CategoryFilter from './CategoryFilter'
import DishList from './DishList'


function MenuPage(){
    const [dishes, setDishes] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedDish, setSelectedDish] = useState(null)

    const [selectedCategory, setSelectedCategory] = useState('ALL')

    const handleCardCLick = (dish) => {
        setSelectedDish(dish)
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
        setSelectedDish(null)
    } 

    const handleCategorySelect = (category) => {
        setSelectedCategory(category)
    }

    useEffect(() => {
        const MenuUrl = 'https://food-delivery.kreosoft.ru/api/dish'
    
        const fetchMenu = async() => {
            try{
                setLoading(true)
                setError(null)

                const response = await axios.get(MenuUrl)
                console.log(response.data.dishes)
                setDishes(response.data.dishes)
                
            }
            catch(err){
                console.log('ERROR', err)
                setError('Не удалось загрузить меню, пожалуйста попробуйте позже.')
    
            }
            finally{
                setLoading(false)
            }
        } 
        fetchMenu()

},
[])

    if(loading){
        return(
            <div className="loading-message">Загрузка меню...</div>
        )
    }
    if(error){
        return(
            <div className="error-message">ERROR: {error}</div>
        )
    }

    const filteredDishes = selectedCategory === 'ALL' 
        ? dishes 
        : dishes.filter(dish => dish.category === selectedCategory)

    const uniqeCategories = ['ALL', ...new Set(dishes.map(dish => dish.category))]

    return(
        <div className="menu-container">
            <CategoryFilter 
                categories={uniqeCategories}
                selectedCategory={selectedCategory}
                onSelectCategory={handleCategorySelect}
            />

            <DishList dishes={filteredDishes} onDishClick={handleCardCLick}/>

            <DishModal isOpen={isModalOpen} dish={selectedDish} onClose={handleCloseModal}/>
        </div>
)}
    
export default MenuPage


