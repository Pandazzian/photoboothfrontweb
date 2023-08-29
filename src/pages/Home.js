
import '../App.css';
import React from 'react';
import { Link } from 'react-router-dom';

export function Home({backgroundImageUrl}) {
    return (

        <div className="background-container" style={{backgroundImage:'url("'+backgroundImageUrl+'")'}}>
            <div className='row'>
                <div className='ml-auto col-4 mr-auto'>
                    <Link to='/payment'>
                        <button type="button" class="btn btn-primary">Start</button>
                    </Link>
                </div>
            </div>
        </div>

        // <Container fixed>
        //     <div style = {{
        //         height: "auto",
        //         width: "100%",
        //         backgroundSize: "contain",
        //         backgroundRepeat: "no-repeat",
        //         backgroundImage:
        //         'url("https://png.pngtree.com/thumb_back/fh260/background/20211031/pngtree-abstract-bg-image_914283.png")',
        //     }}>
        //         <div>
        //             this is it
        //         </div>
        //     </div>
        // </Container>
    )
}