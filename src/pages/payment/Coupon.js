
import '../../App.css';
import React from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { urls } from '../../app/api';
import { Image,Form,Spinner } from 'react-bootstrap';
import { useState } from "react"
// import {Swal} from 'sweetalert2';
// import withReactContent from 'sweetalert2-react-content'



export function Coupon({pathurl}) {
    const navigate = useNavigate();
    // const MySwal = withReactContent(Swal)

    const API_URL = urls.gql;

    const API_KEY = urls.apiSecretKey;

    let bgurl = pathurl+"coupon_bg.png"

    let buttonBackurl = pathurl+"payment_back_coupon.png"

    let buttonNexturl = pathurl+"payment_next_coupon.png"

    const [field,setField] = useState("")
    const [loading,setLoading] = useState(false)

    const pressNum = (num) => {
        setField(field+num)
    }
    const pressBack = () => {
        if(field===""){
            navigate("/payment")
        }
        else{
            setField(field.slice(0, -1))
        }
    }

    const verifyCoupon = async () => {
        setLoading(true)
        const query = `
        query MyQuery {
            listCoupons(filter: {Code: {eq: "${field}"}, isValid: {eq: true}}) {
              nextToken
              items {
                Code
                createdAt
                expDate
                id
                isValid
                updatedAt
              }
            }
          }
        `;

        // Set up Axios config with the "x-api-key" header
        const axiosConfig = {
        headers: {
            'x-api-key': API_KEY,
            'Content-Type': 'application/json',
        },
        };

        // Make the GraphQL API request
        axios
        .post(API_URL, { query }, axiosConfig)
        .then((response) => {
            // setData(response.data);
            let couponlist = response.data.data.listCoupons.items
            // console.log(couponlist.items.length);
            if(couponlist.length === 0){
                setLoading(false)
                // MySwal.fire({
                //     title: <strong>Oops!</strong>,
                //     html: <i>Invalid code plaease try again</i>,
                //     icon: 'warning'
                // })
                alert("invalid code plaease try again")
            }else{
                setInvalid(couponlist[0])
            }
        })
        .catch((error) => {
            setLoading(false)
            // MySwal.fire({
            //     title: <strong>An error occur.</strong>,
            //     html: <i>{error} please try again</i>,
            //     icon: 'error'
            // })
            alert("an Error occor pleasr try again")
            console.error('Error:', error);
        });
        // redirect("/choosephotoframe")
    }

    const setInvalid = async (coupon) => {
        const query = `
        mutation MyMutation {
            updateCoupon(input: {id: "${coupon.id}", isValid: false}) {
              id
            }
          }
        `;

        // Set up Axios config with the "x-api-key" header
        const axiosConfig = {
        headers: {
            'x-api-key': API_KEY,
            'Content-Type': 'application/json',
        },
        };

        // Make the GraphQL API request
        axios
        .post(API_URL, { query }, axiosConfig)
        .then((response) => {
            console.log(response.data.data.updateCoupon.id===coupon.id);
            if(response.data.data.updateCoupon.id===coupon.id){
                navigate("/choosephotoframe")
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }


    return (
        <div className="background-container" style={{backgroundImage:'url("'+bgurl+'")', display:"inherit",textAlign: "-webkit-center",paddingTop:'400px'}}>
            <div className='row'>
                <div className='col-2'/>
                <div className='col-8'>
                    <Form.Control type="text" placeholder="" value={field} readOnly size={'lg'} style={{height:"120px",backgroundColor:"orange",fontSize:'50px',color:'white',textAlign: "-webkit-center"}}/>
                </div>
            </div>
            <div className='row' style={{marginTop:'2rem'}}>
                <div className='col-4'>
                    <Image src={pathurl+"1.png"} onClick={()=>pressNum("1")} rounded />
                </div>
                <div className='col-4'>
                    <Image src={pathurl+"2.png"} onClick={()=>pressNum("2")} rounded />
                </div>
                <div className='col-4'>
                    <Image src={pathurl+"3.png"} onClick={()=>pressNum("3")} rounded />
                </div>
            </div>
            <div className='row' style={{marginTop:'2rem'}}>
                <div className='col-4'>
                    <Image src={pathurl+"4.png"} onClick={()=>pressNum("4")} rounded />
                </div>
                <div className='col-4'>
                    <Image src={pathurl+"5.png"} onClick={()=>pressNum("5")} rounded />
                </div>
                <div className='col-4'>
                    <Image src={pathurl+"6.png"} onClick={()=>pressNum("6")} rounded />
                </div>
            </div>
            <div className='row' style={{marginTop:'2rem'}}>
                <div className='col-4'>
                    <Image src={pathurl+"7.png"} onClick={()=>pressNum("7")} rounded />
                </div>
                <div className='col-4'>
                    <Image src={pathurl+"8.png"} onClick={()=>pressNum("8")} rounded />
                </div>
                <div className='col-4'>
                    <Image src={pathurl+"9.png"} onClick={()=>pressNum("9")} rounded />
                </div>
            </div>
            <div className='row' style={{marginTop:'2rem'}}>
                <div className='col-4'/>
                <div className='col-4'>
                    <Image src={pathurl+"0.png"} onClick={()=>pressNum("0")} rounded />
                </div>
            </div>
            <div className='row' style={{marginTop:'2rem'}}>
                <div style={{marginBottom: "5rem"}}>
                { loading?
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                    :
                    <div>
                        <Image src={buttonBackurl} onClick={()=>pressBack()} rounded />
                        {/* <Link to='/choosephotoframe'> */}
                        <Image src={buttonNexturl} onClick={()=>verifyCoupon()} rounded />
                        {/* </Link> */}
                    </div>
                }
                </div>
            </div>
        </div>
    )
}