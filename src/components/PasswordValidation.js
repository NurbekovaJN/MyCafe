import React from "react";
import FormFields from "./FormFields";
import Registration from "./Registration";

function PasswordValidation(
    password,
    setPassword,
    passwordError,
    setPasswordError,
    confirmPassword,
    setConfirmPassword,
    confirmPasswordError,
    setConfirmPasswordError
){

    const handlePasswordChange = (event) => {
        const newPassword = event.target.value
        setPassword(newPassword)
        validatePassword(newPassword)
    }

    const handleConfirmPasswordChange = (event) => {
        const newConfirmPassword = event.target.value
        setConfirmPassword(newConfirmPassword)
        validateConfirmPassword(newConfirmPassword)
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

    return(
        <FormFields
            handlePasswordChange={handlePasswordChange}
            handleConfirmPasswordChange={handleConfirmPasswordChange}
        />
    )
}

export default PasswordValidation