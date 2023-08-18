import { BrowserRouter, HashRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import './App.css';

import LoginPage from './pages/LoginPage';
import ProductsPage from './pages/ProductsPage';
import Header from './components/navbar/Header';
import CartPage from './pages/CartPage';
import SingleProductPage from './pages/SingleProductPage';
import Footer from './components/Footer/Footer';
import { onLogin } from './reducers/Login/Login';

function App() {

  const dispatch = useDispatch()


  useEffect(() => {
    isLogged()
  }, [])

  const isLogged = () => {
    if (localStorage["token"]) {
      dispatch(onLogin())
    }
  }

  return (
    <HashRouter>
      <Header />
      <Routes>
        <Route path='/'>
          <Route index element={<Navigate to='/products' />}></Route>
        </Route>
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<SingleProductPage />} />
        <Route path="/card" element={<CartPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <Footer /> 
    </HashRouter>
  );
}

export default App;
