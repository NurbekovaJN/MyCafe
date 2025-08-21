import React from "react"
import { Select, Space } from 'antd';

// CategoryFilter отображает список кнопок с различными категориями для фильтрации 

function CategoryFilter({activeCategory, onSelectCategory, categories}){ // пропсы с FilterSortPanel
    
    const allCategories = ['Все блюда', 'Pizza', 'Wok', 'Soup', 'Dessert', 'Drink']

    const options = allCategories.map(category => ({value: category, label: category}))

    const handleCategorySelect = (value) => { // ообработчик для выбора категории
        onSelectCategory(value)
    }

    if(categories !== undefined){
        return(
            <div className="category-filter">
                <label htmlFor="category-select">Категории: </label>
                <Select
                    value={activeCategory}
                    style={{width: '200px'}}
                    onChange={handleCategorySelect}
                    options={options}
                    placeholder='Выберите категорию блюд'
                />
            </div> 
        )
    }
    else{
        return <div className="loading-message">Загрузка категорий...</div>
    }
}

export default CategoryFilter




