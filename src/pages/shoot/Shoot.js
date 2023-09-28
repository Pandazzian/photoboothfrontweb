
import '../../App.css';
import { React, useRef,useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Image,Spinner } from 'react-bootstrap';
import Webcam from 'react-webcam';
import { addImage } from '../../redux/ImagesStore';
import { useDispatch,useSelector } from 'react-redux';
// import OpenCV from '../../components/opencvTest';
import openCV from 'react-opencvjs'


export function Shoot({pathurl}) {
    let bgurl = pathurl+"shoot_bg.png"
    let shootButtonUrl = pathurl+"shoot_button.png"

    
    
    //opencv code
    let [loadingCv,setLoadingCv] = useState(false)

    const captureVid = ()=>{
        let video = document.getElementById("videoInput")
        video.onplay = function() {
            var intervalPlay = setInterval(()=>{
                if(video.videoHeight>0){
                    // video.height = video.videoHeight
                    // video.width = video.videoWidth
                    video.height = 500
                    video.width = 500
                    console.log("interval cleared");

                    const canvas = document.getElementById("canvasOutput")

                    const vidStyleData = video.getBoundingClientRect();
                    // canvas.style.width = "1080"
                    // canvas.style.height = "500"
                    // canvas.style.left = vidStyleData.left+'px'
                    // canvas.style.top = vidStyleData.top+'px'
                    
                    clearInterval(intervalPlay)
                    window.streaming = true
                }

                console.log('Interval not cleared');

            },[10])
        }
        video.onpause = function() {
            console.log("video stopped");
            window.streaming = false
        }
        navigator.mediaDevices.getUserMedia({
            video:true,
            audio:false
        }).then(function(stream){
            video.srcObject = stream
            video.play()
            console.log(video.videoHeight,video.videoWidht);
        }).catch(function(err) {
            console.log(err);
        })
    }

    function processVideo() {
        console.log("clicked");
        let video = document.getElementById('videoInput');
        let src = loadingCv ? {} : new window.cv.Mat(video.height, video.width, window.cv.CV_8UC4);
        let dst = loadingCv ? {} : new window.cv.Mat(video.height, video.width, window.cv.CV_8UC1);
        let cap = loadingCv ? {} : new window.cv.VideoCapture(video);
        const FPS = 5;
        try {
            if (!window.streaming) {
                // clean and stop.
                src.delete();
                dst.delete();
                return;
            }
            let begin = Date.now();
            // start processing.
            cap.read(src);
            window.cv.cvtColor(src, dst, window.cv.COLOR_RGBA2GRAY);
            window.cv.imshow('canvasOutput', dst);
            // schedule the next one.
            let delay = 1000/FPS - (Date.now() - begin);
            setTimeout(processVideo, delay);
        } catch (err) {
            // window.utils.printError(err);
            console.log(err);
        }
    };

    const stopVideo = () =>{
        let video = document.getElementById("videoInput")
        video.onpause()
    }

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
    //edoc vcnepo

    

    const webcamRef = useRef(null);
    const dispatch = useDispatch();
    const capturedImages = useSelector((state) => state.Images);
    const selectedFrame = useSelector((state)=>state.frame)

    const capture = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        dispatch(addImage(imageSrc));
    };

    const log = () => {
        // let src = loadingCv ? {} : window.cv.imread('canvasInput')
        // console.log(src)
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
                {/* <div className='col-12 row' style={{paddingRight:"0px"}}>
                    <div className='col-1'></div>
                    <Webcam
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        className='col-10'
                    />
                    <div className='col-1'></div>
                </div> */}
                {/* <div className='row col-12' style={{backgroundImage:'url("'+selectedFrame.frame.payload.imageurl+'")', alignItems: "end"}}>
                    
                    {capturedImages.images.map((capturedImage,index)=>
                    <div style={{
                        width:`${selectedFrame.frame.payload.ImagePositions.items[index].width}px`,
                        height:`${selectedFrame.frame.payload.ImagePositions.items[index].height}px`,
                        right:`${selectedFrame.frame.payload.ImagePositions.items[index].xpos}px`,
                        bottom:`${selectedFrame.frame.payload.ImagePositions.items[index].ypos}px`}}>
                        <Image src={capturedImage.payload} alt="Captured" style={{width:"100%",height:"100%"}}/>
                    </div>
                    )}
                </div> */}
                <div className='col-12'>
                    <video id="videoInput" autoPlay width="100%" height="500"></video>
                </div>
                <div className='col-12'>
                    <canvas id="canvasOutput" width="100%" height="500"></canvas>
                </div>
                <button onClick={()=>captureVid()}>start</button>
                <button onClick={()=>processVideo()}>process</button>
                <button onClick={()=>stopVideo()}>stop</button>
                <div className='col-12 row' 
                // style={{marginTop:"600px"}}
                >
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