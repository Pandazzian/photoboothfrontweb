
import '../../App.css';
import React from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios';
import { urls } from '../../app/api';

export function Payment({backgroundImageUrl}) {

    const getPaymentLink = async () => {
        const res = await axios.post(urls.payment,
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
                    'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type',
                    
                }
            }).then((res) => {
                console.log("RESPONSE RECEIVED: ", res);
              })
        return res.data
    }

    return (
        <div className="background-container" style={{backgroundImage:'url("'+backgroundImageUrl+'")'}}>
            <div className='row'>
                <div className='ml-auto col-4 mr-auto'>

                    
                <button type="button" class="btn btn-primary" onClick={getPaymentLink}>pay</button>
                    {/* <Link to='/choosephotoframe'>
                        <button type="button" class="btn btn-primary">Next</button>
                    </Link> */}
                </div>
            </div>
        </div>
    )
}