
import '../../App.css';
import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { urls } from '../../app/api';
import { Image } from 'react-bootstrap';
import { useState,useEffect } from "react"

export function Payment({pathurl}) {
    const [paymentUrl, setPaymentUrl] = useState("/choosephotoframe");

    let bgurl = pathurl+"payment_bg.png"

    let buttonurl = pathurl+"payment_back.png"

    let paybuttonurl = pathurl+"payment_pay.png"

    let couponButtonUrl = pathurl+"coupon_code.png"

    let couponUrl = "/coupon"

    useEffect(() => {
        getPaymentLink()
      });

    const getPaymentLink = async () => {
        await axios
            .post(urls.payment,
            {
                amount: 100,
                currency: "EUR",
                billing: {
                    title: "mr",
                    first_name: "John",
                    last_name: "Watson",
                    mobile_phone_number: "+33612345678",
                    email: "john.watson@example.net",
                    address1: "221B Baker Street",
                    postcode: "NW16XE",
                    city: "London",
                    country: "GB",
                    language: "en"
                },
                shipping: {
                    title: "mr",
                    first_name: "John",
                    last_name: "Watson",
                    email: "john.watson@example.net",
                    address1: "221B Baker Street",
                    postcode: "NW16XE",
                    city: "London",
                    country: "GB",
                    language: "en",
                    delivery_type: "BILLING"
                },
                "hosted_payment": {
                    "return_url": "http://localhost:3000/choosephotoframe",
                    "cancel_url": "http://localhost:3000/"
                },
                "notification_url": "https://example.net/notifications?id=42",
                "metadata": {
                    "customer_id": "42"
                    },
                    "save_card": false,
                    "force_3ds": true
            },
            {
                headers:{
                    'Content-Type':'application/json',
                    'Authorization': 'Bearer sk_test_2olFiJeiKA4yDhmnMFPxyk',
                    'PayPlug-Version': '2019-08-06',
                    'Access-Control-Allow-Origin' : '*',
                    'Access-Control-Allow-Methods':'*',
                    'Access-Control-Allow-Headers': '*',
                    'Access-Control-Allow-Credentials': true,
                }
            }).then((res) => {
                console.log("RESPONSE RECEIVED: ", res);
                setPaymentUrl(res.data.hosted_payment.payment_url)
            }).catch(()=>{
                console.log("catched")
            })
        
    }

    return (
        <div className="background-container" style={{backgroundImage:'url("'+bgurl+'")', alignItems: "end",textAlign:'center'}}>
            <div className='row'>
                <div className='ml-auto col-12 mr-auto' style={{marginBottom: "10rem"}}>
                    <Link to={paymentUrl} style={{marginBottom: '10rem'}}>
                        <Image src={paybuttonurl} rounded />
                    </Link> 
                </div>
                <div className='ml-auto col-12 mr-auto' style={{marginBottom: "20rem"}}>
                    <Link to={couponUrl} style={{marginBottom: '10rem'}}>
                        <Image src={couponButtonUrl} rounded />
                    </Link> 
                </div>
                <div style={{marginBottom: "5rem"}}>
                    <Link to='/'>
                        <Image src={buttonurl} rounded />
                    </Link>
                </div>
            </div>
        </div>
    )
}