import axios from "axios"
import { useState, useEffect } from "react"
import DishModal from './DishModal'
import CategoryFilter from './CategoryFilter'
import DishList from './DishList'
import VeganFilter from "./VeganFilter"
import { Pagination } from "antd"
import Sorting from "./Sorting"


function MenuPage(){
    const [dishes, setDishes] = useState([]) // состояние всех блюд
    const [loading, setLoading] = useState(true) // для загрузки
    const [error, setError] = useState(null) // для ошибки

    const [isModalOpen, setIsModalOpen] = useState(false) // состояние открытой модалки
    const [selectedDish, setSelectedDish] = useState(null) // состояние выбранного блюда

    const [selectedCategory, setSelectedCategory] = useState('Все блюда') // состояние выбранной категории
    // const [veganFilter, setVeganFilter] = useState('all')

    const handleCardCLick = (dish) => { // обработчик событий для клика по карточке блюда чтобы открыть модалку
        setSelectedDish(dish) // передается блюдо в состояние 
        setIsModalOpen(true) // открытие модального окна
    }

    const handleCloseModal = () => { // обработчик для закрытия модального окна
        setIsModalOpen(false) // закрытие модальног окна
        setSelectedDish(null) // стираем значение с блюдом
    } 

    const handleCategorySelect = (category) => { // обработчик для выбора категории блюд
        setSelectedCategory(category) // передаем выбранное блюдо в состояние
    }

    // const handleVeganFilterChange = (filterType) => {
    //     setVeganFilter(filterType)
    // }

    useEffect(() => {
        const MenuUrl = 'https://food-delivery.kreosoft.ru/api/dish' // API ссылка
    
        const fetchMenu = async() => { // асинхронная функция для получения списков блюд с базы данных
            try{
                setLoading(true) // начало загрузки
                setError(null) // нет ошибок

                const response = await axios.get(MenuUrl) // получаем данные о блюдах 
                console.log(response.data.dishes)
                setDishes(response.data.dishes) // передаем эти данные в состояние              
            }
            catch(err){
                console.log('ERROR', err)
                setError('Не удалось загрузить меню, пожалуйста попробуйте позже.') // записываем ошибку в состояние
            }
            finally{
                setLoading(false) // конец загрузки
            }
        } 
        fetchMenu()

},
[]) // пустой массив зависимостей (запускается один раз при рендере) 

    if(loading){
        return(
            <div className="loading-message">Загрузка меню...</div> // отображение загрузки
        )
    }
    if(error){
        return(
            <div className="error-message">ERROR: {error}</div> // отображение ошибки
        )
    }

    const filteredDishes = selectedCategory === 'Все блюда'
        ? dishes 
        : dishes.filter(dish => dish.category === selectedCategory) // тернарный оператор для определения каких блюд будут отображаться

    const uniqeCategories = ['Все блюда', ...new Set(dishes.map(dish => dish.category))] // подготовка всех списков категорий блюд для отображения

    return(
        <div className="menu-container">
            <div className="filter-sort-container">
                <CategoryFilter // компонент для фильтра по категориям
                    categories={uniqeCategories} // пропс со всеми категориями блюд
                    selectedCategory={selectedCategory} // пропс для выбранной категории
                    onSelectCategory={handleCategorySelect} // пропс для функции обработчика выбора категории
                />
                <VeganFilter/>
                <Sorting/>
                <button className="apply-button">Применить</button>
            </div>
            <DishList // компонент для списка блюд
                dishes={filteredDishes} // пропс для отображения блюд
                onDishClick={handleCardCLick} // пропс для функции обработчика карточки блюда
            />
            <DishModal // компонент для модального окна с блюдом
                isOpen={isModalOpen} // пропс для открытия окна
                dish={selectedDish} // пропс для выбранного блюда
                onClose={handleCloseModal} // пропс для функции обработчика закрытия модального окна
            />
            <div className="pagination">
                <Pagination/>
            </div>
        </div>
)}
    
export default MenuPage


