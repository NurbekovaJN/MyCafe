import React from "react";
import axios from "axios";
import { useState, useEffect } from 'react'
import { useSearchParams } from "react-router-dom";

function useMenuData(){
    
    const [dishes, setDishes] = useState([]) // состояние всех блюд
    const [loading, setLoading] = useState(true) 
    const [error, setError] = useState(null) 
    const [searchParams, setSearchParams] = useSearchParams()
    const [totalDishes, setTotalDishes] = useState(0) // общее количество элементов

    const [tempCategory, setTempCategory] = useState(searchParams.get('category') || 'Все блюда')
    const [tempSortBy, setTempSortBy] = useState(searchParams.get('sortBy') || 'name')
    const [tempSortOrder, setTempSortOrder] = useState(searchParams.get('sortOrder') || 'asc')
    const [tempIsVegan, setTempIsVegan] = useState(searchParams.get('isVegan') === 'true')
    const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('page') || '1', 10)) // текущая страница
    const [pageSize, setPageSize] = useState(parseInt(searchParams.get('pageSize') || '10', 10)) // количество блюд на странице

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
                    pageSize: pageSize,
                    isVegan: tempIsVegan === true
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
        fetchMenu()
    }, [currentPage, pageSize, searchParams, tempCategory, tempIsVegan, tempSortBy, tempSortOrder]) // Этот эффект запустится, только когда изменятся параметры в URL

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
    
}

export default useMenuData