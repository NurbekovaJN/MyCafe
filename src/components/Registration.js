import React from "react";
import { useState } from "react";

function Registration(){
    const [userName, setUserName] = useState('')
    const [gender, setGender] = useState('')
    const [phone, setPhone] = useState('')
    const [birthDate, setBirthDate] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPasword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [userNameError, setUserNameError] = useState('')
    const [genderError, setGenderError] = useState('')
    const [phoneError, setPhoneError] = useState('')
    const [birthDateError, setBirthDateError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPaswordError] = useState('')
    const [confirmPasswordError, setConfirmPasswordError] = useState('')

    const handleChangeUserName = (e) => {
        const newUserName = e.target.value
        setUserName(newUserName)
        validateUserName(newUserName)
    }

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

    const handleGenderSelect = (e) => {
        setGender(e.target.value)
    }

    const validateGender = (gender) => {
        if(gender === 'select'){
            setGenderError('Выберите пол')
            return false
        }
        setGenderError('')
        return true
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const isGenderValid = validateGender(gender)
        if(isGenderValid){}
    }


    return(
        <div className="signUp-form" onSubmit={handleSubmit}>
            <h2 className="signUp-title">Регистрация</h2>
            <div className="input-container">
                
                <label for='user-name'>ФИО</label>
                <input className='reg-input' type="text" id="user-name" placeholder="Введите ФИО" value={userName} onChange={handleChangeUserName}/>
                {userNameError && <span className="input-error">{userNameError}</span>}

                <label for='gender'>Пол</label>
                <select className="gender-select" id="gender" value={gender} onChange={handleGenderSelect}>
                    <option value="g" key="select">---</option>
                    <option value="g" key="male">Мужчина</option>
                    <option value="g" key="female">Женщина</option>
                </select>
    
                <label for='user-phone'>Телефон</label>
                <input className='reg-input' type="text" id="user-phone" placeholder="Введите телефон" />
    
                <label for='user-birthDate'>Дата рождения</label>
                <input type="date" id="user-birthDate"/>

                <div className="user-address-container">
                    <p className="user-address-title">Адрес проживания</p>
                    <label for=''>Субъект РФ</label>
                    <input className='reg-input' type="text"/>
    
                    <label for=''>Город</label>
                    <input className='reg-input' type="text"/>
    
                    <label for=''>Улица</label>
                    <input className='reg-input' type="text"/>
    
                    <label for=''>Дом</label>
                    <input className='reg-input' type="text"/>
                </div>

                <label for='user-email'>Почта</label>
                <input className='reg-input' type="email" id="user-email" placeholder="Введите почту" />

                <label for='p1 p2'>Пароль</label>
                <input className='reg-input' type="password" id="p1" placeholder="Введите пароль" />
                <input className='reg-input' type="password" id="p2" placeholder="Повторите пароль" />

            </div>

            <button className="signUp-button">Зарегистрироваться</button>
        </div>
    )
}

export default Registration