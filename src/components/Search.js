import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Search() {

    const [keyword,setKeyword] = useState("");
    const navigate = useNavigate();

    const searchHandler = () => {
        navigate('/search?keyword='+keyword);
    }

    useGSAP(() => {
        gsap.to('#search_field', {
            y : 0,
            ease : 'power1',
            duration : 1,
            delay : .5,
        })
        gsap.to('#search_btn', {
            x : 0,
            ease : 'power1',
            duration : 1,
            delay : .75,
        })
    },[])

    return (
        <div className='w-100'>
            <div className="input-group w-100 w-md-50 d-flex justify-content-center">
                <input
                    type="text"
                    id="search_field"
                    className="form-control"
                    placeholder="Enter Product Name ..."
                    onChange={ (e) => setKeyword(e.target.value)}
                    value={keyword}
                />
                <div className="input-group-append p-0">
                    <button id="search_btn" className="btn px-5 py-2" onClick={searchHandler}>
                    <i className="fa fa-search" aria-hidden="true"></i>
                    </button>
                </div>
            </div>
        </div>
    )
}
