import React from "react";
import DishList from "./DishList";

function Menu({dishes, onDishClick, currentPage, totalDishes, onPageChange, pageSize}){
    return(
        <DishList 
            dishes={dishes} 
            onDishClick={onDishClick} 
            currentPage={currentPage} 
            pageSize={pageSize} 
            totalDishes={totalDishes} 
            onPageChange={onPageChange}
        />
    )
}

export default Menu