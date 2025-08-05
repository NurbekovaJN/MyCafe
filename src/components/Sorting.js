import SortSelect from './SortSelect'
import React from 'react';
import { useSearchParams } from 'react-router-dom'; // <--- Импортируем useSearchParams

function Sorting({ onSortChange }) {
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
    ];

            // <SortSelect/>

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
            <select
                id="sort-select"
                value={currentSortBy} // Управляем выбранным значением из URL
                onChange={(e) => onSortChange(e.target.value)}>
                {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default Sorting;