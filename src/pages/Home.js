import React,{ useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import modelContent from '../models/modelContent'
import Model from '../components/Model'
import '../assets/styles/home.css'

gsap.registerPlugin(ScrollTrigger);

export default function Home() {

    const scrollRef = useRef();
    
    useGSAP(() => {
      gsap.to('#cart-icon',{
        x : 0,
        ease : "bounce.out",
        duration : .5,
        delay : 1
      })
      gsap.to('.text-part',{
        y : 0,
        duration : 1,
        opacity : 1,
        delay : .5,
        ease : "expo"
      })
      gsap.to('.home-img', {
        ease : 'power1.inOut',
        duration : 1,
        scale : 1,
        opacity : 1
      })
      
    },[])

    useEffect(() => {
      console.log("gi ")
      const elements = gsap.utils.toArray(scrollRef.current.children);

      elements.forEach((el) => {
        if(el.classList.contains('text-part-alt')){
          gsap.to(el, {
            y : 0,
            opacity : 1,
            duration : 1,
            ease : "expo",
            scrollTrigger : {
              trigger : el,
              toggleActions: "restart pause reverse pause",
              start : 'center center'
            }
          })
        }
        else if(el.classList.contains('img-part-alt')){
          gsap.to(el, {
            x : 0,
            y : 0,
            ease : "back",
            scale : 1,
            duration : 5,
            scrollTrigger : {
              trigger : el,
              start : "bottom bottom",
              end : "50% 50%",
              toggleActions: "restart pause reverse pause",
              scrub : true,
            }
          })
        }
      })
    },[])

    return <>

    <div className='home-main container-fluid'>
      <section className='hero-top row bg-light px-2 px-md-3 py-2'>
        <div className='text-part col-12 col-xl-6 col-lg-4 flex-part flex-column p-3'>
          <h3 className='text-center mb-3 px-3 fw-bold'>
            "Welcome to our store, where quality meets convenience. Start exploring today!"
          </h3>
          <Link to="/products">
            <button className='btn btn-primary fs-5 px-3 py-2 fw-bold overflow-hidden'>
              Buy Now <i className="fa-solid fa-cart-plus" id='cart-icon'></i>
            </button>
          </Link>
        </div>
        <div className='img-part col-12 col-xl-6 col-lg-8 p-4 flex-part'>
          <img src='/images/shopping2.svg' className='home-img' alt='shopping-online'/>
        </div>
      </section>
      <section className='home-hero row' ref={scrollRef}>
        <div className='text-part-alt col-12 col-lg-6 flex-part flex-column p-3'>
          <h3 className='text-center text-light mb-3 px-3'>
            "Experience unparalleled customer care. Our team is dedicated to assisting you whenever you need help."
          </h3>
        </div>
        <div className='img-part-alt col-12 col-lg-6 p-4 flex-part'>
          <img src='/images/customer-service.png' className='home-img-alt' alt='shopping-online'/>
        </div>
      </section>
      {
        modelContent.map((element,i) => (
          <Model element={element} key={i}/>
        ))
      }
    </div>

    </>
}
