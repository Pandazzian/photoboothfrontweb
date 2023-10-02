
import '../../App.css';
import { React, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import Webcam from 'react-webcam';
import { addImage } from '../../redux/ImagesStore';
import { useDispatch,useSelector } from 'react-redux';
// import OpenCV from '../../components/opencvTest';


export function Shoot({pathurl}) {
    let bgurl = pathurl+"shoot_bg.png"
    let bgurl2 = pathurl+"shoot_bg2.png"
    let shootButtonUrl = pathurl+"shoot_button.png"
    let nextButtonUrl = pathurl+"shoot_next.png"
    
    
    
    const Ref = useRef(null);
    const [isCapturing,setIsCapturing] = useState(false)    
    const [timer, setTimer] = useState('00:00:00');
    const [enableNext,setEnableNext] = useState(false)
    const webcamRef = useRef(null);
    const dispatch = useDispatch();
    const capturedImages = useSelector((state) => state.Images);
    const selectedFrame = useSelector((state)=>state.frame)

    const getTimeRemaining = (e) => {
        const total = Date.parse(e) - Date.parse(new Date());
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const hours = Math.floor((total / 1000 / 60 / 60) % 24);
        return {
            total, hours, minutes, seconds
        };
    }
 
    const startTimer = (e) => {
        let { total, hours, minutes, seconds }
                    = getTimeRemaining(e);
        if (total >= 0) {
            setTimer(
                (hours > 9 ? hours : '0' + hours) + ':' +
                (minutes > 9 ? minutes : '0' + minutes) + ':'
                + (seconds > 9 ? seconds : '0' + seconds)
            )
            
        }
    }
    const getDeadTime = () => {
        let deadline = new Date();
        deadline.setSeconds(deadline.getSeconds() + 5);
        return deadline;
    }

    const clearTimer = (e,times) => {
        setTimer('00:00:05');
        const id = setInterval(() => {
            startTimer(e);
        }, 1000)
        setTimeout(() => {
            clearInterval(id)
            capture()
            if(times>1){
                clearTimer(getDeadTime(),times-1)
            }else{
                setEnableNext(true)
            }
        }, 5000);
        Ref.current = id;
    }

    const clickCapture = () => {
        setIsCapturing(true)
        clearTimer(getDeadTime(),selectedFrame.frame.payload.ImagePositions.items.length);
    }

    const capture = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        dispatch(addImage(imageSrc));
    };


    return (
        <div>
        { !isCapturing ?
        <div className="background-container" style={{backgroundImage:'url("'+bgurl+'")', alignItems: "end",overflow: 'hidden'}}>
            <div className='row'>
                <div className='col-12 row' style={{paddingRight:"0px"}}>
                    <div className='col-1'></div>
                    <Webcam
                        className='col-10'
                        audio={false}
                        ref={webcamRef}
                        width={'100%'}
                        height={910}
                        screenshotFormat="image/jpeg"
                        mirrored={true}
                        videoConstraints={{
                            width: 1440,
                            height: 1440,
                            facingMode: "user"
                          }}
                    />
                    <div className='col-1'></div>
                </div>
                <div className='row col-12' style={{marginBottom: "450px" ,alignItems: "end"}}>                 
                </div>
                <div className='col-12 row'>
                    <div className='col-4'></div>
                    <div className='ml-auto col-4 mr-auto' style={{marginBottom:"5rem"}}>
                        <Image id='button' src={shootButtonUrl} onClick={()=>clickCapture()} rounded />
                    </div>
                    <div className='col-4'></div>
                </div>
            </div>
        </div>
        :
        <div className="background-container" style={{backgroundImage:'url("'+bgurl2+'")', alignItems: "flex-start",overflow: 'hidden'}}>
            <div className='row' style={{marginTop:'100px'}}>
                <div className='col-12 row' style={{paddingRight:"0px"}}>
                    <div className='col-1'></div>
                    <Webcam
                        className='col-10'
                        audio={false}
                        ref={webcamRef}
                        width={'100%'}
                        height={910}
                        screenshotFormat="image/jpeg"
                        mirrored={true}
                        videoConstraints={{
                            width: 1440,
                            height: 1440,
                            facingMode: "user"
                          }}
                    />
                    <span style={{fontSize:'200px',color:'white',textAlign: '-webkit-center',transform:"translateY(-600px)" }} >{timer[timer.length-1]}</span>
                    <div className='col-1'></div>
                </div>
                <div className='row col-12' style={{alignItems: "end",transform:"translateY(-200px)"}}>
                    <div className='col-3'/>
                    {
                        capturedImages.images[0]? <Image className='col-3 p-4' src={capturedImages.images[0].payload}/> : <div className='col-3'/>
                    }
                    {
                        capturedImages.images[1]? <Image className='col-3 p-4' src={capturedImages.images[1].payload}/> : <div className='col-3'/>
                    }
                </div>
                <div className='row col-12' style={{alignItems: "end",transform:"translateY(-200px)"}}>
                    <div className='col-3'/>
                    {
                        capturedImages.images[2]? <Image className='col-3 p-4' src={capturedImages.images[2].payload}/> : <div className='col-3'/>
                    }
                    {
                        capturedImages.images[3]? <Image className='col-3 p-4' src={capturedImages.images[3].payload}/> : <div className='col-3'/>
                    }
                </div>
                {
                    enableNext?
                    <div className='row' style={{transform:"translateY(-150px)"}}>
                        <div className='col-4'/>
                        <Link className='col-4' to='/filter'>
                            <Image src={nextButtonUrl} rounded width={"100%"}/>
                        </Link>
                    </div>:
                    <div></div>
                }
            </div>
        </div>
        
        
    }
    </div>
    )
}