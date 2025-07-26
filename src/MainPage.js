import axios from "axios"
import { useState, useEffect } from "react"


function GetAllFoods(){
    const [dishes, setDishes] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [selectedCategories, setSelectedCategories] = useState([])
    const [isVegeterianOnly, setIsVegeterianOnly] = useState(false)
    const [sortBy, setSortBy] = useState('')

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

    return(
        <div className="menu-container">
            <ul className="dishes">
                {dishes.map(dish => (
                    <li className="dish" key={dish.id}>
                        <span>{dish.name}</span>
                        <span>{dish.category}</span>
                        <div className="dish-img"></div>
                        <span>{dish.description}</span>
                        <span>{dish.price} руб</span>
                        <span>{dish.rating}</span>
                        <span>{dish.vegetarian}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}



export default GetAllFoods