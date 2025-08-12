import React from "react"

// CategoryFilter отображает список кнопок с различными категориями для фильтрации 

function CategoryFilter({tempCategory, onSelectCategory, categories}){ // пропсы с FilterSortPanel
    
    const handleCategorySelect = (category) => { // ообработчик для выбора категории
        onSelectCategory(category)
    }
    
    if(categories !== undefined){
        return(
            <div className="category-filter">
                {categories.map(category => ( // преобразуем каждую категорию в массиве категории
                    <button key={category} className={`category-button ${tempCategory === category 
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

// Компонент CategoryFilter получает список категорий (categories), текущую выбранную категорию (tempCategory) и функцию для обработки выбора категории (onSelectCategory) из родительского компонента (FilterSortPanel).
// Он отображает список кнопок для каждой категории.
// При нажатии на кнопку вызывается функция handleCategorySelect, которая, в свою очередь, вызывает функцию onSelectCategory (из родительского компонента) и передает ей выбранную категорию.
// Родительский компонент (FilterSortPanel) получает уведомление о выборе новой категории и обновляет состояние приложения, например, запрашивает новые данные из API.
// Компонент CategoryFilter перерисовывается с новой выбранной категорией, подсвечивая соответствующую кнопку.


