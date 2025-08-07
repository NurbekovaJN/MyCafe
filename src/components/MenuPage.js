import react from "react"
import axios from "axios"
import { useState, useEffect, useCallback, useMemo } from "react"
import DishModal from './DishModal'
import DishList from './DishList'
import { Pagination } from "antd"
import { useSearchParams } from "react-router-dom" 
import FilterSortPanel from './FilterSortPanel'

function MenuPage(){
    const [dishes, setDishes] = useState([]) // состояние всех блюд
    const [isModalOpen, setIsModalOpen] = useState(false) // состояние открытой модалки
    const [selectedDish, setSelectedDish] = useState(null) // состояние выбранного блюда

    const [loading, setLoading] = useState(true) // для загрузки
    const [error, setError] = useState(null) // для ошибки
    const [searchParams, setSearchParams] = useSearchParams()

    const [tempCategory, setTempCategory] = useState(searchParams.get('category') || 'Все блюда');
    const [tempSortBy, setTempSortBy] = useState(searchParams.get('sortBy') || 'name');
    const [tempSortOrder, setTempSortOrder] = useState(searchParams.get('sortOrder') || 'asc');
    const [tempIsVegan, setTempIsVegan] = useState(searchParams.get('isVegan') === 'true'); // URL параметр 'true'/'false' -> boolean
    
    const currentPage = parseInt(searchParams.get('page') || '1', 10)
    const currentPageSize = parseInt(searchParams.get('pageSize') || '10', 10)

    const handleCardClick = useCallback((dish) => {
        setSelectedDish(dish)
        setIsModalOpen(true)
    }, [])

    const handleCloseModal = useCallback(() => {
        setIsModalOpen(false)
        setSelectedDish(null)
    }, [])

    const handleApplyFilters = () => {
        const newParams = new URLSearchParams()
        if(tempCategory !== 'Все блюда') newParams.set('category', tempCategory)
            newParams.set('sortBy', tempSortBy)
            newParams.set('sortOrder', tempSortOrder)
            newParams.set('isVegan', tempIsVegan)
            setSearchParams(newParams, {replace: true})
    }

    useEffect(() => {
        const API_URL = 'https://food-delivery.kreosoft.ru/api/'
        const fetchMenu = async () => {
            try {
                setLoading(true);
                const params = {
                    category: tempCategory === 'Все блюда' ? undefined : tempCategory,
                    sortBy: tempSortBy,
                    sortOrder: tempSortOrder,
                    isVegan: tempIsVegan
                }
                const response = await axios.get(API_URL, {params})
                setDishes(response.data.dishes)

            } catch (err) {
                console.error('ERROR fetching menu:', err);
                setError('Не удалось загрузить меню, пожалуйста, попробуйте позже.');
            } finally {
                setLoading(false);
            }
        };
        fetchMenu();
    }, [searchParams]); // Этот эффект запустится, только когда изменятся параметры в URL

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
            <h1>Меню</h1>
            <FilterSortPanel
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
            <DishList dishes={dishes} onCardClick={handleCardClick}
            />
            <DishModal isOpen={isModalOpen} dish={selectedDish} onClose={handleCloseModal} />
        </div>
    );
}

export default MenuPage



