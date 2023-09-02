
import '../../App.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { Image,Carousel,Stack,Card } from 'react-bootstrap';
import { useState,useEffect } from "react"
import './filter.css';

export function ChooseFilter({pathurl}) {
    const [filterList, setFilterList] = useState([pathurl+"filter1.png", pathurl+"filter2.png", pathurl+"filter3.png"]);
    let bgurl = pathurl+"filter_bg.png"
    let nextButtonUrl = pathurl+"filter_print.png"

    // useEffect(() => {
    //     getFilterList()
    // });

    // const getFilterList = () => {
    //     setFilterList([pathurl+"filter1.png", pathurl+"filter2.png", pathurl+"filter3.png"])
    // }

    return (
        <div className="background-container" style={{backgroundImage:'url("'+bgurl+'")',textAlign:"center"}}>
            <div className='row'>
                <Carousel className='col-12 ' style={{marginTop:"400px", marginBottom:"100px"}}
                    autoPlay={false}
                    interval={5000}
                    controls={true}
                    indicators={false}
                 >
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
                    </Carousel.Item>
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
                    </Carousel.Item>
                    {
                        
                    }
                    {/* <Carousel.Item className='col-12' style={{textAlignLast:"center"}}>
                        <Image style={{width:"300px"}} src={pathurl+"filter1.png"} rounded />    
                        <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item style={{textAlignLast:"center"}}>
                    <Image style={{width:"400px"}} src={pathurl+"filter2.png"} rounded />
                        <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item style={{textAlignLast:"center"}}>
                    <Image style={{width:"400px"}} src={pathurl+"filter3.png"} rounded />
                        <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>
                            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                        </p>
                        </Carousel.Caption>
                    </Carousel.Item>*/}
                </Carousel>
                <div className='col-12 mb-3 mt-3'>
                    <Image className='col-12' src={pathurl+"preview.png"} rounded style={{width:"400px"}} />
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