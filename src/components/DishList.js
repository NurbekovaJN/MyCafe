
import DishCard from './DishCard'

function DishList({dishes, onDishClick}){
    if(dishes.length === 0){
        return <div className="no-dishes-message">Блюд в этой категории нет</div>
    }
    return(
        <ul className="dishes">
            {dishes.map(dish => (
                <DishCard key={dish.id} dish={dish} onClick={() => onDishClick(dish)}/>
            ))}
        </ul>
    )
}

export default DishList

