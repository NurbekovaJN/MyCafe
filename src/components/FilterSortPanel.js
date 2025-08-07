import CategoryFilter from "./CategoryFilter";
import VeganFilter from "./VeganFilter";
import Sorting from "./Sorting";

function FilterSort({
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
            <VeganFilter
                isVegan={tempIsVegan}
                onToggleVegan={setTempIsVegan}
            />
            <button onClick={handleApplyFilters} className="apply-button">Применить</button>
        </div> 
    )
}

export default FilterSort