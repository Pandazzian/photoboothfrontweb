
import '../../App.css';
import { React, useRef,useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Image,Spinner } from 'react-bootstrap';
import Webcam from 'react-webcam';
import { addImage } from '../../redux/ImagesStore';
import { useDispatch,useSelector } from 'react-redux';
import openCV from 'react-opencvjs'


export function Shoot({pathurl}) {
    let bgurl = pathurl+"shoot_bg.png"
    let shootButtonUrl = pathurl+"shoot_button.png"

    let [loadingCv,setLoadingCv] = useState(true)
    

    useEffect(()=>{
        openCV({
          onLoaded: () => {
            console.log('open cv loaded')
            setLoadingCv(false)
        },
          onFailed: () => {
            console.log('open cv failed to load')
            setLoadingCv(false)
        },
          version: '4.5.1'
        })
      },[])

    const webcamRef = useRef(null);
    const dispatch = useDispatch();
    const capturedImages = useSelector((state) => state.Images);
    const selectedFrame = useSelector((state)=>state.frame)

    const capture = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        dispatch(addImage(imageSrc));
    };

    const log = () => {
        let src = loadingCv ? {} : window.cv.imread('canvasInput')
        console.log(src)
        console.log(selectedFrame.frame.payload.ImagePositions.items)
        console.log(capturedImages.images)
    }

    return (
        
        <div className="background-container" style={{backgroundImage:'url("'+bgurl+'")', alignItems: "end"}}>
            { loadingCv ? 
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner> 
            :
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

                <div className='row col-12' style={{backgroundImage:'url("'+selectedFrame.frame.payload.imageurl+'")', alignItems: "end"}}>
                    {/* <button onClick={()=>log()}>que?</button> */}
                    {capturedImages.images.map((capturedImage,index)=>
                    <div style={{
                        width:`${selectedFrame.frame.payload.ImagePositions.items[index].width}px`,
                        height:`${selectedFrame.frame.payload.ImagePositions.items[index].height}px`,
                        right:`${selectedFrame.frame.payload.ImagePositions.items[index].xpos}px`,
                        bottom:`${selectedFrame.frame.payload.ImagePositions.items[index].ypos}px`}}>
                        <Image src={capturedImage.payload} alt="Captured" style={{width:"100%",height:"100%"}}/>
                    </div>
                    )}
                </div>
                <button onClick={()=>log()}>que?</button>
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
        }
        </div>
    )
}