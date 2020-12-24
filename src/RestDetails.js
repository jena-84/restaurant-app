import React from 'react';
import {Modal,Button,Image, Row,Container} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import StarRating from './StarRating.js';



export default function RestDetails(props){

  const info= props.restaurants;

  const [show, setShow] = React.useState(false);
  const handleShow = () => setShow(true);
  const handleClose = ()=> setShow(false);
 
  return(
    <div>
       <div
          className="d-flex align-items-center justify-content-center"
         style={{height: "2vh", float:'right'}}
          >
      <Button variant="primary" size="sm" onClick={handleShow}>More Info</Button>
      </div>
       <Modal show={show} onHide={handleClose}>
        <Modal.Header >
          <Modal.Title textAlign='center'>{info.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Container>
          <Row>
             <Image src={`https://maps.googleapis.com/maps/api/streetview?size=200x200&location=${info.geometry.location.lat()},${info.geometry.location.lng()}&fov=80&heading=70&pitch=0&key=${process.env.REACT_APP_API_KEY}`}
                    roundedCircle />
          </Row>
          <Row>
            <h4>{info.vicinity}</h4>
            <StarRating ave={info.rating}></StarRating>
          </Row>

         
           <p> {info.website} </p>
      
        
        </Container>
       </Modal.Body>
       <Modal.Footer>
       </Modal.Footer>
       
       <Button variant="primary" size="md" type="submit" >Submit</Button>
     </Modal>
     </div>   
    )
}