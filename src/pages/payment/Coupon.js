
import '../../App.css';
import React from 'react';
import { Link, redirect } from 'react-router-dom';
import axios from 'axios';
import { urls } from '../../app/api';
import { Image } from 'react-bootstrap';
import { useState,useEffect } from "react"

export function Coupon({pathurl}) {

    let bgurl = pathurl+"coupon_bg.png"

    let buttonBackurl = pathurl+"payment_back_coupon.png"

    let buttonNexturl = pathurl+"payment_next_coupon.png"

    const verifyCoupon = async () => {
        redirect("/choosephotoframe")
    }

    return (
        <div className="background-container" style={{backgroundImage:'url("'+bgurl+'")', alignItems: "end",textAlign:'center'}}>
            <div className='row'>
                {/* <div className='ml-auto col-12 mr-auto' style={{marginBottom: "10rem"}}>
                    <Link to={paymentUrl} style={{marginBotto: '10rem'}}>
                        <Image src={paybuttonurl} rounded />
                    </Link> 
                </div>
                <div className='ml-auto col-12 mr-auto' style={{marginBottom: "20rem"}}>
                    <Link to={paymentUrl} style={{marginBotto: '10rem'}}>
                        <Image src={couponurl} rounded />
                    </Link> 
                </div> */}
                <div style={{marginBottom: "5rem"}}>
                    <Link to='/payment'>
                        <Image src={buttonBackurl} rounded />
                    </Link>
                    <Link to='/choosephotoframe'>
                        <Image src={buttonNexturl} rounded />
                    </Link>
                </div>
            </div>
        </div>
    )
}