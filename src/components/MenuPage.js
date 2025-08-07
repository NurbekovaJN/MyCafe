import React from "react"
import axios from "axios"
import { useState, useEffect, useCallback, useMemo } from "react"
import DishModal from './DishModal'
import DishList from './DishList'
import { useSearchParams } from "react-router-dom" 
import FilterSortPanel from './FilterSortPanel'

function MenuPage(){
    const [dishes, setDishes] = useState([]) // состояние всех блюд
    const [selectedDish, setSelectedDish] = useState(null) // состояние выбранного блюда
    const [isModalOpen, setIsModalOpen] = useState(false) // состояние открытой модалки
    const [loading, setLoading] = useState(true) // для загрузки
    const [error, setError] = useState(null) // для ошибки
    const [searchParams, setSearchParams] = useSearchParams()

    const [tempCategory, setTempCategory] = useState(searchParams.get('category') || 'Все блюда')
    const [tempSortBy, setTempSortBy] = useState(searchParams.get('sortBy') || 'name')
    const [tempSortOrder, setTempSortOrder] = useState(searchParams.get('sortOrder') || 'asc')
    const [tempIsVegan, setTempIsVegan] = useState(searchParams.get('isVegan') === 'true')

    const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('page') || '1', 10));
    const [pageSize, setPageSize] = useState(parseInt(searchParams.get('pageSize') || '10', 10));
    const [totalDishes, setTotalDishes] = useState(0); // общее количество элементов

    const handlePageChange = (page, pageSize) => {
        setCurrentPage(page);
        setPageSize(pageSize); // возможно, потребуется, если pageSize можно менять

        const newParams = new URLSearchParams(searchParams); // копируем текущие параметры
        newParams.set('page', page.toString()); // обновляем страницу
        newParams.set('pageSize', pageSize.toString()); // обновляем размер страницы
        setSearchParams(newParams, { replace: true }); // устанавливаем параметры
    };

    const handleCardClick = useCallback((dish) => {
        setSelectedDish(dish)
        setIsModalOpen(true)
    }, [])

    const handleCloseModal = useCallback(() => {
        setIsModalOpen(false)
        setSelectedDish(null)
    }, [])

    const handleApplyFilters = () => {   // обработчик кнопки Применить
        const newParams = new URLSearchParams()
        if(tempCategory !== 'Все блюда') newParams.set('category', tempCategory)
            newParams.set('sortBy', tempSortBy)
            newParams.set('sortOrder', tempSortOrder)
            newParams.set('isVegan', tempIsVegan)
            setSearchParams(newParams, {replace: true})
    }

    useEffect(() => {
        const API_URL = 'https://food-delivery.kreosoft.ru/api/dish'
        const fetchMenu = async () => {
            try {
                setLoading(true);
                const params = {
                    category: tempCategory === 'Все блюда' ? undefined : tempCategory,
                    sortBy: tempSortBy,
                    sortOrder: tempSortOrder,
                    page: currentPage,
                    isVegan: tempIsVegan === 'true'
                }
                const response = await axios.get(API_URL, {params})
                setDishes(response.data.dishes)
                setTotalDishes(response.data.totalCount)
                console.log(response.data.dishes)

            } catch (err) {
                console.error('ERROR fetching menu:', err);
                setError('Не удалось загрузить меню, пожалуйста, попробуйте позже.');
            } finally {
                setLoading(false);
            }
        }
        fetchMenu();
    }, [searchParams, currentPage, pageSize]) // Этот эффект запустится, только когда изменятся параметры в URL

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
            <FilterSortPanel
                categories={uniqueCategories}
                tempCategory={tempCategory}
                setTempCategory={setTempCategory}
                tempSortBy={tempSortBy}
                setTempSortBy={setTempSortBy}
                tempSortOrder={tempSortOrder}
                setTempSortOrder={setTempSortOrder}
                tempIsVegan={tempIsVegan}
                setTempIsVegan={setTempIsVegan}
                handleApplyFilters={handleApplyFilters}
            />
            <DishList 
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



