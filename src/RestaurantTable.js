import React from 'react';
import StarRating from './StarRating.js';
import ModalBox from './ModalBox.js';
import "bootstrap/dist/css/bootstrap.css";
import RestDetails from './RestDetails.js';


export default function  RestaurantTable(props) {
        return(
              <ul className="list-group " style={{ "max-height": "calc(100vh - 76px)", "overflow": "auto" }}>
              {(props.restaurants).map((item)=> 
                    props.min > props.max ? (<ModalBox></ModalBox>)
                      : item.rating >= props.min && 
                      item.rating <= props.max ? ( 
                            <li className="list-group-item" key={item.place_id}>
                              <div className="container-fluid">
                                <div className="row">
                                  <div className="col-12 col-md-4" >
                                    <img alt='googleImage' className="img-fluid"
                                      src={`https://maps.googleapis.com/maps/api/streetview?size=250x250&location=${item.geometry.location.lat()},${item.geometry.location.lng()}&fov=80&heading=70&pitch=0&key=${process.env.REACT_APP_API_KEY}`}
                                    />
                                  </div>
                                  <div className="col-12 col-md-8" >
                                      <div className="d-flex">
                                        <h5 className="flex-grow-1">{item.name}</h5>
                                        <RestDetails restaurants={item} map={props.map}></RestDetails>
                                      </div>
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
                                </div>
                              </li>
                           ):(null))}
                    </ul>);
          };
