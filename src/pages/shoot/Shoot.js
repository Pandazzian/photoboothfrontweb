
import '../../App.css';
import { React, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import Webcam from 'react-webcam';
import { addImage } from '../../redux/ImagesStore';
import { useDispatch,useSelector } from 'react-redux';

export function Shoot({pathurl}) {
    let bgurl = pathurl+"shoot_bg.png"
    let shootButtonUrl = pathurl+"shoot_button.png"

    const webcamRef = useRef(null);
    const dispatch = useDispatch();
    // const capturedImage = useSelector((state) => state.Images);

    const capture = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        dispatch(addImage(imageSrc));
    };

    return (
        <div className="background-container" style={{backgroundImage:'url("'+bgurl+'")', alignItems: "end"}}>
            <div className='row'>
                <div className='col-12 row' style={{paddingRight:"0px"}}>
                    <div className='col-1'></div>
                    <Webcam
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        className='col-10'
                    />
                    <div className='col-1'></div>
                </div>

                {/* <div className='col-12 row'>
                    <div className='col-4'></div>
                    <button className='col-4' onClick={capture}>Capture Image</button>
                    <div className='col-4'></div>
                </div> */}

                <div className='col-12 row' style={{marginTop:"600px"}}>
                    <div className='col-4'></div>
                    <div className='ml-auto col-4 mr-auto' style={{marginBottom:"5rem"}}>
                        {/* <Link to='/filter'> */}
                            <Image src={shootButtonUrl} onClick={capture} rounded />
                        {/* </Link> */}
                    </div>
                    <div className='col-4'></div>
                </div>
            </div>
        </div>
    )
}