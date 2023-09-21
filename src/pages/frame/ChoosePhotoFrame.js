
import '../../App.css';
import {React,useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Image,Carousel } from 'react-bootstrap';
import  axios  from 'axios';

export function ChoosePhotoFrame({pathurl}) {

    const API_URL = 'https://wnoac7qyhveyfag42cigzz5xp4.appsync-api.ap-southeast-2.amazonaws.com/graphql';
    const API_KEY = 'da2-eh73rk5sznc7dmhy7xrw53ws2u';

    const [data, setData] = useState(null);

    const [selected, setSelected] = useState(null)


    const onClickFrame = (url) => {
        setSelected(url);
    }

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
                        <Image src={frame.imageurl} rounded onClick={()=>onClickFrame(frame.imageurl)}/>    
                        <Carousel.Caption>
                        <h3>{frame.name}</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                ))}
                {/* <Carousel.Item className='col-12' style={{textAlignLast:"center"}}>
                    <Image src="https://pbtgallery.com/gallery/15/4650.jpg" rounded />    
                    <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item> */}
                {/* <Carousel.Item style={{textAlignLast:"center"}}>
                <Image src="https://pbtgallery.com/gallery/15/4650.jpg" rounded />
                    <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item> */}
                {/* <Carousel.Item style={{textAlignLast:"center"}}>
                <Image src="https://pbtgallery.com/gallery/15/4650.jpg" rounded />
                    <Carousel.Caption>
                    <h3>Third slide label</h3>
                    <p>
                        Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                    </p>
                    </Carousel.Caption>
                </Carousel.Item> */}
                </Carousel>
                <div className='col-12 mb-3 mt-3'>
                    {selected===null?<div></div>:<Image className='col-12' src={selected} rounded style={{width:"400px"}} />}                
                </div>
                {/* <Image className='ml-auto mr-auto col-12' src="https://pbtgallery.com/gallery/15/4650.jpg" rounded width={300}/> */}
                <div className='ml-auto col-12 mr-auto mt-3' style={{marginBottom:"5rem"}}>
                    <Link to='/shoot'>
                        <Image src={nextButtonUrl} rounded />
                    </Link>
                </div>
            </div>
        </div>
    )
}