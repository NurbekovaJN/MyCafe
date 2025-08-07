import DishCard from './DishCard'
import { Pagination } from 'antd';


function DishList({dishes, onDishClick, currentPage, pageSize, totalDishes, onPageChange}){ // передаем пропсы с компонента FilterSortPanel
    if(dishes.length === 0){ 
        return <div className="no-dishes-message">Блюд в этой категории нет</div>
    }
    return(
        <div className="dishes-container">
            <ul className="dishes">
                {dishes.map(dish => ( // преобразуем каждое блюдо в массиве всех блюд
                    <DishCard key={dish.id} dish={dish} onClick={() => onDishClick(dish)}/> // передаем компонент для отображения карточки блюда с информацией, а так же в аттрибуте передаем обработчик клика по карточке 
                ))}
            </ul>
            <div className="pagination">
                <Pagination
                    current={currentPage}
                    pageSize={pageSize}
                    total={totalDishes}
                    onChange={onPageChange}
                />
            </div>
        </div>
    )
}

export default DishList

