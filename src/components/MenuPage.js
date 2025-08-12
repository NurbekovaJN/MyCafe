import React from "react"
import { useMemo, useState, useEffect } from "react"
import { useSearchParams, useNavigate } from "react-router-dom" 
import useMenuData from "./UseMenuData"
import DishList from "./DishList"
import FilterSortPanel from "./FilterSortPanel"

function MenuPage(){
    const navigate = useNavigate() // предоставляет функцию navigate для программного перенаправления пользователя по url
    const [searchParams] = useSearchParams() // Предоставляет доступ к параметрам запроса в URL.  В данном случае используется только для чтения (searchParams), но не для изменения.

    // Локальное состояние для хранения временных значений фильтров и сортировки
    const [tempCategory, setTempCategory] = useState(searchParams.get('category') || 'Все блюда')
    const [tempSortBy, setTempSortBy] = useState(searchParams.get('sortBy') || 'name')
    const [tempSortOrder, setTempSortOrder] = useState(searchParams.get('sortOrder') || 'asc')
    const [tempIsVegan, setTempIsVegan] = useState(searchParams.get('isVegan') === 'true')
    
    const {
        dishes,
        loading,
        error,
        totalDishes,
        currentPage,
        pageSize,
    } = useMenuData() // Используем кастомный хук для получения данных о блюдах, состоянии загрузки/ошибки, общего количества блюд, текующей страницы и количестве блюд на странице
        
    const applyFilters = () => {
        const newParams = new URLSearchParams()

        if (tempCategory !== 'Все блюда') {
            newParams.set('category', tempCategory)
        }
        newParams.set('sortBy', tempSortBy)
        newParams.set('sortOrder', tempSortOrder)
        newParams.set('isVegan', tempIsVegan.toString())
        newParams.set('page', '1')

        navigate(`?${newParams.toString()}`, { replace: true }) // Перенаправляем пользователя с новыми параметрами
    }

    const handlePageChange = (page, pageSize) => { 
        const newParams = new URLSearchParams(searchParams) // копируем текущие параметры
        newParams.set('page', page.toString()) // обновляем страницу
        newParams.set('pageSize', pageSize.toString()) // обновляем размер страницы
        navigate(`?${newParams.toString()}`, { replace: true }) // устанавливаем параметры
    }

    useEffect(() => {
        setTempCategory(searchParams.get('category'))
        setTempSortBy(searchParams.get('sortBy'))
        setTempSortOrder(searchParams.get('sortOrder'))
        setTempIsVegan(searchParams.get('isVegan'))
    }, [searchParams]) // Зависимость: useEffect запускается при изменении searchParams

    const uniqueCategories = useMemo(() => {
        const categories = new Set(dishes.map(dish => dish.category)) // получаем список уникальных категорий блюд и сохраняем в массиве 
        return ['Все блюда', ...Array.from(categories)] 
    }, [dishes]) // Пересчитываем только при изменении списка блюд

    if (loading) {
        return <div className="loading-message">Загрузка меню...</div>
    }
    if (error) {
        return <div className="error-message">ERROR: {error}</div>
    }

    return (
        // Передаем все пропсы в дочерние компоненты
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
                navigate={navigate}
                currentPage={currentPage}
                pageSize={pageSize}
                applyFilters={applyFilters}
            />
            <DishList
                dishes={dishes}
                currentPage={currentPage}
                pageSize={pageSize}
                totalDishes={totalDishes}
                onPageChange={handlePageChange}
            />
        </div>
    )
}

export default MenuPage


// Также по юзМенюДата и почему не обновляется содержимое
// Есть state temp* и есть searchParams. Ты меняешь URL, но локальные стейты не синхронизируешь обратно из URL, поэтому fetchMenu продолжает дергать API со старыми temp*

// Синхронизируй локальные стейты с URL
// Добавь ЮзЭффект, который на каждое изменение searchParams перезаписывает temp* и пагинацию:

// В MenuPage при нажатии применить лучше сбрасывать страницу на 1, и не записывать лишние данные по пагинации текущей

