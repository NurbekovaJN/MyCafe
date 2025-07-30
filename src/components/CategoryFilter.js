
function CategoryFilter({categories, selectedCategory, onSelectCategory}){
    return(
        <div className="filter-sort-container">
            <div className="category-filter">
                {categories.map(category => (
                    <button key={category} className={`category-button ${selectedCategory === category 
                        ? 'active' : ''}`} onClick={() => onSelectCategory(category)}>
                            {category}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default CategoryFilter