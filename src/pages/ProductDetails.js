import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Search from '../components/Search';

export default function ProductDetails({cartItems, setCartItems}) {

    const [product,setProduct] = useState(null);
    let [qty,setQty] = useState(1);
    const {id} = useParams();
    const ratingRef = useRef(null);

    useEffect(() => {
        fetch(process.env.REACT_APP_API_URL + "/product/"+id)
        .then( res => res.json())
        .then( res => {
            setProduct(res.product);
        })
        .catch( error => console.log(error));
        if(ratingRef.current){
            ratingRef.current.style.background = `linear-gradient(90deg,#e0bf00 ${product.ratings / 5 * 100}%,#cccccc ${100 - (product.ratings / 5 * 100)}%)`;
            ratingRef.current.style.backgroundClip = `text`;
        }
    },[])

    function addTOCart() {
        let itemExist = cartItems.find((item) => item.product._id === product._id)
        if(!itemExist){
            const newItem = {product,qty};
            setCartItems((prev) => [...prev, newItem]);
            toast.success("Item Added to Cart");
        }
    }

    function decreaseQty() {
        if(qty > 1) setQty(--qty);
    }

    function increaseQty() {
        if(product.stock > qty){
            setQty(++qty);
        }
    }

    return <>
    <Search />
    {product && <div className="container container-fluid">
            <div className="row f-flex justify-content-around align-items-center pt-5">
                <div className="col-12 col-lg-5 product_image" id="product_image">
                    <img className='img-fluid' src={product.images[0].image} alt="sdf" />
                </div>
                <div className="col-12 col-lg-5 mt-5 d-flex flex-column align-items-center justify-content-center gap-2">
                    <h3 className='product-name text-dark fw-bold'>{product.name}</h3>
                    <p id="product_id">Product #{product._id}</p>

                    <div className="rating-part">
                        <div className="rating" ref={ratingRef}>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                        </div>
                    </div>
                    
                    <p id="product_price">${product.price}</p>
                    <div className="stockCounter d-inline">
                        <span className="btn btn-danger minus" onClick={decreaseQty}>-</span>
                        <input type="number" className="form-control count d-inline" value={qty<1 ? 1 : qty} readOnly />
                        <span className="btn btn-primary plus" onClick={increaseQty}>+</span>
                    </div>
                    <button type="button" id="cart_btn" className="my-2 btn btn-primary d-inline ml-4" onClick={addTOCart} disabled={product.stock == 0}>Add to Cart</button>
                    
                    <p className='fw-bold'>Status: <span id="stock_status" className={Number(product.stock) > 0 ? 'text-success' : 'text-danger'}>{Number(product.stock) > 0 ? 'In Stock' : 'Out of Stock'}</span></p>
                    
                    <h4 className="mt-3">Description:</h4>
                    <p className='product-description'>{product.description}</p>
                    
                    <p id="product_seller my-3">Sold by: <strong>{product.seller}</strong></p>
                    <div className="rating w-50"></div>	
                </div>
            </div>
        </div>}
    </>
}
