import React from "react";
import CategoryFilter from "./CategoryFilter";
import VeganSwitch from "./VeganSwitch";
// import Sorting from './Sorting'

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
    handleApplyFilters
}) {
    return (
        <div className="filter-sort-container">
            <CategoryFilter 
                categories={categories}
                activeCategory={tempCategory}
                onSelectCategory={setTempCategory}
            />
            {/* <Sorting
                sortBy={tempSortBy}
                sortOrder={tempSortOrder}
                onSortChange={(by, order) => {
                    setTempSortBy(by)
                    setTempSortOrder(order)
                }}
            /> */}
            <VeganSwitch
                isVegan={tempIsVegan}
                onToggleVegan={setTempIsVegan}
            />
            <button onClick={handleApplyFilters} className="apply-button">Применить</button>
        </div> 
    )
}

export default FilterSortPanel