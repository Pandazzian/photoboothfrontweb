
import '../../App.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';

export function Shoot({pathurl}) {
    let bgurl = pathurl+"shoot_bg.png"
    let shootButtonUrl = pathurl+"shoot_button.png"
    return (
        <div className="background-container" style={{backgroundImage:'url("'+bgurl+'")', alignItems: "end"}}>
            <div className='row'>
                <div className='ml-auto col-4 mr-auto' style={{marginBottom:"5rem"}}>
                    <Link to='/filter'>
                        <Image src={shootButtonUrl} rounded />
                    </Link>
                </div>
            </div>
        </div>
    )
}