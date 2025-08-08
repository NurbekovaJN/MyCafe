import React from 'react';
import { Select } from 'antd';


function Sorting({sortBy, sortOrder, onSortChange}) { // пропсы FilterSortPanel
    const { Option, OptGroup } = Select
    
    const handleSortChange = value => {
        let by = ''
        let order = ''

        switch(value){
            case 'priceAsc':
                by = 'price'
                order = 'asc'
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

    // const currentValue = sortBy && sortOrder ? `${sortBy}${sortOrder.charAt(0).toUpperCase() + sortOrder.slice(1)}` : undefined;

    return (
        <div className='sorting'>
            <label htmlFor="sort-select">Сортировать по: </label>
            <Select
                value='По цене'
                style={{ width: 200, textAlign: 'left' }}
                onChange={handleSortChange}
            >

            <OptGroup label="По цене">
                <Option value="priceAsc">Дороже</Option>
                <Option value="priceDesc">Дешевле</Option>
            </OptGroup>

            <OptGroup label="По рейтингу">
                <Option value="ratingAsc">Выше</Option>
                <Option value="ratingDesc">Ниже</Option>
            </OptGroup>

            <OptGroup label="По названию">
                <Option value="nameAsc">А-Я</Option>
                <Option value="nameDesc">Я-А</Option>
            </OptGroup>

            </Select>

        </div>
    )  
}

export default Sorting

