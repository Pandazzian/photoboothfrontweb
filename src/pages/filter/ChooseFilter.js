
import '../../App.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { Image,Carousel, } from 'react-bootstrap';

export function ChooseFilter({pathurl}) {

    let bgurl = pathurl+"filter_bg.png"
    let nextButtonUrl = pathurl+"filter_print.png"

    return (
        <div className="background-container" style={{backgroundImage:'url("'+bgurl+'")',textAlign:"center"}}>
            <div className='row'>
            <Carousel className='col-12 mb-3' style={{marginTop:"430px"}}>
                <Carousel.Item className='col-12' style={{textAlignLast:"center"}}>
                    <Image src="https://pbtgallery.com/gallery/15/4650.jpg" rounded />    
                    <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item style={{textAlignLast:"center"}}>
                <Image src="https://pbtgallery.com/gallery/15/4650.jpg" rounded />
                    <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item style={{textAlignLast:"center"}}>
                <Image src="https://pbtgallery.com/gallery/15/4650.jpg" rounded />
                    <Carousel.Caption>
                    <h3>Third slide label</h3>
                    <p>
                        Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                    </p>
                    </Carousel.Caption>
                </Carousel.Item>
                </Carousel>
                <div className='col-12 mb-3 mt-3'>
                    <Image className='col-12' src="https://pbtgallery.com/gallery/15/4650.jpg" rounded style={{width:"400px"}} />
                </div>
                {/* <Image className='ml-auto mr-auto col-12' src="https://pbtgallery.com/gallery/15/4650.jpg" rounded width={300}/> */}
                <div className='ml-auto col-12 mr-auto mt-3' >
                    <Link to='/QR'>
                        <Image src={nextButtonUrl} rounded />
                    </Link>
                </div>
            </div>
        </div>
    )
}