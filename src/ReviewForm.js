import React from 'react';
import {Modal,Button,Form} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";



export default function ReviewForm (props){

    const [show, setShow] = React.useState(false);
    const handleShow = () => setShow(true);
    const handleClose = ()=> setShow(false);
  
    
  const [text, setText]= React.useState([]);
  const [rating,setRating] = React.useState('');

  const submitRev =(e)=>{
    e.preventDefault();
    const newRev={
      place_id: Date.now(),
      text: text,
      rating: rating,
      }
      props.addNewReview(newRev)
      console.log(newRev)
      handleClose(e);
    }
  return(
    <div>
      <div
      className="d-flex align-items-center justify-content-center"
      style={{height: "10vh"}}
      >
      <Button variant="primary" onClick={handleShow}>Add a Review</Button>
      </div>
       <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add a Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         
        <Form onSubmit={submitRev} style={{padding:'15px', width:'300px'}}>
            <Form.Group >
              <Form.Label>Add your review!</Form.Label>
              <Form.Control size="lg"
              type="review"
              placeholder="Tell us about your experience" 
              value={text}
              name={text}
              onChange={(e)=>setText(e.target.value)}/>
             </Form.Group>

             <Form.Group >
              <Form.Label>Add your rating!</Form.Label>
              <Form.Control as="select" defaultValue="0" 
              type="resRating"
              placeholder="Add rating number 1,2...5" 
              value={rating}
              name={rating}
              onChange={(e)=>setRating(e.target.value)}>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              </Form.Control>
             </Form.Group>
             <Button variant="primary" type="submit" block>Add Review</Button>
             </Form>
       </Modal.Body>
       <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Cancel</Button>
       </Modal.Footer>
   </Modal>
 </div>               
    )
}