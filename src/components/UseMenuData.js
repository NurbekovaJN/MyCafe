import React from "react";
import axios from "axios";
import { useState, useEffect } from 'react'
import { useSearchParams } from "react-router-dom";

function useMenuData(){ 
    const [dishes, setDishes] = useState([]) // состояние всех блюд
    const [loading, setLoading] = useState(true) 
    const [error, setError] = useState(null) 
    const [searchParams] = useSearchParams() // хук для получения текущих параметров строки запроса из URL
    const [totalDishes, setTotalDishes] = useState(0) // общее количество блюд

    // Получаем параметры из URL
    const category = searchParams.get('category') || 'Все блюда';
    const sortBy = searchParams.get('sortBy') || 'name';
    const sortOrder = searchParams.get('sortOrder') || 'asc';
    const isVegan = searchParams.get('isVegan') === 'true';
    const currentPage = parseInt(searchParams.get('page') || '1', 10);
    const pageSize = parseInt(searchParams.get('pageSize') || '8', 10);


    useEffect(() => { // хук применяется для побочного эффекта
        const API_URL = 'https://food-delivery.kreosoft.ru/api/dish'
        const fetchMenu = async () => {
            try {
                setLoading(true);
                const params = { // объект который будет передан в качестве параметров запроса к АПИ
                    category: category === 'Все блюда' ? undefined : category,
                    sortBy: sortBy,
                    sortOrder: sortOrder,
                    page: currentPage,
                    pageSize: pageSize,
                    isVegan: isVegan,
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
    }, [category, sortBy, sortOrder, isVegan, currentPage, pageSize]) // Этот эффект запустится, только когда изменятся параметры в URL (данные о блюдах будут перезагружены из API.)

    return {
        dishes,
        loading,
        error,
        totalDishes,
        currentPage,
        pageSize,
        // Больше не возвращаем состояния для фильтров, т.к. они берутся из URL
    }
}

export default useMenuData
