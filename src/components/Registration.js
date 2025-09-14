import React, { useState, useRef, useEffect, useCallback } from "react";
import Inputmask from "inputmask";
import axios from "axios";

function Registration(){
    const [formData, setFormData] = useState({
        fullName: '',
        gender: '',
        phoneNumber: '',
        birthDate: '',
        // address: {
        //     
        // },
        email: '',
        password: '',
        confirmPassword: ''
    })
    const inputRef = useRef(null) // ссылка на ДОМ элемент инпут

    const [formErrors, setFormErrors] = useState({
        fullNameError: '',
        genderError: '',
        phoneNumberError: '',
        birthDateError: '',
        // addressError: '',
        emailError: '',
        passwordError: '',
        confirmPasswordError: ''
    })

    const [submitting, setSubmitting] = useState(false);     // Чтобы показать "Загрузка..." на кнопке
    const [submittingError, setSubmittingError] = useState(null); // Для общей ошибки (например, сервер не отвечает)

    const handleChange = (event) => {
        const {id, value} = event.target
        setFormData(prev => ({...prev, [id]: value}))
        setFormErrors(prev => ({...prev, [id + 'Error']: ''}))

    }

    const handleGenderChange = (event) => {
        const {value} = event.target
        setFormData(prev => ({...prev, gender: value}))
        setFormErrors(prev => ({...prev, gender: ''}))
    }
   
    const validateForm = useCallback(() => {
        let errors = {}
        const { 
            fullName, 
            gender, 
            phoneNumber, 
            birthDate, 
            // address, 
            email, 
            password, 
            confirmPassword 
        } = formData

        const regUserName = /^[A-Za-zА-яа-я\s]+$/
        if(!fullName.trim()){
            errors.fullNameError = ''
        }else if(!regUserName.test(fullName)){
            errors.fullNameError = 'ФИО должно содержать только буквы латинского алфавита и кириллицы'
        }else{
            errors.fullNameError = ''
        }

        if(gender === 'select-gender'){
            errors.genderError = 'Выберите пол'
        }else{
            errors.genderError = ''
        }

        if(!birthDate){
            errors.birthDateError = 'Введите дату рождения'
        }else{
            errors.birthDateError = ''
        }

        const regEmail = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i
        if(!email){
            errors.emailError = ''
        }else if(!regEmail.test(email)){
            errors.emailError = 'Введите почту корректно'
        }else{
            errors.emailError = ''
        }

        const regPhone = /^\+7\ \(\d{3}\)\ \d{3}-\d{2}-\d{2}$/
        if(!phoneNumber){
            errors.phoneNumberError = ''
        }else if(!regPhone.test(phoneNumber)){
            errors.phoneNumberError = 'Введите номер корректно'
        }else{
            errors.phoneNumberError = ''
        }


        const regPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/
        if(!password){
            errors.passwordError = ''
        }else if(!regPassword.test(password)){
            errors.passwordError = 'Пароль должен иметь хотя бы одну цифру, строчные символы, заглавную букву и состоять минимум из 8 символов'
        }else{
            errors.passwordError = ''
        }

        if(!confirmPassword){
            errors.confirmPasswordError = ''
        }else if(password !== confirmPassword){
            errors.confirmPasswordError = 'Пароли не совпадают'
        }else{
            errors.confirmPasswordError = ''
        }
        
    })

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
            
            if(inputRef.current.value && inputRef.current.value !== formData.phoneNumber){ // если в инпуте уже есть значение и это значение отличается от phoneNumber 
                setPhoneNumber(inputRef.current.value) // переписываем состояние номера
                memoizedValidatePhone(inputRef.current.value) // и сразу же запускаем проверку этого номера
            }
        }
    }, [memoizedValidatePhone, formData.phoneNumber])
    
    const handlePhoneBlur = () => { // функция будет вызываться когда пользователь кликнет за пределы ввода телефона
        memoizedValidatePhone(formData.phoneNumber) // при выходе из поля запускаем оптимизоравнную функицию проверки, передавая ей текующее значение из реакт ФоунНамбер. Это гарантирует то ошибка будет показана если польщователь введет что то некорректно
    }

   }

    const handleSubmit = async(event) => {
        event.preventDefault() 

        console.log('Форма отправлена')
        const isUserNameValid = validateUserName(fullName)
        const isGenderValid = validateGender(gender)
        const isPhoneValid = validatePhone(phoneNumber)
        const isBirthDateValid = validateBirthDate(birthDate)
        const isEmailValid = validateEmail(email)
        const isPasswordValid = validatePassword(password)
        const isConfirmPasswordValid = validateConfirmPassword(confirmPassword)

        if(
            isUserNameValid && 
            isGenderValid &&
            isPhoneValid &&
            isBirthDateValid &&
            isEmailValid &&
            isPasswordValid &&
            isConfirmPasswordValid
        ){
            try{
                const registrationData = {
                    fullName, 
                    gender, 
                    phoneNumber, 
                    birthDate, 
                    email,
                    password,
                    addressId: "ec9c177a-efd4-4894-9064-c5ceec28ea1b",
                }
                console.log('Данные для отправки:', registrationData)

                const API_URL = 'https://food-delivery.kreosoft.ru/api/account/register'
                console.log('Отправляем запрос...')

                const response = await axios.post(API_URL, registrationData)
                console.log(response.data)

                if(response.status === 201){
                    alert('Регистрация прошла успешно')
                    setUserName('')
                    setGender('select-gender')
                    setPhoneNumber('')
                    setBirthDate('')
                    setEmail('')
                    setPassword('')
                    setConfirmPassword('')
                }
            }catch(error){
                console.log('Ошибка при регистрации', error)
                alert('Произошла ошибка при регистрации, попробуйте еще раз')
            }
        }

        return(
            <form className="signUp-form" onSubmit={handleSubmit}>
                <h2 className="signUp-title">Регистрация</h2>
                <div className="input-container">
                    
                    <label htmlFor='user-name'>ФИО</label>
                    <input className='reg-input' type="text" id="user-name" placeholder="Введите ФИО" value={formData.fullName} onChange={handleUserNameChange}/>
                    {userNameError && <span className="input-error">{userNameError}</span>}
    
                    <label htmlFor='gender'>Пол</label>
                    <select className="gender-select" id="gender" value={gender} onChange={handleGenderChange}>
                        <option value="select-gender" key="select">---</option>
                        <option value="Male" key="male">Мужчина</option>
                        <option value="Female" key="female">Женщина</option>
                    </select>
                    {genderError && <span className="input-error">{genderError}</span>}
        
                    <label htmlFor='user-phoneNumber'>Телефон</label>
                    <input className='reg-input' type="tel" ref={inputRef} id="user-phoneNumber" placeholder="+7 (XXX) XXX-XX-XX"
                    value={phoneNumber} onChange={handlePhoneChange} onBlur={handlePhoneBlur}/>
                    {phoneError && <span className="input-error">{phoneError}</span>}
    
        
                    <label htmlFor='user-birthDate'>Дата рождения</label>
                    <input type="date" id="user-birthDate" value={birthDate} onChange={handleBirthDateChange}/>
                    {birthDateError && <span className="input-error">{birthDateError}</span>}
    
                    <div className="user-address-container">
                        <p className="user-address-title">Адрес проживания</p>
                        <label htmlFor=''>Субъект РФ</label>
                        <input className='reg-input' type="text"/>
        
                        <label htmlFor=''>Город</label>
                        <input className='reg-input' type="text"/>
        
                        <label htmlFor=''>Улица</label>
                        <input className='reg-input' type="text"/>
        
                        <label htmlFor=''>Дом</label>
                        <input className='reg-input' type="text"/>
                    </div>
    
                    <label htmlFor='user-email'>Почта</label>
                    <input className='reg-input' type="email" id="user-email" placeholder="Введите почту" 
                    value={email} onChange={handleEmailChange}/>
                    {emailError && <span className="input-error">{emailError}</span>}
    
                    <label htmlFor='p1 p2'>Пароль</label>
                    <input className='reg-input' type="password" id="p1" placeholder="Введите пароль" 
                    value={password} onChange={handlePasswordChange}/>
                    {passwordError && <span className="input-error">{passwordError}</span>}
    
                    <input className='reg-input' type="password" id="p2" placeholder="Повторите пароль" 
                    value={confirmPassword} onChange={handleConfirmPasswordChange}/>
                    {confirmPasswordError && <span className="input-error">{confirmPasswordError}</span>}
                </div>
    
                <button className="signUp-button" type="submit">Зарегистрироваться</button>
            </form>
        )
    }

export default Registration

// нужно вернуть старую версию

