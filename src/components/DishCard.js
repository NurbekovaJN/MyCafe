import { Rate } from "antd"
import { Link } from "react-router-dom"

function DishCard({dish, onClick, onClose }){ // передаем пропсы из компонента MenuPage

    return (
        <li className="dish" key={dish.id} onClick={onClick}>  
            <div className="dish-img">
                <div className="vegan-icon-container">{dish.vegetarian && (<img src="image/vegan.png" alt="vegan" className="vegan-icon"/>)}</div> 
            </div> 
                            
            <span style={{fontSize: '20px', color: 'darkred'}}>"{dish.name}"</span>
            <span>{dish.category}</span>
            <div className="rating-box">
                <Rate allowHalf value={dish.rating} count={10} disabled/>
            </div>
                            
            <div className="price-basket">
                <span style={{fontSize: '20px', color: 'grey'}}>Цена - {dish.price} руб</span>
                <Link onClick={(e) => e.stopPropagation()}>
                    <button className="buyButton">В корзину</button>
                </Link>
            </div>
        </li> // отрисовываем карточку с информацией о блюде
    )
}

export default DishCard
