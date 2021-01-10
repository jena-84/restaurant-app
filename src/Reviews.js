import React from 'react';
import {Modal,Button} from "react-bootstrap";


export default function Reviews(props){
    const [show, setShow] = React.useState(false);
    const handleShow = () => setShow(true);
    const handleClose = ()=> setShow(false);
    return(
    <div>
       <div
         className="d-flex align-items-center justify-content-center"
         style={{height: "2vh", float:'right'}}>
         <Button variant="secondary" size="md" onClick={handleShow}>Read more</Button>
        </div>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton >
        <Modal.Title id="contained-modal-title-vcenter">Read some reviews</Modal.Title> 
        </Modal.Header>
        <Modal.Body>
         {props.reviews.map(review =>{ 
            return <p>{review.text}</p>
             })}
        </Modal.Body>        
         </Modal>
    </div>
        ) 
    };