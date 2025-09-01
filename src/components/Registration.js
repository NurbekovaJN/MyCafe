import React, { useState, useRef } from "react";
import axios from "axios";
import FormFields from "./FormFields";
import Validation from "./Validation";
import PhoneValidation from "./PhoneValidation";
import PasswordValidation from "./PasswordValidation";

function Registration(
    validateUserName,
    validateGender,
    validateBirthDate,
    validateEmail,
    validatePhone,
    validatePassword,
    validateConfirmPassword
){
    const [fullName, setUserName] = useState('')
    const [gender, setGender] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [birthDate, setBirthDate] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const inputRef = useRef(null) // ссылка на ДОМ элемент инпут

    const [userNameError, setUserNameError] = useState('')
    const [genderError, setGenderError] = useState('')
    const [phoneError, setPhoneError] = useState('')
    const [birthDateError, setBirthDateError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [confirmPasswordError, setConfirmPasswordError] = useState('')


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
    }

    return(
        <FormFields
            handleSubmit={handleSubmit}
        />,

        <Validation
            fullName={fullName}
            setUserName={setUserName}
            gender={gender}
            setGender={setGender}
            birthDate={birthDate}
            setBirthDate={setBirthDate}
            email={email}
            setEmail={setEmail}
            userNameError={userNameError}
            setUserNameError={setUserNameError}
            genderError={genderError}
            setGenderError={setGenderError}
            birthDateError={birthDateError}
            setBirthDateError={setBirthDateError}
            emailError={emailError}
            setEmailError={setEmailError}
        />,

        <PhoneValidation
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            phoneError={phoneError}
            setPhoneError={setPhoneError}
            inputRef={inputRef}
        />,

        <PasswordValidation
            password={password}
            setPassword={setPassword}
            passwordError={passwordError}
            setPasswordError={setPasswordError}

            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            confirmPasswordError={confirmPasswordError}
            setConfirmPasswordError={setConfirmPasswordError}
        />
    )
}

export default Registration

