import React from "react"
import { useState, useCallback, useMemo } from "react"
import DishModal from './DishModal'
import { useSearchParams, useNavigate } from "react-router-dom" 
import Menu from "./Menu"
import UseMenuData from "./UseMenuData"
import FilterOptions from "./FilterOptions"

function MenuPage(){
    const [selectedDish, setSelectedDish] = useState(null) // состояние выбранного блюда
    const [isModalOpen, setIsModalOpen] = useState(false) // состояние открытой модалки

    const { 
        dishes,
        loading,
        error,
        totalDishes,
        tempCategory,
        setTempCategory,
        tempSortBy,
        setTempSortBy,
        tempSortOrder,
        setTempSortOrder,
        tempIsVegan,
        setTempIsVegan,
        currentPage,
        pageSize,
    } = UseMenuData()  // Используем хук для получения данных и состояния
    
    const navigate = useNavigate();
    const [searchParams] = useSearchParams()

    const handleApplyFilters = () => {   // обработчик кнопки Применить
        const newParams = new URLSearchParams()
        if(tempCategory !== 'Все блюда') newParams.set('category', tempCategory)
            newParams.set('sortBy', tempSortBy)
            newParams.set('sortOrder', tempSortOrder)
            newParams.set('isVegan', tempIsVegan)
            newParams.set('page', currentPage.toString())
            newParams.set('pageSize', pageSize.toString())
            // Перенаправляем пользователя с новыми параметрами запроса
            navigate(`?${newParams.toString()}`, { replace: true }) 
    }

    const handlePageChange = (page, pageSize) => { 
        const newParams = new URLSearchParams(searchParams) // копируем текущие параметры
        newParams.set('page', page.toString()) // обновляем страницу
        newParams.set('pageSize', pageSize.toString()) // обновляем размер страницы
        navigate(`?${newParams.toString()}`, { replace: true }) // устанавливаем параметры
    }

    const handleCardClick = useCallback((dish) => {
        setSelectedDish(dish)
        setIsModalOpen(true)
    }, [])

    const handleCloseModal = useCallback(() => {
        setIsModalOpen(false)
        setSelectedDish(null)
    }, [])

    const uniqueCategories = useMemo(() => {
        const categories = new Set(dishes.map(dish => dish.category));
        return ['Все блюда', ...Array.from(categories)];
    }, [dishes]) // Пересчитываем только при изменении списка блюд

    if (loading) {
        return <div className="loading-message">Загрузка меню...</div>;
    }
    if (error) {
        return <div className="error-message">ERROR: {error}</div>;
    }

    return (
        <div className="menu-page">
            <FilterOptions
                categories={uniqueCategories}
                tempCategory={tempCategory}
                setTempCategory={setTempCategory}
                tempSortBy={tempSortBy}
                etTempSortBy={setTempSortBy}
                tempSortOrder={tempSortOrder}
                setTempSortOrder={setTempSortOrder}
                tempIsVegan={tempIsVegan}
                setTempIsVegan={setTempIsVegan}
                handleApplyFilters={handleApplyFilters}
            />
            <Menu
                dishes={dishes}
                onDishClick={handleCardClick}
                currentPage={currentPage}
                pageSize={pageSize}
                totalDishes={totalDishes}
                onPageChange={handlePageChange}
            />
            <DishModal isOpen={isModalOpen} dish={selectedDish} onClose={handleCloseModal} />
        </div>
    )
}

export default MenuPage



