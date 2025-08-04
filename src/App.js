import './App.css';
import style from './MainPage.css'
import { Link, Routes, Route, Router } from 'react-router-dom'
import MenuPage from './components/MenuPage'
import CategoryFilter from './components/CategoryFilter';
import DishModal from './components/DishModal';
import Footer from './components/Footer';

function App() {
  return (
    <div>
      <nav>
        <div className='nav-links'>
        <img src="./image/chef-hat-heart-broken.png" alt="logo" className='logo'/>
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
        <Route path='' element={<MenuPage/>}></Route>
        <Route path='/:categoryId' element={<CategoryFilter/>}></Route>
        <Route path='/:dishId' element={<DishModal/>}></Route>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App;
