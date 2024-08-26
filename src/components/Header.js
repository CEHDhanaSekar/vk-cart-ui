import React, { useRef } from 'react'
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const Header = ({cartItems}) => {

  useGSAP(() => {
    gsap.to('.navbar-brand', {
      y : 0,
      opacity : 1,
      ease : 'bounce',
      duration : 1,
    })
    gsap.to('#cart', {
      x : 60,
    })
  },[])
  
  const navRef = useRef();

  const handleNavbar = (action) => {
    switch(action){
      case 'open':
        navRef.current.classList.add('active');
        break;
      case 'close':
        navRef.current.classList.remove('active');
        break;
    }
  }

  return (
    <>
    <nav className="navbar row">
      <div className="col-6 col-md-3 d-md-block d-flex justify-content-start">
        <Link to='/'>
        <div className="navbar-brand">
          <img width="150px" src="/images/logo.png" id='vk-cart-logo' />
        </div>
        </Link>
      </div>

      <div className='nav-items col-8 d-none d-md-block'>
        <ul className='d-flex justify-content-center gap-5'>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/products'>Products</Link></li>
          <li><Link to='/cart' href='#'>Cart{cartItems.length > 0 && <span className="ms-1 text-light" id="cart_count">{cartItems.length}</span>}</Link></li>
          <li><Link to='/contact'>Contact</Link></li>
        </ul>
      </div>

      <div className='col-6 d-md-none d-flex justify-content-end'>
        <button type='button' className='m-2 btn btn-primary position-relative' onClick={() => handleNavbar('open')}>
          {cartItems.length > 0 && <span id='nodify' className='px-2 py-1 rounded-circle'>!</span>}
          <i className="fa-solid fa-bars"></i>
        </button>
      </div>
    </nav>

    <div id="slide-navbar" ref={navRef}>
      <button type="button" id='close-btn' className='btn btn-outline-dark fs-4' onClick={() => handleNavbar('close')}>
        <i className="fa-solid fa-xmark"></i>
      </button>
      <ul>
        <li><Link href='#' onClick={() => handleNavbar('close')}>Home</Link></li>
        <li><Link href='#' onClick={() => handleNavbar('close')}>Products</Link></li>
        <li><Link to='/cart' href='#' onClick={() => handleNavbar('close')}>Cart{cartItems.length > 0 && <span className="ms-1 text-light" id="cart_count">{cartItems.length}</span>}</Link></li>
        <li><Link href='#' onClick={() => handleNavbar('close')}>Contact</Link></li>
      </ul>
    </div>
    </>
  )
}

export default Header;