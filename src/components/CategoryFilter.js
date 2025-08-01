
function CategoryFilter({categories, selectedCategory, onSelectCategory}){ // передаем пропсы из компонента MenuPage
    return(
        <div className="filter-sort-container">
            <div className="category-filter">
                {categories.map(category => ( // преобразуем каждую категорию в массиве категории
                    <button key={category} className={`category-button ${selectedCategory === category 
                        ? 'active' : ''}`} onClick={() => onSelectCategory(category)}>
                            {category}
                    </button>
                ))}
            </div> 
        </div> // записываем каждую категорию в кнопку и передаем ему функцию обработчик клика 
    )
}

export default CategoryFilter