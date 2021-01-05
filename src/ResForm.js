import React,{useState} from 'react';
import {Modal,Button, Form} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";


export default function ResForm(props){

    const [show, setShow] = React.useState(false);
    const handleShow = () => setShow(true);
    const handleClose = ()=> setShow(false);
  
    const [name,setName] = useState('');
    const [vicinity,setVicinity] = useState('');
    const [rating,setRating] = useState('');
    const [reviews,setReviews] = useState('');


    const submitForm = (e) => {
    e.preventDefault();

    const newResto = {
      place_id: Date.now(),
      name: name,
      vicinity: vicinity,
      rating: rating,
      reviews: reviews,
      geometry:{
        location:{
          lat: ()=>props.lat,
          lng: ()=>props.lng
        }
      }
    }
    props.addNewResto(newResto);
    handleClose(e);
    }
    
     
  return(
    <div>
      <div
      className="d-flex align-items-center justify-content-center"
      style={{height: "10vh"}}
      >
      <Button variant="primary" onClick={handleShow}>Add New Restaurant</Button>
      </div>
       <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add new restaurant</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <Form onSubmit={submitForm}>
            <Form.Group controlId="formBasicName">
              <Form.Label>Restaurant Name</Form.Label>
              <Form.Control
              required
              type="resName"
              placeholder="Handmade burger" 
              value={name}
              name={name}
              onChange={(e)=>setName(e.target.value)}/>
             </Form.Group>
      
            <Form.Group controlId="formBasicAddress">
              <Form.Label>Location</Form.Label>
              <Form.Control 
              required
              type="address" 
              placeholder="Bristol Rd, Selly Oak B30"
              value={vicinity}
              name={vicinity}
              onChange={(e)=>setVicinity(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formBasicRating">
              <Form.Label>How many stars?</Form.Label>
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
               <option>5</option> </Form.Control>
             </Form.Group>

            <Form.Group controlId="formBasicReview">
              <Form.Label>Your review</Form.Label>
              <Form.Control
              type="addReview" 
              placeholder="Share your experience to help others!" 
              value={reviews}
              name={reviews}
              onChange={(e)=>setReviews(e.target.value)}/>
            </Form.Group>

            <Button variant="primary" type="submit" block>Submit</Button>
         </Form>
       </Modal.Body>
       <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Cancel</Button>
       </Modal.Footer>
   </Modal>
 </div>               
    )
}