import VeganSwitch from './VeganSwitch'

function VeganFilter({selectedFilter, onFilterChange}){
    return(
        <div className='vegan-filter-container'>
            <VeganSwitch />
            <p>Показать только вегетерианское</p>
        </div>
    )
}

export default VeganFilter