import React from "react";
import CategoryFilter from "./CategoryFilter";
import VeganSwitch from "./VeganSwitch";
import Sorting from './Sorting'
import { useNavigate } from "react-router-dom";

function FilterSortPanel({
    categories,
    tempCategory, 
    setTempCategory, 
    tempSortBy, 
    setTempSortBy, 
    tempSortOrder, 
    setTempSortOrder,
    tempIsVegan,
    setTempIsVegan,
    // navigate,
    currentPage,
    pageSize
}) {

    const navigate = useNavigate()

    const handleApplyFilters = () => {   // обработчик кнопки Применить
        // const newParams = new URLSearchParams()
        // if(tempCategory !== 'Все блюда') newParams.set('category', tempCategory)
        //     newParams.set('sortBy', tempSortBy)
        //     newParams.set('sortOrder', tempSortOrder)
        //     newParams.set('isVegan', tempIsVegan.toString())
        //     newParams.set('page', currentPage.toString())
        //     newParams.set('pageSize', pageSize.toString())
        //     // Перенаправляем пользователя с новыми параметрами запроса
        //     navigate(`?${newParams.toString()}`, { replace: true }) 
        // }
        const newParams = new URLSearchParams()

        if (tempCategory !== 'Все блюда' && tempCategory != null) {
            newParams.set('category', String(tempCategory));
        }

        if (tempSortBy != null) {
            newParams.set('sortBy', String(tempSortBy));
        }

        if (tempSortOrder != null) {
            newParams.set('sortOrder', String(tempSortOrder));
        }

        if (tempIsVegan != null) {
            newParams.set('isVegan', String(tempIsVegan));
        }

        if (currentPage != null) {
            newParams.set('page', String(currentPage));
        }

        if (pageSize != null) {
            newParams.set('pageSize', String(pageSize));
        }

        // Перенаправляем пользователя с новыми параметрами запроса
        navigate(`?${newParams.toString()}`, { replace: true })
    }

    return (
        <div className="filter-sort-container">
            <CategoryFilter 
                categories={categories}
                activeCategory={tempCategory}
                onSelectCategory={setTempCategory}
            />
            <Sorting
                sortBy={tempSortBy}
                sortOrder={tempSortOrder}
                onSortChange={(by, order) => {
                    setTempSortBy(by)
                    setTempSortOrder(order)
                }}
            />
            <VeganSwitch
                isVegan={tempIsVegan}
                onToggleVegan={setTempIsVegan}
            />
            <button onClick={handleApplyFilters} className="apply-button">Применить</button>
        </div> 
    )
}

export default FilterSortPanel