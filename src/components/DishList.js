
import DishCard from './DishCard'

function DishList({dishes, onDishClick}){ // передаем пропсы с компонента ManuPage
    if(dishes.length === 0){ 
        return <div className="no-dishes-message">Блюд в этой категории нет</div>
    }
    return(
        <ul className="dishes">
            {dishes.map(dish => ( // преобразуем каждое блюдо в массиве всех блюд
                <DishCard key={dish.id} dish={dish} onClick={() => onDishClick(dish)}/> // передаем компонент для отображения карточки блюда с информацией, а так же в аттрибуте передаем обработчик клика по карточке 
            ))}
        </ul>
    )
}

export default DishList

