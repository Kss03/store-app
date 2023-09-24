import { createHashRouter, HashRouter, RouterProvider, Routes, Route} from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import './App.css';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProductsPage from './pages/ProductsPage';
import Header from './components/navbar/Header';
import CartPage from './pages/CartPage';
import SingleProductPage from './pages/SingleProductPage';
import Footer from './components/Footer/Footer';
import { onLogin } from './reducers/Login/Login';
import CreatorPage from './pages/CreatorPage';
import ErrorBoundary from './components/Error/Error';

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

          <Route index element={<HomePage /> }></Route>
          {/* <Route index element={<Navigate to="products" />}></Route> */}
          <Route path="products" element={<ProductsPage />} />
          <Route path="products/:id" element={<SingleProductPage />} />
          <Route path="card" element={<CartPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="creator" element={<CreatorPage />} />
        </Route>

      </Routes>
      <Footer /> 
    </HashRouter>
  );
}

export default App;
