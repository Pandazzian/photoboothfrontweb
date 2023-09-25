
import '../../App.css';
import {React,useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Image,Carousel } from 'react-bootstrap';
import  axios  from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setFrame } from '../../redux/Frame';
import { urls } from '../../app/api';

export function ChoosePhotoFrame({pathurl}) {

    const API_URL = urls.gql;
    const API_KEY = urls.apiSecretKey;

    const [data, setData] = useState(null);
    const selectedFrame = useSelector((state)=>state.frame)
    const dispatch = useDispatch();

    useEffect(() => {
        // Define your GraphQL query
        const query = `
        query MyQuery {
            listPhotoFrames {
              items {
                ImagePositions {
                  items {
                    height
                    id
                    photoframeID
                    width
                    xpos
                    ypos
                  }
                }
                id
                imageurl
                name
              }
            }
          }
        `;

        // Set up Axios config with the "x-api-key" header
        const axiosConfig = {
        headers: {
            'x-api-key': API_KEY,
            'Content-Type': 'application/json',
        },
        };

        // Make the GraphQL API request
        axios
        .post(API_URL, { query }, axiosConfig)
        .then((response) => {
            setData(response.data);
            dispatch(setFrame(response.data.data.listPhotoFrames.items[0]))
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }, []);

    let bgurl = pathurl+"frame_bg.png"

    let nextButtonUrl = pathurl+"frame_next.png"

    return (

        <div className="background-container" style={{backgroundImage:'url("'+bgurl+'")',textAlign:"center"}}>
            <div className='row'>
            <Carousel className='col-12 mb-3' style={{marginTop:"250px"}}>
                {data===null?<div></div>:data.data.listPhotoFrames.items.map( (frame) => (
                    <Carousel.Item key={frame.id} className='col-12' style={{textAlignLast:"center"}} >
                        <Image src={frame.imageurl} rounded onClick={()=>dispatch(setFrame(frame))}/>    
                        <Carousel.Caption>
                        <h3>{frame.name}</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                ))}
                </Carousel>
                <div className='col-12 mb-3 mt-3'>
                    {selectedFrame.frame===null?<div></div>:<Image className='col-12' src={selectedFrame.frame.payload.imageurl} rounded style={{width:"400px"}} />}                
                </div>
                <div className='ml-auto col-12 mr-auto mt-3' style={{marginBottom:"5rem"}}>
                    <Link to='/shoot'>
                        <Image src={nextButtonUrl} rounded />
                    </Link>
                </div>
            </div>
        </div>
    )
}