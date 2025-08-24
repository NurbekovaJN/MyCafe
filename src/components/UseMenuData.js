import React from "react"
import axios from "axios"
import { useState, useEffect } from 'react'
import { useSearchParams } from "react-router-dom"

function useMenuData(){ 
    const [dishes, setDishes] = useState([]) // состояние всех блюд
    const [loading, setLoading] = useState(true) 
    const [error, setError] = useState(null) 
    const [totalDishes, setTotalDishes] = useState(0) // общее количество блюд
    const [searchParams] = useSearchParams() // хук для получения текущих параметров строки запроса из URL

    // Получаем параметры из URL
    const category = searchParams.get('category') 
    const sortBy = searchParams.get('sortBy') 
    const sortOrder = searchParams.get('sortOrder') 
    const isVegan = searchParams.get('isVegan') 
    const currentPage = parseInt(searchParams.get('page') || '1', 10)
    const pageSize = parseInt(searchParams.get('pageSize') || '5', 10)

    useEffect(() => { 
        const API_URL = 'https://food-delivery.kreosoft.ru/api/dish'
        const fetchMenu = async () => {
            try {
                setLoading(true)
                const params = { // объект который будет передан в качестве параметров запроса к АПИ
                    categories: category === 'Все блюда' ? undefined : category,
                    sorting: sortBy,
                    page: currentPage,
                    pageSize: pageSize,
                    vegetarian: isVegan,
                }
                const cleanParams = Object.fromEntries(
                    Object.entries(params).filter(([_, v]) => v != null && v !== '' && v !== 'null')
                );
                const sParams = new URLSearchParams(cleanParams).toString()

                // const queryString = Object.entries(params)
                //     .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
                //     .join("&");
                const resp = API_URL + '?' + sParams

                const response = await axios.get(resp)
                setDishes(response.data.dishes) // получаем и обновляем список блюд
                setTotalDishes(response.data.pagination.count) // получаем общее количество блюд
                console.log(response.data.dishes)
                console.log(response.data.pagination.count)

            } catch (err) {
                console.error('ERROR fetching menu:', err)
                setError('Не удалось загрузить меню, пожалуйста, попробуйте позже.')
            } finally {
                setLoading(false)
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
        category,
        isVegan,
    }

}

export default useMenuData

