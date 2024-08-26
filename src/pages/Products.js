import { Fragment, useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import { useSearchParams } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Search from '../components/Search';

export default function Products(){

  const [products, setProducts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL+'/products?'+searchParams)
    .then( res => res.json())
    .then( res => {
      setProducts(res.products);
    })
    .catch( error => console.log(error))
  },[searchParams])

  useGSAP(() => {
    gsap.to('.title-products', {
      x : 0,
      opacity : 1,
      duration : 1.5,
    })
    gsap.to('.card', {
      y : 0,
      opacity : 1,
      duration : 1,
      stagger : 0.25,
      scrollTrigger : {
        trigger : ".card",
      }
    })
  },[products])

  return <>
    <Search />
    { products.length > 0 && <h1 id="products_heading" className='text-center title-products'>Latest Products</h1>}
    { products.length > 0 ?
      <Fragment>
        <section id="products" className="container mt-5">
          <div className="row">
            {
              products.map((product,index) => (
                <ProductCard key={index} product={product}/>
              ))
            }
          </div>
        </section>
      </Fragment> :
      <Fragment>
        <div className='container d-flex align-items-center flex-column p-5'>
          <h2 className='text-center mb-3'>Oops, No Result Found!</h2>
          <div id='no-result-img'>
            <img src='/images/search.svg' className='img-fluid' alt="No Match Results"/>
          </div>
        </div>
      </Fragment>
    }
  </>
}
