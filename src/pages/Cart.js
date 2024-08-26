import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { toast } from 'react-toastify'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Search from '../components/Search'

function Product_Card({item, cartItems, setCartItems, setFullAmount, setUnits}) {

    useGSAP(() => {
        gsap.to('.cart-item', {
          x : 0,
          opacity : 1,
          ease : 'power1.inOut',
          duration : .5,
          stagger : .25
        })
      },[cartItems])

    function decreaseQty() {
        if(item.qty > 1) {
            const updatedItem = cartItems.map((i) => {
                if(i.product._id == item.product._id){
                    --i.qty;
                }
                return i;
            })
            setCartItems(updatedItem);
        }
    }

    function increaseQty() {
        if(item.product.stock == item.qty){
            return;
        } 
        const updatedItem = cartItems.map((i) => {
            if(i.product._id == item.product._id){
                ++i.qty;
            }
            return i;
        })
        setCartItems(updatedItem);
    }

    function removeItem(id) {
        let newList = cartItems.filter((i) => i.product._id !== id );
        setCartItems(newList);
    }

    useEffect(() => {
        setUnits(
            cartItems.reduce((acc,item) => ( acc + item.qty ),0)
        )
        setFullAmount(
            cartItems.reduce((acc,item) => ( acc + item.qty * item.product.price ),0)
        )
     },[cartItems]);

    return <>
        <div className="col-12 col-lg-8">
            <div className="cart-item">
                <div className="row">
                    <div className="col-4 col-lg-3 d-flex justify-content-center">
                        <img src={item.product.images[0].image} alt="Laptop" height="90" width="115" />
                    </div>

                    <div className="col-8 col-lg-4">
                        <Link to={"/product/"+item.product._id} className='cart-name text-primary'>{item.product.name}</Link>
                        <p className='cart-des'>{item.product.description}</p>
                    </div>

                    <div className="col-4 d-lg-none mt-4 mt-lg-0">
                        <p id="card_item_price" className='text-center'>${item.product.price}</p>
                    </div>

                    <div className="col-6 col-lg-4 mt-4 mt-lg-0 d-flex flex-column justify-content-start align-items-center">
                        <div className="stockCounter d-inline">
                            <span className="btn btn-danger minus" onClick={decreaseQty}>-</span>
                            <input type="number" className="form-control count d-inline" value={item.qty} readOnly />

                            <span className="btn btn-primary plus" onClick={increaseQty}>+</span>
                        </div>
                        <div className="mt-2 d-none d-lg-block">
                            <p id="card_item_price" className=''>${item.product.price}</p>
                        </div>
                    </div>

                    <div className="col-1 mt-4 mt-lg-0">
                        <i id="delete_cart_item" onClick={() => removeItem(item.product._id)} className="fa fa-trash btn btn-danger py-2"></i>
                    </div>
                </div>
            </div>
            <hr />
        </div>
    </>
}

function ModalForOrder({show, handleClose, placeOrder}) {

    return <>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header className='bg-primary' closeButton>
          <Modal.Title className='fw-bold'>Order Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body className='fw-bold'>Are You Sure to Place the Order?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="warning" onClick={() => {
            placeOrder();
            handleClose();
          }}>
            Confirm
          </Button>
        </Modal.Footer>
    </Modal>
    </>
}

export default function Cart({cartItems, setCartItems}) {

    useEffect(() => {
        gsap.to('.empty-cart-img', {
            y : -50,
            opacity : 1,
            ease : 'bounce',
            duration : 1,
        })
        gsap.to('#order-con-img', {
            x : 0,
            ease : 'bounce',
            duration : 2,
            delay : 1,
        })

    },[cartItems])

    let [fullAmount,setFullAmount] = useState(0);
    let [units,setUnits] = useState(0);
    const [show, setShow] = useState(false);
    const [complete, setComplete] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    async function placeOrder() {
        fetch(process.env.REACT_APP_API_URL+'/order', {
            method : "POST",
            headers : {'Content-Type' : 'application/json'},
            body : JSON.stringify(cartItems)
        })
        .then((res) => {
            if(res.ok){
                setComplete(true);
                setCartItems([]);
                toast.success('Order Placed Successfully !');
                return;
            }
            toast.error("Oops!, Order not Placed, Try Again");
        })
    }

    return <>
    <Search />
    {cartItems.length > 0 ? 
    <Fragment>
        <ModalForOrder show={show} handleClose={handleClose} placeOrder={placeOrder}/>
        <div className="container container-fluid">
            <h2 className="mt-5 text-center">Your Cart : <b>{cartItems.length} Items</b></h2>
            <hr />
            <div className="row d-flex justify-content-between">
                {
                    cartItems.map((item,index) => (
                        <Product_Card key={index} item={item} cartItems={cartItems} setCartItems={setCartItems} setFullAmount={setFullAmount} setUnits={setUnits}/>
                    ))
                }
                <div className="col-12 col-lg-3 my-4">
                    <div id="order_summary">
                        <h4>Order Summary</h4>
                        <hr />
                
                        <p>Subtotal:  <span className="order-summary-values">
                            {units} (Units)
                        </span></p>
                        <p>Est. total: <span className="order-summary-values">
                            ${Number(fullAmount).toFixed(2)}
                        </span></p>

                        <hr />
                        <button id="checkout_btn" className="mt-2 btn btn-primary btn-block" onClick={handleShow}>Place Order</button>
                    </div>
                </div>
            </div>
        </div>
    </Fragment> : 
    !complete ? <Fragment>
        <div className='container container-fluid d-flex flex-column justify-content-center align-items-center'>
            <h3 className='my-3' id='empty-cart-text'>Your Cart is Empty !</h3>
            <div className='empty-cart-img'>
                <img src='/images/emptyCart.png' className='img-fluid' id='empty-cart-img'/>
            </div>
        </div>
    </Fragment> :
    <Fragment>
        <div className='container container-fluid d-flex flex-column justify-content-center align-items-center'>
            <h3 className='my-3'>Order Placed Successfully !</h3>
            <Link to="/" className='btn btn-outline-dark' onClick={() => setComplete(false)}>Back to Home</Link>
            <div className='order-con-div'>
                <img src='/images/confirmOrder.png' className='img-fluid opactity-0' id='order-con-img'/>
            </div>
        </div>
    </Fragment>
    }</>
}
