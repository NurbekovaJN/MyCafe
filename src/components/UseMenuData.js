import React from "react";
import axios from "axios";
import { useState, useEffect } from 'react'
import { useSearchParams } from "react-router-dom";

function useMenuData(){ 
    const [dishes, setDishes] = useState([]) // состояние всех блюд
    const [loading, setLoading] = useState(true) 
    const [error, setError] = useState(null) 
    const [searchParams, setSearchParams] = useSearchParams() // хук для получения текущих параметров строки запроса из URL
    const [totalDishes, setTotalDishes] = useState(0) // общее количество блюд

    // Эти строки создают состояния для различных параметров фильтрации, сортировки и пагинации
    const [tempCategory, setTempCategory] = useState(searchParams.get('category') || 'Все блюда')
    const [tempSortBy, setTempSortBy] = useState(searchParams.get('sortBy') || 'name')
    const [tempSortOrder, setTempSortOrder] = useState(searchParams.get('sortOrder') || 'asc')
    const [tempIsVegan, setTempIsVegan] = useState(searchParams.get('isVegan') === 'true')
    const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('page') || '1', 10)) // текущая страница
    const [pageSize, setPageSize] = useState(parseInt(searchParams.get('pageSize') || '10', 10)) // количество блюд на странице

    useEffect(() => { // хук применяется для побочного эффекта
        const API_URL = 'https://food-delivery.kreosoft.ru/api/dish'
        const fetchMenu = async () => {
            try {
                setLoading(true);
                const params = { // объект который будет передан в качестве параметров запроса к АПИ
                    category: tempCategory === 'Все блюда' ? undefined : tempCategory,
                    sortBy: tempSortBy,
                    sortOrder: tempSortOrder,
                    page: currentPage,
                    pageSize: pageSize,
                    isVegan: tempIsVegan === true
                }
                const response = await axios.get(API_URL, {params})
                setDishes(response.data.dishes) // получаем и обновляем список блюд
                setTotalDishes(response.data.totalCount) // получаем общее количество блюд
                console.log(response.data.dishes)

            } catch (err) {
                console.error('ERROR fetching menu:', err);
                setError('Не удалось загрузить меню, пожалуйста, попробуйте позже.');
            } finally {
                setLoading(false);
            }
        }
        fetchMenu()
    }, [currentPage, pageSize, searchParams, tempCategory, tempIsVegan, tempSortBy, tempSortOrder]) // Этот эффект запустится, только когда изменятся параметры в URL (данные о блюдах будут перезагружены из API.)

    return{
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
        setCurrentPage,
        pageSize,
        setPageSize,
    }
    //  Возвращает объект, содержащий все состояния и функции для обновления состояний, которые будут использоваться компонентами, использующими этот хук.  Это позволяет компонентам получать доступ к данным о блюдах, состоянию загрузки, ошибкам и функциям для изменения параметров фильтрации, сортировки и пагинации
    
}

export default useMenuData

// хук useMenuData() получает данные из АПИ и передает их в MenuPage
// использует хук useState() для управления состоянием данных
// использует хук useEffect() для выполнения запроса к АПИ при изменении зависимостей
// синхронизирует параметры фильтрации, сортировки и пагинации с параметрами URL
// предоставляет функции для обновления параметров фильтрации, сортировки и пагинации.