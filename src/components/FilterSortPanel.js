import React from "react";
import CategoryFilter from "./CategoryFilter"
import VeganSwitch from "./VeganSwitch"
import Sorting from './Sorting'


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
    applyFilters
}) {

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
            <button onClick={applyFilters} className="apply-button">Применить</button>
        </div> 
    )
}

export default FilterSortPanel