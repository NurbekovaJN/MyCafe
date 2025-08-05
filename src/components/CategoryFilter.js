import { useSearchParams } from "react-router-dom"

function CategoryFilter({categories}){ 
    // // Читаем текущую активную категорию из URL
    const [searchParams, setSearchParams] = useSearchParams()
    const currentCategory = searchParams.get('category') || 'Все блюда'

    if(!Array.isArray(categories) || categories.length === 0){
        return <div className="loading-message">Загрузка категории...</div>
    }

    const handleCategorySelect = (category) => {
        setSearchParams(prevParams => {
            const newParams = new URLSearchParams(prevParams)
            if(category === 'все блюда'){
                newParams.delete('category')
            }else{
                newParams.set('category', category)
            }
            newParams.set('page', '1')
            return newParams    
        },{replace: true})
    }

    if(categories !== undefined){
        return(
            <div className="category-filter">
                {categories.map(category => ( // преобразуем каждую категорию в массиве категории
                    <button key={category} className={`category-button ${currentCategory === category 
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




/////

// import React from 'react';
// import { useSearchParams } from 'react-router-dom'; // <--- Импортируем useSearchParams

// function CategoryFilter({ categories,  }) {
     

//     return (
//         <div className="category-filter">
//             {categories.map(category => (
//                 <button
//                     key={category}
//                     className={selectedCategory === category ? 'active' : ''}
//                     onClick={() => onCategorySelect(category)}>
//                     {category}
//                 </button>
//             ))}
//         </div>
//     );
// }

// export default CategoryFilter;

