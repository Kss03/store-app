import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import './App.css';
import ProductsPage from './pages/ProductsPage';
import Header from './components/navbar/Header';
import CartPage from './pages/CartPage';
import SingleProductPage from './pages/SingleProductPage';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/'>
          <Route index element={<Navigate to='products' />}></Route>
        </Route>
        <Route path="products" element={<ProductsPage />} />
        <Route path="products/:id" element={<SingleProductPage />} />
        <Route path="card" element={<CartPage />} />
      </Routes>
      <Footer /> 
    </BrowserRouter>
  );
}

export default App;
