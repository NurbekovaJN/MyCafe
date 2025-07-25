import axios from "axios"
import { useState, useEffect } from "react"


function GetAllFoods(){
    const [dishes, setDishes] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

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
                        <img src={dish.image} alt="dish-img" style={{width: '200px', height: '200px'}}/>
                        <span>{dish.description}</span>
                        <span>{dish.price}</span>
                        <span>{dish.rating}</span>
                        <span>{dish.vegetarian}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}



export default GetAllFoods