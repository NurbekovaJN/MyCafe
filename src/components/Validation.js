import React from "react";
import FormFields from "./FormFields";
import Registration from "./Registration";

function Validation(
    fullName,
    gender,
    birthDate,
    email,
    userNameError,
    genderError,
    birthDateError,
    emailError,
    setUserName,
    setGender,
    setBirthDate,
    setEmail,
    setUserNameError,
    setGenderError,
    setBirthDateError,
    setEmailError
){

    const handleUserNameChange = (event) => {
        const newUserName = event.target.value
        setUserName(newUserName)
        validateUserName(newUserName)
    }

    const handleGenderChange = (event) => {
        setGender(event.target.value)
    }

    const handleBirthDateChange = (event) => {
        const newBirthDate = event.target.value
        setBirthDate(newBirthDate)
        validateBirthDate(newBirthDate)
    }

    const handleEmailChange = (event) => {
        const newEmail = event.target.value
        setEmail(newEmail)
        validateEmail(newEmail)
    }

    const validateUserName = (fullName) => {
            const regUserName = /^[A-Za-zА-яа-я\s]+$/
            if(!fullName){
                setUserNameError('')
                return true
            }else if(!regUserName.test(fullName)){
                setUserNameError('ФИО должно содержать только буквы латинского алфавита и кириллицы')
                return false
            }
            // else if(fullName.length < 2 || fullName.length > 20){
            //     setUserNameError('Имя должно быть длиннее 2 символов и короче 20')
            //     return false
            // }   
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

    return(
        <FormFields
            fullName={fullName}
            gender={gender}
            birthDate={birthDate}
            email={email}

            userNameError={userNameError}
            genderError={genderError}
            birthDateError={birthDateError}
            emailError={emailError}

            handleUserNameChange={handleUserNameChange}
            handleGenderChange={handleGenderChange}
            handleBirthDateChange={handleBirthDateChange}
            handleEmailChange={handleEmailChange}
        />,

        <Registration
            validateUserName={validateUserName}
            validateGender={validateGender}
            validateBirthDate={validateBirthDate}
            validateEmail={validateEmail}
        />
    )
}

export default Validation