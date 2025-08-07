import react from 'react';
import { Switch } from 'antd';


function VeganFilter({isVegan, onToggleVegan}){

    const handleVeganFilterChange = (checked) => {
        onToggleVegan(checked)
    }

    return(
        <div className='vegan-filter-container'>
            <Switch checked={isVegan} onChange={(e) => handleVeganFilterChange(e.target.checked)}/>
            <p>Показать только вегетерианское</p>
        </div>
    )
}

export default VeganFilter
