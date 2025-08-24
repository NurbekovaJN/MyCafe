import DishCard from './DishCard'
import { useState, useCallback } from 'react'
import DishModal from './DishModal'
import { Pagination } from 'antd'


function DishList({dishes, currentPage, pageSize, totalDishes, onPageChange}){ // пропсы с MenuPage
    const [selectedDish, setSelectedDish] = useState(null) // состояние выбранного блюда для модального окна
    const [isModalOpen, setIsModalOpen] = useState(false) // состояние модалки

    const handleCardClick = useCallback((dish) => { // обработчик клика для открытия модального окна
        setSelectedDish(dish)
        setIsModalOpen(true)
    }, [setSelectedDish, setIsModalOpen])

    const handleCloseModal = useCallback(() => { // для закрытия модального окна
        setSelectedDish(null)
        setIsModalOpen(false)
    }, [setSelectedDish, setIsModalOpen])
    
    if(dishes.length === 0){ 
        return <div className="no-dishes-message">Блюд в этой категории нет</div>
    }
    return(
        <div className="dishes-container">
            <ul className="dishes">
                {dishes.map(dish => ( 
                    <DishCard 
                        key={dish.id} 
                        dish={dish} 
                        onClick={() => handleCardClick(dish)}/> 
                    ))}
            </ul>
                <DishModal 
                    isOpen={isModalOpen}    
                    dish={selectedDish}
                    onClose={handleCloseModal}
                />
            <div className="pagination">
                <Pagination
                    // defaultCurrent={1}
                    // total={50}
                    currentPage={currentPage}
                    pageSize={pageSize}
                    totalDishes={totalDishes}
                    onChange={onPageChange}
                />
            </div>
        </div>
    )
}

export default DishList
