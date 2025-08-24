import React from 'react';
import { Select } from 'antd';
import { useState, useEffect } from 'react';


function Sorting({sortBy, sortOrder, onSortChange, sortingName}) { // пропсы FilterSortPanel
    const { Option, OptGroup } = Select
    const [names, setNames] = useState()

    const handleSortChange = value => {
        let by = ''
        let order = ''

        switch(value){
            case 'priceAsc':
                by = 'price'
                order = 'Asc' // сменить на заглавную букву
                setNames('По возрастанию цены')
                break
            case 'priceDesc':
                by = 'price'
                order = 'Desc'
                break
            case 'ratingAsc':
                by = 'rating'
                order = 'Asc'
                break
            case 'ratingDesc':
                by = 'rating'
                order = 'Desc'
                break
            case 'nameAsc':
                by = 'name'
                order = 'Asc'
                break
            case 'nameDesc':
                by = 'name'
                order = 'Desc'
                break
            default:
                break
        }

        onSortChange(by, order)
    }

    return (
        <div className='sorting'>
            <label htmlFor="sort-select">Сортировать по: </label>
            <Select
                placeholder={sortingName}
                value={names}
                style={{ width: 200, textAlign: 'left' }}
                onChange={handleSortChange}
            >
            <OptGroup label="По цене">
                <Option value="priceAsc">Дешевле</Option>
                <Option value="priceDesc">Дороже</Option>
            </OptGroup>

            <OptGroup label="По рейтингу">
                <Option value="ratingAsc">Ниже</Option>
                <Option value="ratingDesc">Выше</Option>
            </OptGroup>

            <OptGroup label="По названию">
                <Option value="nameAsc">Я-А</Option>
                <Option value="nameDesc">А-Я</Option>
            </OptGroup>
            </Select>
        </div>
    )  
}

export default Sorting

