import React from "react"

function CategoryFilter({activeCategory, onSelectCategory, categories}){ 
    
    const handleCategorySelect = (category) => {
        onSelectCategory(category)
    }
    
    if(categories !== undefined){
        return(
            <div className="category-filter">
                {categories.map(category => ( // преобразуем каждую категорию в массиве категории
                    <button key={category} className={`category-button ${activeCategory === category 
                        ? 'active' : ''}`} onClick={() => handleCategorySelect(category)}>
                            {category}
                    </button>
                ))}
            </div> 
            // записываем каждую категорию в кнопку и передаем ему функцию обработчик клика 
        )
    }
    else{
        return <div className="loading-message">Загрузка категорий...</div>
    }
}

export default CategoryFilter


