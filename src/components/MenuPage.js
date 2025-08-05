import axios from "axios"
import { useState, useEffect, useMemo } from "react"
import DishModal from './DishModal'
import CategoryFilter from './CategoryFilter'
import DishList from './DishList'
import VeganFilter from "./VeganFilter"
import { Pagination } from "antd"
import Sorting from "./Sorting"
import { useSearchParams } from "react-router-dom" 

function MenuPage(){
    const [dishes, setDishes] = useState([]) // состояние всех блюд
    const [loading, setLoading] = useState(true) // для загрузки
    const [error, setError] = useState(null) // для ошибки
    const [isModalOpen, setIsModalOpen] = useState(false) // состояние открытой модалки
    const [selectedDish, setSelectedDish] = useState(null) // состояние выбранного блюда
    const [totalDishes, setTotalDishes] = useState(0)
    const [searchParams, setSearchParams] = useSearchParams()

    const currentPage = parseInt(searchParams.get('page') || '1', 10)
    const currentPageSize = parseInt(searchParams.get('pageSize') || '10', 10)

    const handleCardClick = (dish) => {
        setSelectedDish(dish)
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
        setSelectedDish(null)
    }

    const handlePageChange = (page, pageSize) => {
        setSearchParams(prevParams => {
            const newParams = new URLSearchParams(prevParams)
            newParams.set('page', page.toString())
            newParams.set('pageSize', pageSize.toString())
            return newParams
        },{replace: true}) 
    }

    useEffect(() => {
        const fetchMenu = async() => {
            try{
                setLoading(true)
                setError(null)

                let MenuApiUrl = 'https://food-delivery.kreosoft.ru/api/dish'
                const params = new URLSearchParams()

                if(params.get('category') === 'Все блюда'){
                    params.delete('category')
                }
                if(!params.has('sortBy')){
                    params.set('sortBy', 'name')
                }
                if(!params.has('isVegan')){
                    params.set('isVegan', 'vegan')
                }
                if(!params.has('page')){
                    params.set('page', '1')
                }
                if(!params.has('pageSize')){
                    params.set('pageSize', '10')
                }
                console.log('Fetching URL:', MenuApiUrl)

                const response = await axios.get(MenuApiUrl)
                console.log(response.data.dishes)
                setDishes(response.data.dishes)
                setTotalDishes(response.data.pagination.count)
            }
            catch(err){
                console.log('ERROR fetching menu:', err)
                setError('Не удалось загрузить меню, пожалуйста попробуйте позже')
            }
            finally{
                setLoading(false)
            }
        } 
        fetchMenu()
    }, [searchParams])

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
            <div className="filter-sort-container">
                {/* Компоненты фильтров и сортировки теперь получают только колбэки */}
                <CategoryFilter categories={uniqueCategories}/>
                <Sorting/>
                <VeganFilter/>
                <button className="apply-button">Применить</button>
            </div>
            <DishList 
                dishes={dishes} 
                onDishClick={handleCardClick} 
            />
            <Pagination className="pagination"
                current={currentPage}
                pageSize={currentPageSize}
                total={totalDishes}
                onChange={handlePageChange}
                // showSizeChanger
                // pageSizeOptions={[5, 10, 20, 50]} // Пример опций для выбора размера страницы
            />
            {selectedDish && (
                <DishModal
                    isOpen={isModalOpen}
                    dish={selectedDish}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    )
}

export default MenuPage





