import React from 'react';
import { Switch } from 'antd';


function VeganSwitch({isVegan, onToggleVegan}){

    const handleVeganFilterChange = (checked) => {
        onToggleVegan(checked)
    }

    return(
        <div className='vegan-filter-container'>
            <Switch checked={isVegan} onChange={handleVeganFilterChange}/>
            <p>Показать только вегетерианское</p>
        </div>
    )
}

export default VeganSwitch
