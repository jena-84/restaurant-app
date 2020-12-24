import React, { useState } from 'react';
import StarRating from './StarRating.js';
import ModalBox from './ModalBox.js';
//import {Link} from 'react-router-dom';
import RestDetails from './RestDetails.js';


export default function  RestaurantTable(props) {
    //const reducer = (accumulator, currentValue) => accumulator + currentValue.stars;
     //<StarRating ave={item.ratings.reduce(reducer,0)/item.ratings.length}/>
 
     
        return(    
                   <div className="column-right"> 
                     <ul>
                      {(props.restaurants).map((item)=> 
                           props.min > props.max ? (<ModalBox ></ModalBox>)
                             : item.rating >= props.min && 
                              item.rating <= props.max ? ( 
                            <div className = "row" >
                                    <li>
                                        < div className="restaurant-wrapper" >
                                             <div className=" col-sm-4" id="img-rapper">
                                                <img style={{ maxWidth: '100%', width: '100%', height: 'auto' }}
                                                  src={`https://maps.googleapis.com/maps/api/streetview?size=400x400&location=${item.geometry.location.lat()},${item.geometry.location.lng()}&fov=80&heading=70&pitch=0&key=${process.env.REACT_APP_API_KEY}`}
                                                />
                                             </div>
                                             <div className=" col-sm-8" id="info-rapper">
                                                 <h5  key={item.place_id}>{item.name}</h5>
                                                    <RestDetails restaurants={item}></RestDetails>
                                                
                                                 
                                                        <div className="reviw-stars-row">
                                                              <div className="reviews">
                                                                 <StarRating ave={item.rating}/>
                                                              </div>
                                                              <div className="total-ratings">
                                                                <p>({item.user_ratings_total} reviews)</p>
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
                           </div> 
                         );
    
                    };
