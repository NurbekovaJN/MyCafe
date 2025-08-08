import React from "react";
import DishModal from "./DishModal";
import { useState, useCallback } from "react";

function DishModalFunction({dish, onClose}){
    const [isModalOpen, setIsModalOpen] = useState(false) // состояние модалки

    const openModal = useCallback((dish) => {
        setIsModalOpen(true)
    }, [])

    const closeModal = useCallback(() => {
        setIsModalOpen(false);
        onClose() // вызываем onClose, переданный через пропсы
    }, [onClose])

    return(
        <DishModal isOpen={openModal} dish={dish} onClose={closeModal}/>
        // {React.cloneElement(children, { onCardClick: openModal })}
    )
}

export default DishModalFunction