import React from 'react';
import {Modal,Button, Container,Row,Col,Form} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import StarRating from './StarRating.js';
import DisplayformRev from './DisplayformRev.js';



export default function RestDetails(props){

  const info= props.restaurants;

  const [show, setShow] = React.useState(false);
  const handleShow = () => setShow(true);
  const handleClose = ()=> setShow(false);

 
  const [addRev, setAddRev]= React.useState('');
  const [rating,setRating] = React.useState('');
  const [displayReviews,setDisplayReviews] = React.useState([])
 
  const addNewRev = (newRev)=>{
     setDisplayReviews([newRev])
     console.log(newRev)
  }
  

  const submitRev =(e)=>{
    e.preventDefault();

    const newRev={
      place_id: Date.now(),
      addRev: addRev,
      rating: rating,
      }
      addNewRev(newRev) 
    }

  return(
    <div>
       <div
         className="d-flex align-items-center justify-content-center"
         style={{height: "2vh", float:'right'}}
       >
      <Button variant="primary" size="sm" onClick={handleShow}>More Info</Button>
      </div>
       <Modal show={show} onHide={handleClose}>
       <Modal.Header closeButton >
        <Modal.Title id="contained-modal-title-vcenter">{info.name}</Modal.Title> 
       </Modal.Header>
       <Modal.Body>
         <Container>
           <Row>
             <Col md={6}>
               <h3>Address:</h3>
               <h5>{info.vicinity}</h5>
               <h3>Total Rating:</h3>
               <StarRating ave={info.rating}></StarRating>
               <DisplayformRev displayReviews={displayReviews}></DisplayformRev>
             </Col>  
             <Col md={6}>
               <img alt='googleImg' src={`https://maps.googleapis.com/maps/api/streetview?size=200x200&location=${info.geometry.location.lat()},${info.geometry.location.lng()}&fov=80&heading=70&pitch=0&key=${process.env.REACT_APP_API_KEY}`} />
             </Col>      
           </Row>
           <Row>
            <Form onSubmit={submitRev} style={{padding:'15px', width:'300px'}}>
            <Form.Group >
              <Form.Label>Add your review!</Form.Label>
              <Form.Control size="lg"
              type="rev"
              placeholder="Tell us about your experience" 
              value={addRev}
              name={addRev}
              onChange={(e)=>setAddRev(e.target.value)}/>
             </Form.Group>

             <Form.Group >
              <Form.Label>Add your rating!</Form.Label>
              <Form.Control as="select" defaultValue="0" 
              type="resRating"
              placeholder="Add rating number 1,2...5" 
              value={rating}
              name={rating}
              onChange={(e)=>setRating(e.target.value)}>
              <option>0</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              </Form.Control>
             </Form.Group>
             <Button variant="primary" type="submit" block>Add Review</Button>
            
             </Form>
           </Row>
          </Container>
          </Modal.Body>
          <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          </Modal.Footer>
         </Modal>
     </div>   
    )
}