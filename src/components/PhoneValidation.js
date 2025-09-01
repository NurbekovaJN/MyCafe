import React from "react";
import { useEffect, useCallback } from "react";
import FormFields from "./FormFields";
import Inputmask from "inputmask";
import Registration from "./Registration";

function PhoneValidation(
    phoneNumber,
    setPhoneNumber,
    phoneError,
    setPhoneError,
    inputRef
){

    const handlePhoneChange = (event) => {
        const newPhone = event.target.value
        setPhoneNumber(newPhone)
        validatePhone(newPhone)
    }

    const validatePhone = (phoneNumber) => {
            const regPhone = /^\+7\ \(\d{3}\)\ \d{3}-\d{2}-\d{2}$/
            if(!phoneNumber){
                setPhoneError('')
                return true
            }else if(!regPhone.test(phoneNumber)){
                setPhoneError('Введите номер корректно')
                return false
            }
            setPhoneError('')
            return true
        }
    
    // функция запоминает себя и не пересоздается каждый раз когда компонент обновляется если только не изменились зависимости (useCallback() нужна для оптимизации, не тратя время на пересоздание функции)
    const memoizedValidatePhone = useCallback((num) => validatePhone(num, setPhoneError), [setPhoneError]) 
    // когда мы вызываем эту функцию с аргументом num, она просто вызывает функцию валидейтФоун с этим num и функцией вызова ошибки

    useEffect(() => {
        if(inputRef.current){
            const inpMsk = new Inputmask({ // создаем новый объект с шаблоном
                'mask': "+7 (999) 999-99-99",
                'placeholder': '_',
                "showMaskOnFocus": true, // Когда пользователь кликает в поле, сразу показывается полный шаблон маски (+7 (___) ___-__-__).
                "jitMasking": true // Это настройка для лучшей производительности маски (позволяет маске "на лету" применять форматирование)
            })
            inpMsk.mask(inputRef.current) // применяем созданную маску к реальному инпуту
            // Теперь поле будет автоматически форматировать ввод по шаблону +7 (XXX) XXX-XX-XX.

            if(inputRef.current.value && inputRef.current.value !== phoneNumber){ // если в инпуте уже есть значение и это значение отличается от phoneNumber 
            setPhoneNumber(inputRef.current.value) // переписываем состояние номера
            memoizedValidatePhone(inputRef.current.value) // и сразу же запускаем проверку этого номера
            }
        }
    }, [memoizedValidatePhone, phoneNumber])

    const handlePhoneBlur = () => { // функция будет вызываться когда пользователь кликнет за пределы ввода телефона
        memoizedValidatePhone(phoneNumber) // при выходе из поля запускаем оптимизоравнную функицию проверки, передавая ей текующее значение из реакт ФоунНамбер. Это гарантирует то ошибка будет показана если польщователь введет что то некорректно
    }

    return(
        <FormFields
            handlePhoneChange={handlePhoneChange}
            handlePhoneBlur={handlePhoneBlur}
        />,

        <Registration
            validatePhone={validatePhone}
        />
    )
}

export default PhoneValidation