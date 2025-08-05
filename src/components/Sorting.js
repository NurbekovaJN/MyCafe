import SortSelect from './SortSelect'
import React from 'react';
import { useSearchParams } from 'react-router-dom'

function Sorting() {
    // Читаем текущий тип сортировки из URL
    const [searchParams, setSearchParams] = useSearchParams();
    const currentSortBy = searchParams.get('sortBy') || 'nameAsc' // Устанавливаем значение по умолчанию

    const sortOptions = [
        { value: 'nameAsc', label: 'Название (А-Я)' },
        { value: 'nameDesc', label: 'Название (Я-А)' },
        { value: 'priceAsc', label: 'Цена (по возрастанию)' },
        { value: 'priceDesc', label: 'Цена (по убыванию)' },
        { value: 'ratingAsc', label: 'Рейтинг (по возрастанию)' },
        { value: 'ratingDesc', label: 'Рейтинг (по убыванию)' },
    ]

     const handleSortChange =(sortBy) => {
        setSearchParams(prevParams => {
            const newParams = new URLSearchParams(prevParams)
            newParams.set('sortBy', sortBy)
            newParams.set('page', '1')
            return newParams
        },{replace: true})
    }

    return (
        <div className="sorting">
            <label htmlFor="sort-select">Сортировать по: </label>
            <SortSelect 
                id="sort-select"
                value={currentSortBy} // Управляем выбранным значением из URL
                options={sortOptions}
                onChange={handleSortChange}
            />
        </div>
    )
}

export default Sorting;

