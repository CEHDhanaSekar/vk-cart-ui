import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React, { useRef } from 'react'
import { ScrollTrigger } from 'gsap/all'
import '../assets/styles/home.css'

gsap.registerPlugin(ScrollTrigger);

const Model = ({element}) => {

  const scrollRef = useRef();

  useGSAP(() => {
    const elements = gsap.utils.toArray(scrollRef.current.children);

    elements.forEach((el) => {
      if(el.classList.contains('model-text')){
        gsap.to(el.children,{
          y : 0,
          opacity : 1,
          stagger : .25,
          duration : .5,
          scrollTrigger : {
            trigger : el,
            start : '15% 15%'
          }
        })
      }
      else if(el.classList.contains('model-img')){
        gsap.to(el.children,{
          scale : 1,
          opacity : 1,
          duration : 1,
          delay : .5,
          scrollTrigger : {
            trigger : el,
          }
        })
      }
    })
    
  },[])

  let bgColor = element.number % 2 !== 0 ? '#3b6cff' : 'transparent'
  return (
    <section className={`model model-${element.number} row`} style={{backgroundColor : bgColor}} ref={scrollRef}>
        <div className={`model-text col-12 col-lg-6 flex-part flex-column p-3 order-lg-${element.order == 'textFirst' ? '1' : '2'}`}>
          {element.text.map((txt,i) => (
            <p key={i+10} className='text-justify fs-4 fw-bold text-dark mb-3 py-2 px-3'>
              {txt}
            </p>
          ))}
        </div>
        <div className={`model-img col-12 col-lg-6 p-2 flex-part order-lg-${element.order == 'textFirst' ? '2' : '1'}`}>
          <img src={element.image} alt='shopping-online'/>
        </div>
    </section>
  )
}

export default Model;