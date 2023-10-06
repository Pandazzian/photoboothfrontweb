
import '../../App.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { Image,Carousel,Stack,Card } from 'react-bootstrap';
import { useState,useEffect } from "react"
import './filter.css';
import { useDispatch,useSelector } from 'react-redux';
import axios from 'axios';
import { urls } from '../../app/api';

export function ChooseFilter({pathurl}) {
    const [filterList, setFilterList] = useState([
        {
            img: pathurl+"filter1.png",
        },
        {
            img: pathurl+"filter2.png",
        },
        {
            img: pathurl+"filter3.png",
        }
    ]);
    let bgurl = pathurl+"filter_bg.png"
    let nextButtonUrl = pathurl+"filter_print.png"

    const capturedImages = useSelector((state) => state.Images);
    // capturedImages.images[0].payload
    const getImageFilter = async () => {
        // const encodedParams = new URLSearchParams();
        // encodedParams.set('q', 'English is hard, but detectably so');

        // const options = {
        // method: 'GET',
        // url: 'https://restcountries.com/v3.1/independent',
        // headers: {
        //     'status': 'true'
        // },
        // data: encodedParams,
        // };

        // try {
        //     const response = await axios.request(options);
        //     console.log(response.data);
        // } catch (error) {
        //     console.error(error);
        // }
    const query = {
        'image':capturedImages.images[0].payload
    }
    const axiosConfig = {
        headers: {
            // 'x-api-key': API_KEY,
            'Content-Type': 'application/json',
        },
        };
    axios.post(urls.aws,query,axiosConfig).then((res) => {
                console.log("RESPONSE RECEIVED: ", res);
            }).catch(()=>{
                console.log("catched")
            })
    }

    useEffect(() => {
        // Define your GraphQL query
        getImageFilter();
    }, []);

    return (
        <div className="background-container" style={{backgroundImage:'url("'+bgurl+'")',textAlign:"center"}}>
            <div className='row'>
                <Carousel className='col-12 ' style={{marginTop:"400px", marginBottom:"100px"}}
                    autoPlay={false}
                    interval={5000}
                    controls={true}
                    indicators={false}
                >
                    {filterList.map((filter)=>{
                        <Carousel.Item className='col-12' style={{textAlignLast:"center"}}>
                            <Card style={{width:"200px", height:"200px", borderColor:'transparent', backgroundColor:'transparent'}} ><Image style={{width:"200px"}} src={filter.img} rounded /></Card> 
                        </Carousel.Item>
                    })}
{/*                     
                    <Carousel.Item className='col-12' style={{textAlignLast:"center"}}>
                                <Stack
                                    direction="horizontal"
                                    className="h-100 justify-content-center align-items-center"
                                    gap={3}
                                        >
                                            <Card style={{width:"200px", height:"200px", borderColor:'transparent', backgroundColor:'transparent'}} ><Image style={{width:"200px"}} src={filterList[0]} rounded /></Card>
                                            <Card style={{width:"200px", height:"200px", borderColor:'transparent', backgroundColor:'transparent'}} ><Image style={{width:"200px"}} src={filterList[1]} rounded /></Card>
                                            <Card style={{width:"200px", height:"200px", borderColor:'transparent', backgroundColor:'transparent'}} ><Image style={{width:"200px"}} src={filterList[2]} rounded /></Card>    
                                </Stack>
                    </Carousel.Item> */}
                </Carousel>
                <div className='col-12 mb-3 mt-3'>
                    <Image className='col-12' src={capturedImages.images[0].payload} rounded style={{width:"400px"}} />
                </div>
                {/* <Image className='ml-auto mr-auto col-12' src={pathurl+"preview.png"} rounded width={300}/> */}
                <div className='ml-auto col-12 mr-auto mt-5' >
                    <Link to='/QR'>
                        <Image src={nextButtonUrl} rounded />
                    </Link>
                </div>
            </div>
        </div>
    )
}