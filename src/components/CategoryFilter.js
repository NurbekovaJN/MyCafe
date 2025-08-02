
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom" 

function CategoryFilter({categories, selectedCategory, onSelectCategory}){ // передаем пропсы из компонента MenuPage
    const { categoryId } = useParams()
    
    return(
        <div className="category-filter">
            {categories.map(category => ( // преобразуем каждую категорию в массиве категории
                <Link to='/menu/:categoryId'>
                    <button key={category} className={`category-button ${selectedCategory === category 
                        ? 'active' : ''}`}onClick={() => onSelectCategory(category)}>
                            {category}
                    </button>
                // </Link>
            ))}
        </div> 
        // записываем каждую категорию в кнопку и передаем ему функцию обработчик клика 
    )
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