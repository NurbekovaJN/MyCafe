import './App.css';
import MainPage from './components/MainPage'
import { Link, Routes, Route } from 'react-router-dom'
import style from './MainPage.css'
import DishFilterSort  from './components/MenuFilterSort'

function App() {
  return (
    <div>
      <nav>
        <div className='nav-links'>
          <Link to=''>Меню</Link>
          <Link to=''>Заказы</Link>
          <Link to=''>Корзина</Link>
        </div>

        <div className='logIn-signUp-links'>
          <Link to=''>Зарегистрироваться</Link>
          <Link to=''>Войти</Link>
        </div>
      </nav>

      <Routes>
        <Route path=''></Route>
      </Routes>

      <MainPage/>
      <DishFilterSort/>
    </div>
  )
}

export default App;
