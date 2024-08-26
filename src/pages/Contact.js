import React, { useRef } from 'react'
import '../assets/styles/contact.css'
import zohoImg from '../assets/zoho.jpeg'
import assistantImg from '../assets/voice_assistant.svg'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {

  const scrollRef = useRef();

  useGSAP(() => {
    gsap.to('.building-img img', {
      x : 0,
      duration : 1,
      opacity : 1,
      ease : "bounce.out"
    })
    gsap.to('.map-location iframe', {
      x : 0,
      duration : 1,
      opacity : 1,
      ease : "bounce.out"
    })
    gsap.to('.assistant-img img', {
      x : 10,
      scale : 1,
      duration : 1.5,
      opacity : 1,
      ease : "power1.inOut",
      scrollTrigger : {
        trigger : ".assistant-img",
      }
    })
    gsap.to('.assistant-text address', {
      y : 0,
      duration : 1,
      opacity : 1,
      ease : "bounce",
      scrollTrigger : {
        trigger : ".assistant-img",
      }
    })
    
  },[])

  return (
    <div className='contact-container mb-4'>
      <h2 className='text-center fw-bold text-primary p-3'>OUR MAIN BRANCH</h2>
      <div className='row'>
        <section className='building-img flex-part col-12 p-3 col-md-6'>
          <img src={zohoImg} className='rounded-3' alt='zoho chennai' />
          <address className='fs-6 p-3 text-secondary fw-bold'>173, Avvai Shanmugam Salai, Gopalapuram, Chennai, Tamil Nadu 600086</address>
        </section>
        <section className='map-location flex-part col-12 col-md-6 p-3'>
          <h4 className='fw-bold text-secondary p-3'>View Live Location</h4>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.188652078202!2d80.04678197358639!3d12.83108281794647!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5260db1ff54b03%3A0xa8af6b8bb6419d6f!2sZoho%20Corporation!5e0!3m2!1sen!2sin!4v1720797697962!5m2!1sen!2sin" style={{border : 0}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </section>
      </div>
      <div className='row'>
        <section className='col-12 col-md-6 p-3 flex-part assistant-img'>
          <img src={assistantImg} alt='voice assistant'/>
        </section>
        <section className='col-12 col-md-6 p-3 flex-part assistant-text'>
          <h3 className='text-center fw-bold p-3'>Contact this 24/7 customer support with AI Assistant</h3>
          <address className='fw-bold text-primary fs-4'>
            <i className="fa-solid fa-phone-volume mx-2"></i>+044 1618 1618
          </address>
        </section>
      </div>
    </div>
  )
}

export default Contact