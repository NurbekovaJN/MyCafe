import './App.css';
import MainPage from './MainPage'
import { Link, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div>
      <nav>
        <Link to=''>Меню</Link>
        <Link to=''>Заказы</Link>
        <Link to=''>Корзина</Link>
        <Link to=''>Войти</Link>
        <Link to=''>Зарегистрироваться</Link>
      </nav>
      <MainPage/>
    </div>
  )
}

export default App;
