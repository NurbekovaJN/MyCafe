import { Link } from "react-router-dom"
import { Rate } from "antd"

function DishModal({isOpen, dish, onClose}){ // пропсы из DishList
    if(!isOpen){ 
        return null 
    }
    if(!dish){
        return null 
    }

    return(
        <div className="modal-overlay" onClick={onClose}> 
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>

                <div className="dish-img" style={{width: '400px', height: '400px'}}>
                    <div className="vegan-icon-container">{dish.vegetarian && (<img src="image/vegan.png" alt="vegan" className="vegan-icon"/>)}</div>
                </div>

                <div className="dish-desc">
                    <span style={{fontSize: '40px', color: 'darkred'}}>"{dish.name}"</span>
                    <span>Категория - {dish.category}</span>
                    <span>{dish.description}</span>

                    <div className="rating-box">
                        <Rate allowHalf value={dish.rating} count={10} disabled/>
                    </div>

                    <div className="price-basket" style={{marginTop: '20%', alignSelf: 'center'}}>
                        <span style={{fontSize: '20px', color: 'grey'}}>Цена - {dish.price} руб</span>
                        <Link>
                            <button className="buyButton">В корзину</button>
                        </Link>
                    </div>
                </div>
                <img src='image/close.png' className="close-modal-icon" onClick={onClose}/> 
            </div>
        </div>
    ) // отображение модального окна с подробной информацией о блюде
} 

export default DishModal

