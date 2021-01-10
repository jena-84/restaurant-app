import React from 'react';
import {Modal,Button, Container,Row,Col} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import StarRating from './StarRating.js';
import ReviewForm from './ReviewForm.js';


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

       <Modal show={show} onHide={handleClose} style={{ overflow:'scroll'}}>
       <Modal.Title id="contained-modal-title-vcenter">{info.name}</Modal.Title> 
       <Modal.Body>
        <Container>
           <Row>
              <Col md={6}>
               <h3>Location</h3>
               <p>{info.vicinity}</p>
               <h3>Total Rating:</h3>
               <StarRating ave={info.rating}></StarRating>
              </Col>  
              <Col md={6}>
              <img alt='googleImg' src={`https://maps.googleapis.com/maps/api/streetview?size=200x200&location=${info.geometry.location.lat()},${info.geometry.location.lng()}&fov=80&heading=70&pitch=0&key=${process.env.REACT_APP_API_KEY}`} />
              </Col> 
           </Row>
           <Row className='field'>
           <h3>Most helpful reviews</h3>
            <div className='review' >
                  {props.reviews.map(review =>{ 
                         return <div>
                                  <p className='single-review'>{review.text}</p>
                                  <StarRating ave={review.rating}></StarRating>   
                               </div>
                     })}
                     
             </div>
           </Row>
           </Container>
          </Modal.Body>
          <Modal.Footer>
          <ReviewForm addNewReview={props.addNewReview}></ReviewForm>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          </Modal.Footer>
         </Modal>
      
     </div>   
    )
}