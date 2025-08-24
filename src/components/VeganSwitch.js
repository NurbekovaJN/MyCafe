import React from 'react';
import { Switch } from 'antd';
import { useState } from 'react';


function VeganSwitch({isVegan, onToggleVegan}){
    const [vegan, setVegan] = useState(isVegan === 'true' ? true : false)
    
    const handleVeganFilterChange = (checked) => {
        setVegan(!vegan)
        onToggleVegan(checked)
    }

    return(
        <div className='vegan-filter-container'>
            <Switch checked={vegan} onChange={handleVeganFilterChange}/>
            <p className='vegan-p'>Показать только вегетерианское</p>
        </div>
    )
}

export default VeganSwitch
