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
                order = 'asc' // сменить на заглавную букву
                setNames('По возрастанию цены')
                break
            case 'priceDesc':
                by = 'price'
                order = 'desc'
                break
            case 'ratingAsc':
                by = 'rating'
                order = 'asc'
                break
            case 'ratingDesc':
                by = 'rating'
                order = 'desc'
                break
            case 'nameAsc':
                by = 'name'
                order = 'asc'
                break
            case 'nameDesc':
                by = 'name'
                order = 'desc'
                break
            default:
                break
        }

        onSortChange(by, order)
    }

    console.log(sortingName)
    return (
        <div className='sorting'>
            <label htmlFor="sort-select">Сортировать по: </label>
            <Select
                placeholder={sortingName}
                value={names}
                style={{ width: 150, textAlign: 'left' }}
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

