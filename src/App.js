import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './pages/Home'
import Products from './pages/Products';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductDetails from './pages/ProductDetails';
import { useState } from 'react';
import { Zoom , ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Cart from './pages/Cart';
import Contact from './pages/Contact';

function App() {

  const [cartItems,setCartItems] = useState([]);
  return (
    <div className='App'>
      <Router>
        <ToastContainer theme='light' position='top-center' autoClose={3000} transition={Zoom}/>
        <Header cartItems={cartItems}/>
        <Routes>
          <Route path='/' element={ <Home /> }/>
          <Route path='/products' element={ <Products /> }/>
          <Route path='/search' element={ <Products /> }/>
          <Route path='/product/:id' element={ <ProductDetails cartItems={cartItems} setCartItems={setCartItems} /> }/>
          <Route path='/cart' element={ <Cart cartItems={cartItems} setCartItems={setCartItems} /> }/>
          <Route path='/contact' element={<Contact />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
