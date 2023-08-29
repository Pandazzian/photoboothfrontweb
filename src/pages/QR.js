
import '../App.css';
import React from 'react';
import { Link } from 'react-router-dom';

export function QR({backgroundImageUrl}) {
    return (
        <div className="background-container" style={{backgroundImage:'url("'+backgroundImageUrl+'")'}}>
            <div className='row'>
                <div className='ml-auto col-4 mr-auto'>
                    <Link to='/'>
                        <button type="button" class="btn btn-primary">Next</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}