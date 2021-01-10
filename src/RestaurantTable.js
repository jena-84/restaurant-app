import React from 'react';
import StarRating from './StarRating.js';
import ModalBox from './ModalBox.js';
//import {Modal,Button, Container,Row,Col,Form} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import RestDetails from './RestDetails.js';


export default function  RestaurantTable(props) {
    //const reducer = (accumulator, currentValue) => accumulator + currentValue.stars;
   //<StarRating ave={item.ratings.reduce(reducer,0)/item.ratings.length}/>
    
     
  /*const [show, setShow] = React.useState(false);
  const handleShow = () => setShow(true);
  const handleClose = ()=> setShow(false);
  const [addRev, setAddRev]= React.useState([]);
  const [displayReviews,setDisplayReviews] = React.useState([])
  const submitRev =(e)=>{
    e.preventDefault();
    const newRev={
      place_id: Date.now(),
      addRev: addRev,
          }
   setDisplayReviews(newRev)
   props.addNewReview(newRev)
   console.log(newRev)
       }*/

        return(
                <div className="column-right col-md-3"> 
                     <ul>
                      {(props.restaurants).map((item)=> 
                           props.min > props.max ? (<ModalBox></ModalBox>)
                             : item.rating >= props.min && 
                              item.rating <= props.max ? ( 
                            <div className = "row" key={item.place_id}>
                                    <li>
                                        < div className="restaurant-wrapper" >
                                             <div className=" col-sm-4" id="img-rapper">
                                                <img alt='googleImage' style={{ maxWidth: '100%', height: 'auto' }}
                                                  src={`https://maps.googleapis.com/maps/api/streetview?size=400x400&location=${item.geometry.location.lat()},${item.geometry.location.lng()}&fov=80&heading=70&pitch=0&key=${process.env.REACT_APP_API_KEY}`}
                                                />
                                             </div>
                                             <div className=" col-sm-8" id="info-rapper">
                                                <div id='info-name'><h5 key={item.place_id}>{item.name}</h5></div>
                                             <RestDetails restaurants={item} reviews={props.reviews} addNewReview={props.addNewReview}></RestDetails>
                                                 
  {/* <div className="d-flex align-items-center justify-content-center"
         style={{height: "2vh", float:'right'}}>
       <Button variant="primary" size="sm" onClick={handleShow}>More Info</Button>
       </div>
       <Modal show={show} onHide={handleClose}>
       <Modal.Header closeButton >
        <Modal.Title id="contained-modal-title-vcenter">{item.name}</Modal.Title> 
       </Modal.Header>
       <Modal.Body>
        <Container>
           <Row>
             <Col md={6}>
             {/*<Reviews reviews={reviews.current}  getGoogleReviews={getGoogleReviews}></Reviews>
               <h3>Address:</h3>
               <p>{item.vicinity}</p>
               <h3>Total Rating:</h3>
               <StarRating ave={item.rating}></StarRating>

               <div style={{ width: '200px', height:'200px', overflow:'scroll'}}>
                 {(props.reviews).map(review =>{return <p>{review.text}</p>})}
                   
                 <div className='new-review' >
                    <h5>Your review</h5>
                    <p>{displayReviews.addRev}</p>
                 </div>
               </div>
              </Col>  
              <Col md={6}>
               <img alt='googleImg' src={`https://maps.googleapis.com/maps/api/streetview?size=200x200&location=${item.geometry.location.lat()},${item.geometry.location.lng()}&fov=80&heading=70&pitch=0&key=${process.env.REACT_APP_API_KEY}`}></img>
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
             <Button variant="primary" type="submit" block>Add Review</Button>
            </Form>
           </Row>
           </Container>
          </Modal.Body>
          <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          </Modal.Footer>
                              </Modal>*/}
                                                  <div className="reviw-stars-row">
                                                         <div className="reviews">
                                                             <StarRating ave={item.rating}/>
                                                         </div>
                                                          <div className="total-ratings">
                                                            <p >({item.user_ratings_total} reviews)</p>
                                                         </div>
                                                     </div>
                                                     <div className="restaurant-address">
                                                        <p>{item.vicinity}</p>
                                                      </div>
                                                </div>
                                          </div>     
                                       </li>
                                  </div> ):(null))}
                           </ul>
                     </div>);
          };
