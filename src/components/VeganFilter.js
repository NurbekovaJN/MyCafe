import VeganSwitch from './VeganSwitch'
import { useSearchParams } from 'react-router-dom'


function VeganFilter(){
    // Читаем состояние веганского фильтра из URL
    const [searchParams, setSearchParams] = useSearchParams()
    // const currentIsVegan = searchParams.get('isVegan') === 'true'

    // const handleVeganFilterChange = (isVegan) => {
    //     setSearchParams(prevParams => {
    //         const newParams = new URLSearchParams(prevParams)
    //         if(isVegan){
    //             newParams.set('isVegan', 'true')
    //         }else{
    //             newParams.delete('isVegan')
    //         }
    //         newParams.set('page', '1')
    //         return newParams
    //     },{replace: true})
    // }

    return(
        <div className='vegan-filter-container'>
            <VeganSwitch checked={currentIsVegan} onChange={(e) => handleVeganFilterChange(e.target.checked)}/>
            <p>Показать только вегетерианское</p>
        </div>
    )
}

export default VeganFilter
