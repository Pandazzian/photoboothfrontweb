
import '../App.css';
import React from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios';
export function Payment({backgroundImageUrl}) {
    return (
        <div className="background-container" style={{backgroundImage:'url("'+backgroundImageUrl+'")'}}>
            <div className='row'>
                <div className='ml-auto col-4 mr-auto'>

                    

                    {/* <Link to='/choosephotoframe'>
                        <button type="button" class="btn btn-primary">Next</button>
                    </Link> */}
                </div>
            </div>
        </div>
    )
}