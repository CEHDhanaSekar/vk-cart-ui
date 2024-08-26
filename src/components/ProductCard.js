import React,{ useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/all';

gsap.registerPlugin(ScrollTrigger)

export default function ProductCard({product}) {

  const ratingRef = useRef(null);

  useEffect( () =>{
    if(ratingRef.current){
      ratingRef.current.style.background = `linear-gradient(90deg,#e0bf00 ${product.ratings / 5 * 100}%,#cccccc ${100 - (product.ratings / 5 * 100)}%)`;
      ratingRef.current.style.backgroundClip = `text`;
    }
  },[])

  return (
    <>
    <div className="col-sm-12 col-md-6 col-lg-3 my-3">
      <div className="card p-3 rounded">
        <img
          className="card-img-top mx-auto mb-2"
          src={product.images[0].image}
        />
        <div className="card-body d-flex align-items-center flex-column justify-content-between">
          <h5 className="card-title">
            <Link to={"/product/"+product._id}>{product.name}</Link>
          </h5>
          <div className="rating-part">
            <div className="rating" ref={ratingRef}>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
            </div>
          </div>
          <p className="card-text">${product.price}</p>
          <Link to={"/product/"+product._id} id="view_btn" className="btn btn-block">View Details</Link>
        </div>
      </div>
    </div>
    </>
  )
}
