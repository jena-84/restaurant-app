import React from 'react';
//import './style.css';
//import {Marker} from '@react-google-maps/api';
import {Card} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

export default function  MoreDetails(){
return(

    <Card style={{ width: '20rem' }}>
  <Card.Body>
    <Card.Title>Card Title</Card.Title>
    <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
    <Card.Text>
      Some quick example text to build on the card title and make up the bulk of
      the card's content.
    </Card.Text>
    <Card.Link href="#">Card Link</Card.Link>
    <Card.Link href="#">Another Link</Card.Link>
  </Card.Body>
</Card>
)

}