import { Rate } from "antd"
import { Link } from "react-router-dom"

function DishCard({dish, onClick }){ // передаем пропсы из компонента DishList

    return (
        // отображение карточки с подробной информацией о блюде
        <li className="dish" key={dish.id} onClick={onClick}>  
            <div className="dish-img">
                <div className="vegan-icon-container">{dish.vegetarian && (<img src="image/vegan.png" alt="vegan" className="vegan-icon"/>)}</div> 
            </div> 
                            
            <span style={{fontSize: '20px', color: 'darkred'}}>"{dish.name}"</span>
            <span>{dish.category}</span>
            <div className="rating-box">
                <Rate 
                    allowHalf 
                    defaultValue={2.5} 
                    value={dish.rating} 
                    count={10} 
                    disabled
                />
            </div>
                            
            <div className="price-basket">
                <span style={{fontSize: '20px', color: 'grey'}}>Цена - {dish.price} руб</span>
                <Link onClick={(e) => e.stopPropagation()}>
                    <button className="buyButton">В корзину</button>
                </Link>
            </div>
        </li> 
    )
}

export default DishCard


