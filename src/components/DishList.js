import DishCard from './DishCard'
import { Pagination } from 'antd';


function DishList({dishes, onDishClick, currentPage, pageSize, totalDishes, onPageChange}){ // пропсы с FilterSortPanel
    if(dishes.length === 0){ 
        return <div className="no-dishes-message">Блюд в этой категории нет</div>
    }
    return(
        <div className="dishes-container">
            <ul className="dishes">
                {dishes.map(dish => ( 
                    <DishCard key={dish.id} dish={dish} onClick={() => onDishClick(dish)}/> 
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

