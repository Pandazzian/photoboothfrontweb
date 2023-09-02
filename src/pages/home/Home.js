
import '../../App.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';

export function Home({pathurl}) {

    let bgurl = pathurl+"home_bg.png"
    let buttonurl = pathurl+"home_start.png"
    // bgurl = "https://media4.giphy.com/media/7AtHoQ9XWbpwLRxs0t/giphy.gif?cid=ecf05e472l552cavopbqvcdw7xiq7ybrv6dgfe0fqe52mxkd&ep=v1_gifs_search&rid=giphy.gif&ct=g"


    return (
        <div className="background-container" style={{backgroundImage:'url("'+bgurl+'")', alignItems: "end"}}>
            <div className='row'>
                <div className='ml-auto col-4 mr-auto' style={{marginBottom:"5rem"}}>
                    <Link to='/payment'>
                        <Image src={buttonurl} rounded />
                    </Link>
                </div>
            </div>
        </div>
    )
}