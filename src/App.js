import './App.css';
import MenuPage from './components/MenuPage'
import { Link, Routes, Route, Router } from 'react-router-dom'
import style from './MainPage.css'

function App() {
  return (
    <div>
      <nav>
        <div className='nav-links'>
        <img src="image/chef-hat-heart-broken.png" alt="logo" className='logo'/>
          <Link to=''>Меню</Link>
          <Link to=''>Заказы</Link>
          <Link to=''>Корзина</Link>
        </div>

        <div className='logIn-signUp-links'>
          <Link to=''>Зарегистрироваться</Link>
          <Link to=''>Войти</Link>
        </div>
      </nav>

      {/* <div className='filter-sort'>
        <p>categories</p>
        <DishFilterSort/>
      </div> */}

      <Routes>
        <Route path='/' element={<MenuPage/>}></Route>
        <Route path='/:categories' element={<MenuPage/>}></Route>

      </Routes>

      <footer>
        <div className='start-date'> 
          <img src="image/caelus-icon-pack.png" alt="icon" className='icon'/>
          <p className='year'>2025</p>
          <p className='brand-name'>- MyCafe</p>
        </div>
        <div className='brand'>
          {/* <img src="image/chef-hat-heart-broken.png" alt="logo" className='footer-logo'/> */}
        </div>
      </footer>
    </div>
  )
}

export default App;
