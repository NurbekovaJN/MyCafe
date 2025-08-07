import React from "react";
import FilterSortPanel from "./FilterSortPanel";

function FilterOptions({
    categories,
    tempCategory,
    setTempCategory,
    tempSortBy,
    setTempSortBy,
    tempSortOrder,
    setTempSortOrder,
    tempIsVegan,
    setTempIsVegan,
    handleApplyFilters,
}){
    return(
        <FilterSortPanel
            categories={categories}
            tempCategory={tempCategory}
            setTempCategory={setTempCategory}
            tempSortBy={tempSortBy}
            setTempSortBy={setTempSortBy}
            tempSortOrder={tempSortOrder}
            setTempSortOrder={setTempSortOrder}
            tempIsVegan={tempIsVegan}
            setTempIsVegan={setTempIsVegan}
            handleApplyFilters={handleApplyFilters}
        />
    )
}

export default FilterOptions