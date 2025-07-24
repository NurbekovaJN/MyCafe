import axios from "axios"
import App from "./App"
import { useState, useEffect } from "react"



function GetAllFoods(){
    const [dish, setDish] = useState([])

    useEffect(() => {

    })

    

    const MenuUrl = 'https://food-delivery.kreosoft.ru/api/dish'

    const fetchMenu = async() => {
        try{
            const response = await axios.get(MenuUrl)
            console.log(response.data)
        }
        catch{

        }
    } 

    fetchMenu()

    return(
        <div></div>
    )
}

export default GetAllFoods