import React,{useState} from 'react';
import {Modal,Button, Form} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";


export default function ResForm(props){

    const [show, setShow] = React.useState(false);
    const handleShow = () => setShow(true);
    const handleClose = ()=> setShow(false);
  
    const [name,setName] = useState('');
    const [vicinity,setVicinity] = useState('');
    const [resUrl,setResUrl] = useState('');
    const [number,setNumber] = useState('');

 const submitForm = (e) => {
    e.preventDefault();
    console.log(e.target)
    //console.dir(e.target[0].value)
    
    const newResto = {
      place_id: "432gregre",
      name: name,
      vicinity: vicinity,
      number: number,
      geometry:{
        location:{
          lat: props.lat,
          lng: props.lng
        }
      }
     
    }
    console.log(newResto)
    props.addNewResto({newResto});
    //setRestaurants([...restaurants, newResto]);
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
              type="resName"
              placeholder="Restaurant Name" 
              value={name}
              name={name}
              onChange={(e)=>setName(e.target.value)}/>
             </Form.Group>
      
            <Form.Group controlId="formBasicAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control 
              type="address" 
              placeholder="Address"
              value={vicinity}
              name={vicinity}
              onChange={(e)=>setVicinity(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formBasicUrl">
              <Form.Label>Restaurant Url</Form.Label>
              <Form.Control
              type="resUrl"
              placeholder="Restaurant Url"
              value={resUrl}
              name={resUrl}
              onChange={(e)=>setResUrl(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formBasicNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control 
              type="phoneNumber" 
              placeholder="Phone Number" 
              value={number}
              name={number}
              onChange={(e)=>setNumber(e.target.value)}/>
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