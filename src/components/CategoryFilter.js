
import { useParams, useNavigate, Navigate } from "react-router-dom"
import { Link } from "react-router-dom" 

function CategoryFilter({categories, selectedCategory, onSelectCategory}){ // передаем пропсы из компонента MenuPage
    const navigate = useNavigate()
    const { categoryId } = useParams()
    const createCategoryFilter = () => {
        navigate('/category=pizza')
    }

    if(categories !== undefined){
        return(
            <div className="category-filter">
                {categories.map(category => ( // преобразуем каждую категорию в массиве категории
                    <div onClick={createCategoryFilter}>
                        <button key={category} className={`category-button ${selectedCategory === category 
                            ? 'active' : ''}`} onClick={() => onSelectCategory(category)}>
                                {category}
                        </button>
                    </div>
                ))}
            </div> 
            // записываем каждую категорию в кнопку и передаем ему функцию обработчик клика 
        )
    }
    else{
        return <div className="loading-message">Загрузка категорий...</div>
    }
}

export default CategoryFilter



// 


// const [loading, setLoading] = useState(true)
    // const [error, setError] = useState(null)

    // useEffect(() => {
    //     const MenuUrl = 'https://food-delivery.kreosoft.ru/api/dish/' 
    //     const CategoryUrlEndPoint = 'category'

    //     const fetchCategoryUrl = async() => {
    //         try{
    //             setLoading(true)
    //             setError(null)

    //             const response = await axios.get(MenuUrl + CategoryUrlEndPoint)
    //             console.log(response.data)
    //         }

    //         catch(err){
    //             console.log('Error', err)
    //             setError('Категории не найдены')
    //         }
    //     }
    //     fetchCategoryUrl()

    // },[categoryId])

    // if(loading){
    //     <div className="loading-message">Загрузка категорий</div>
    // }
    // if(error){
    //     <div className="error-message">Error: {error}</div>
    // }// const [loading, setLoading] = useState(true)
    // const [error, setError] = useState(null)

    // useEffect(() => {
    //     const MenuUrl = 'https://food-delivery.kreosoft.ru/api/dish/' 
    //     const CategoryUrlEndPoint = 'category'

    //     const fetchCategoryUrl = async() => {
    //         try{
    //             setLoading(true)
    //             setError(null)

    //             const response = await axios.get(MenuUrl + CategoryUrlEndPoint)
    //             console.log(response.data)
    //         }

    //         catch(err){
    //             console.log('Error', err)
    //             setError('Категории не найдены')
    //         }
    //     }
    //     fetchCategoryUrl()

    // },[categoryId])

    // if(loading){
    //     <div className="loading-message">Загрузка категорий</div>
    // }
    // if(error){
    //     <div className="error-message">Error: {error}</div>
    // }