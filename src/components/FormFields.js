import React from "react";

function FormFields(
    handleSubmit,
    fullName,
    handleUserNameChange,
    userNameError,
    gender,
    handleGenderChange,
    genderError,
    inputRef,
    phoneNumber,
    handlePhoneChange,
    handlePhoneBlur,
    phoneError,
    birthDate,
    birthDateError,
    handleBirthDateChange,
    email,
    handleEmailChange,
    emailError,
    password,
    handlePasswordChange,
    passwordError,
    confirmPassword,
    handleConfirmPasswordChange,
    confirmPasswordError
){
    return(
        <form className="signUp-form" onSubmit={handleSubmit}>
            <h2 className="signUp-title">Регистрация</h2>
            <div className="input-container">
                
                <label htmlFor='user-name'>ФИО</label>
                <input className='reg-input' type="text" id="user-name" placeholder="Введите ФИО" value={fullName} onChange={handleUserNameChange}/>
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

export default FormFields