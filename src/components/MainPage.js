import axios from "axios"
import { useState, useEffect } from "react"
import MenuFilterSort from "./MenuFilterSort"
import DishRating from "./DishRating"
import { Rate } from 'antd'
import { Link } from "react-router-dom"


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
            {<ul className="dishes">
                {dishes.map(dish => (
                    <li className="dish" key={dish.id}>
                        <div className="dish-img"></div>
                        <span style={{fontSize: '20px', color: 'darkred'}}>{dish.name}</span>
                        <span>{dish.category}</span>
                        <div className="rating-box">
                            {/* {dish.rating.toFixed(1)} */}
                            <Rate allowHalf value={dish.rating} count={10} disabled/>
                        </div>
                        {/* <span>{dish.description}</span> */}
                        <span>{dish.vegetarian}</span>
                        <div className="price-basket">
                            <span style={{fontSize: '20px', color: 'grey'}}>Цена - {dish.price} руб</span>
                            <Link>
                                <button className="buyButton">В корзину</button>
                            </Link>
                        </div>
                    </li>
                ))}
            </ul>}
        </div>
    
    )}
    
    export default GetAllFoods
