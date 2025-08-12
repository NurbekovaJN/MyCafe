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
    const pageSize = parseInt(searchParams.get('pageSize') || '8', 10)


    useEffect(() => { 
        const API_URL = 'https://food-delivery.kreosoft.ru/api/dish'
        const fetchMenu = async () => {
            try {
                setLoading(true)
                const params = { // объект который будет передан в качестве параметров запроса к АПИ
                    categories: category === 'Все блюда' ? undefined : category,
                    sorting: sortBy,
                    // sortOrder: sortOrder,
                    page: currentPage,
                    pageSize: pageSize,
                    vegeterian: isVegan,
                }
                const cleanParams = Object.fromEntries(
                    Object.entries(params).filter(([_, v]) => v != null && v !== "")
                );
                const sParams = new URLSearchParams(cleanParams).toString()
                console.log(sParams)

                const queryString = Object.entries(params)
                    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
                    .join("&");
                const resp = API_URL + '?' + sParams
                console.log(resp)

                const response = await axios.get(resp)
                setDishes(response.data.dishes) // получаем и обновляем список блюд
                setTotalDishes(response.data.totalCount) // получаем общее количество блюд
                console.log(response.data.dishes)

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
        isVegan
    }

}

export default useMenuData


// вои переменные в хуке useMenuData, которые ты из searchParams получаешь, не реактивные. Они будут пересчитываться только после ререндера, но сам факт их изменения не вызывает рендер

// чисто теоретически из-за твоих temp* стейтов ререндер вызываться должен, из-за чего даже с таким кодом все работало бы, но ты их вызываешь в useEffect, у которого в депсах указан searchParams. searchParams из хука useSearchParams, вероятно, никогда не меняет ссылку, поэтому твой эффект, изменяющий стейты, никогда не срабатывает, поэтому рендеринг никогда не срабатывает, поэтому пересчет параметров и useEffect в useMenuData не срабатывает

// тебе нужно разобраться с тем, что в реакте вызывает ререндеринг, а что – нет. Этот код можно сильно проще написать



// https://food-delivery.kreosoft.ru/api/dish?categories=Pizza&vegetarian=true&sorting=PriceAsc&page=1

// https://food-delivery.kreosoft.ru/api/dish?category=Pizza&sortBy=name&sortOrder=asc&page=1&pageSize=8&isVegan=false

// https://food-delivery.kreosoft.ru/api/dish?categories=Wok&sorting=name&sortOrder=asc&page=1&pageSize=8&isVegan=true