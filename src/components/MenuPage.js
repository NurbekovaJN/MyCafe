import axios from "axios"
import { useState, useEffect, useMemo } from "react"
import DishModal from './DishModal'
import CategoryFilter from './CategoryFilter'
import DishList from './DishList'
import VeganFilter from "./VeganFilter"
import { Pagination } from "antd"
import Sorting from "./Sorting"
import { replace, useSearchParams } from "react-router-dom" 


function MenuPage(){
    const [dishes, setDishes] = useState([]) // состояние всех блюд
    const [loading, setLoading] = useState(true) // для загрузки
    const [error, setError] = useState(null) // для ошибки
    const [isModalOpen, setIsModalOpen] = useState(false) // состояние открытой модалки
    const [selectedDish, setSelectedDish] = useState(null) // состояние выбранного блюда
    const [selectedCategory, setSelectedCategory] = useState('Все блюда') // состояние выбранной категории
    const [searchParams, setSearchParams] = useSearchParams()

    const currentCategory = searchParams.get('category') || 'Все блюда'
    const currentSortBy = searchParams.get('sortBy') || 'nameAsc'
    const currentIsVegan = searchParams.get('isVegan') === 'true'
    const currentPage = parseInt(searchParams.get('page') || '1', 10)
    const currentPageSize = parseInt(searchParams.get('pageSize') || '10', 10)

    const [totalDishes, setTotalDishes] = useState(0)

    const handleCardClick = (dish) => {
        setSelectedDish(dish)
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
        setSelectedDish(null)
    }

    const handleCategorySelect = (category) => {
        setSearchParams(prevParams => {
            const newParams = new URLSearchParams(prevParams)
            if(category === 'все блюда'){
                newParams.delete('category')
            }else{
                newParams.set('category', category)
            }
            newParams.set('page', '1')
            return newParams    
        },{replace: true})
    }

    const handleSortChange =(sortBy) => {
        setSearchParams(prevParams => {
            const newParams = new URLSearchParams(prevParams)
            newParams.set('sortBy', sortBy)
            newParams.set('page', '1')
            return newParams
        },{replace: true})
    }

    const handleVeganFilterChange = (isVegan) => {
        setSearchParams(prevParams => {
            const newParams = new URLSearchParams(prevParams)
            if(isVegan){
                newParams.set('isVegan', 'true')
            }else{
                newParams.delete('isVegan')
            }
            newParams.set('page', '1')
            return newParams
        },{replace: true})
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
                const apiQueryParams = new URLSearchParams()

                if(currentCategory !== 'все блюда'){
                    apiQueryParams.append('category', currentCategory)
                }
                apiQueryParams.append('sorting', currentSortBy)
                apiQueryParams.append('page', currentPage.toString())
                apiQueryParams.append('pageSize', currentPageSize.toString())
                if(currentIsVegan){
                    apiQueryParams.append('isVegan', 'true')
                }
                if(apiQueryParams.toString()){
                    MenuApiUrl += '?' + apiQueryParams.toString()
                }
                console.log('Fetching URL:', MenuApiUrl)

                const response = await axios.get(MenuApiUrl)
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
    }, [searchParams, currentCategory, currentSortBy, currentIsVegan, currentPage, currentPageSize])

    // Список уникальных категорий для фильтрации
    // (Возможно, эти категории следует получать отдельным запросом или иметь статическим списком,
    // чтобы пользователь мог выбрать категории, которых нет в текущей выборке блюд)
    const uniqueCategories = useMemo(() => {
        const categories = new Set(dishes.map(dish => dish.category));
        return ['Все блюда', ...Array.from(categories)];
    }, [dishes]); // Пересчитываем только при изменении списка блюд

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
                <CategoryFilter 
                    categories={uniqueCategories} 
                    onCategorySelect={handleCategorySelect} 
                />
                <Sorting 
                    onSortChange={handleSortChange} 
                />
                <VeganFilter 
                    onVeganFilterChange={handleVeganFilterChange} 
                />
                <button className="apply-button">Применить</button>

            </div>
            
            <DishList 
                dishes={dishes} 
                onCardClick={handleCardClick} 
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
                    onClose={handleCloseModal}
                    dish={selectedDish}
                />
            )}
        </div>
    )
}

export default MenuPage

//     if(loading){
//         return(
//             <div className="loading-message">Загрузка меню...</div> // отображение загрузки
//         )
//     }
//     if(error){
//         return(
//             <div className="error-message">ERROR: {error}</div> // отображение ошибки
//         )
//     }

//     const filteredDishes = selectedCategory === 'Все блюда'
//         ? dishes 
//         : dishes.filter(dish => dish.category === selectedCategory) // тернарный оператор для определения каких блюд будут отображаться

//     const uniqeCategories = ['Все блюда', ...new Set(dishes.map(dish => dish.category))] // подготовка всех списков категорий блюд для отображения

//     return(
//         <div className="menu-container">
//             <div className="filter-sort-container">
//                 <CategoryFilter // компонент для фильтра по категориям
//                     categories={uniqeCategories} // пропс со всеми категориями блюд
//                     selectedCategory={selectedCategory} // пропс для выбранной категории
//                     onSelectCategory={handleCategorySelect} // пропс для функции обработчика выбора категории
//                 />
//                 <Sorting/>
//                 <VeganFilter/>
//                 <button className="apply-button">Применить</button>
//             </div>
//             <DishList // компонент для списка блюд
//                 dishes={filteredDishes} // пропс для отображения блюд
//                 onDishClick={handleCardCLick} // пропс для функции обработчика карточки блюда
//             />
//             <DishModal // компонент для модального окна с блюдом
//                 isOpen={isModalOpen} // пропс для открытия окна
//                 dish={selectedDish} // пропс для выбранного блюда
//                 onClose={handleCloseModal} // пропс для функции обработчика закрытия модального окна
//             />
//                 <Pagination className="pagination"/>
//         </div>
// )}
    
// export default MenuPage


