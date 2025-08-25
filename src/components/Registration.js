import React from "react";
import { useState } from "react";
import axios from "axios";

function Registration(){
    const [userName, setUserName] = useState('')
    const [gender, setGender] = useState('')
    const [phone, setPhone] = useState('')
    const [birthDate, setBirthDate] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [userNameError, setUserNameError] = useState('')
    const [genderError, setGenderError] = useState('')
    const [phoneError, setPhoneError] = useState('')
    const [birthDateError, setBirthDateError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [confirmPasswordError, setConfirmPasswordError] = useState('')

    const handleUserNameChange = (e) => {
        const newUserName = e.target.value
        setUserName(newUserName)
        validateUserName(newUserName)
    }

    const handleGenderChange = (e) => {
        setGender(e.target.value)
    }

    const handlePhoneChange = (e) => {
        const newPhone = e.target.value
        setPhone(newPhone)
        validatePhone(newPhone)
    }

    const handleBirthDateChange = (e) => {
        const newBirthDate = e.target.value
        setBirthDate(newBirthDate)
        validateBirthDate(newBirthDate)
    }

    const handleEmailChange = (e) => {
        const newEmail = e.target.value
        setEmail(newEmail)
        validateEmail(newEmail)
    }

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value
        setPassword(newPassword)
        validatePassword(newPassword)
    }

    const handleConfirmPasswordChange = (e) => {
        const newConfirmPassword = e.target.value
        setConfirmPassword(newConfirmPassword)
        validateConfirmPassword(newConfirmPassword)
    }

    ////////

    const validateUserName = (userName) => {
        const regUserName = /^[A-Za-zА-яа-я\s]+$/
        if(!userName){
            setUserNameError('')
            return true
        }else if(!regUserName.test(userName)){
            setUserNameError('Имя должно содержать только буквы латинского алфавита и кириллицы')
            return false
        }
        else if(userName.length < 2 || userName.length > 20){
            setUserNameError('Имя должно быть длиннее 2 символов и короче 20')
            return false
        }   
        setUserNameError('')
        return true
    }

    const validateGender = (gender) => {
        if(gender === 'select-gender'){
            setGenderError('Выберите пол')
            return false
        }
        setGenderError('')
        return true
    }

    const validatePhone = (phone) => {
        const regPhone = /^[\d\+][\d\(\)\ -]{4,14}\d$/
        if(!phone){
            setPhoneError('')
            return true
        }else if(!regPhone.test(phone)){
            setPhoneError('Введите номер корректно')
            return false
        }
        setPhoneError('')
        return true
    }

    const validateBirthDate = (birthDate) => {
        if(!birthDate){
            setBirthDateError('Введите дату рождения')
            return false
        }
        setBirthDateError('')
        return true
    }

    const validateEmail = (email) => {
        const regEmail = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i
        if(!email){
            setEmailError('')
            return true
        }else if(!regEmail.test(email)){
            setEmailError('Введите почту корректно')
            return false
        }
        setEmailError('')
        return true
    }

    const validatePassword = (password) => {
        const regPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/
        if(!password){
            setPasswordError('')
            return true
        }else if(!regPassword.test(password)){
            setPasswordError('Пароль должен иметь хотя бы одну цифру, строчные символы, заглавную букву и состоять минимум из 8 символов')
            return false
        }
        setPasswordError('')
        return true
    }

    const validateConfirmPassword = (confirmPassword) => {
        if(!confirmPassword){
            setConfirmPasswordError('')
            return true
        }else if(password !== confirmPassword){
            setConfirmPasswordError('Пароли не совпадают')
            return false
        }
        setConfirmPasswordError('')
        return true
    }

    /////

    const handleSubmit = async(e) => {
        e.preventDefault()

        console.log('Форма отправлена')
        const isUserNameValid = validateUserName(userName)
        const isGenderValid = validateGender(gender)
        const isPhoneValid = validatePhone(phone)
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
                    userName, 
                    gender, 
                    phone, 
                    birthDate, 
                    email,
                    password,
                }
                console.log('Данные для отправки:', registrationData)

                const API_URL = 'https://food-delivery.kreosoft.ru/api/dish'
                console.log('Отправляем запрос...')
                
                const response = await axios.post(API_URL, registrationData)
                console.log(response.data)

                if(response.status === 201){
                    alert('Регистрация прошла успешно')
                    setUserName('')
                    setGender('')
                    setPhone('')
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
    }


    return(
        <form className="signUp-form" onSubmit={handleSubmit}>
            <h2 className="signUp-title">Регистрация</h2>
            <div className="input-container">
                
                <label htmlFor='user-name'>ФИО</label>
                <input className='reg-input' type="text" id="user-name" placeholder="Введите ФИО" value={userName} onChange={handleUserNameChange}/>
                {userNameError && <span className="input-error">{userNameError}</span>}

                <label htmlFor='gender'>Пол</label>
                <select className="gender-select" id="gender" value={gender} onChange={handleGenderChange}>
                    <option value="select-gender" key="select">---</option>
                    <option value="gender-male" key="male">Мужчина</option>
                    <option value="gender-female" key="female">Женщина</option>
                </select>
                {genderError && <span className="input-error">{genderError}</span>}
    
                <label htmlFor='user-phone'>Телефон</label>
                <input className='reg-input' type="text" id="user-phone" placeholder="Введите телефон" 
                value={phone} onChange={handlePhoneChange}/>
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