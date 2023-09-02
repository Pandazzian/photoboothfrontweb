
import '../../App.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';

export function QR({pathurl}) {
    let bgurl = pathurl+"qr_bg.png"
    let buttonurl = pathurl+"qr_next.png"
    return (
        <div className="background-container" style={{backgroundImage:'url("'+bgurl+'")', alignItems: "end"}}>
            <div className='row'>
                <div className='ml-auto col-4 mr-auto' style={{marginBottom:"5rem"}}>
                    <Link to='/'>
                        <Image src={buttonurl} rounded />
                    </Link>
                </div>
            </div>
        </div>
    )
}