import React, { useState } from 'react';
import RestaurantTable from './RestaurantTable';
import StarRating from './StarRating.js';
//import { FaSearch } from 'react-icons/fa';


export default function Filters (props){
    
    
    const [min, setMin]= useState(
          {minValue:'1'});
    const [max, setMax]= useState(
         {maxValue:'5'}); 


    const handleMinChange = e => {
      setMin({minValue: e.target.value });
      };
    const handleMaxChange = e => {
      setMax({maxValue: e.target.value });
      };

        return( 
        <div className="filter-modal">

          <div className="filter-content">
           <h5>Choose Rating</h5>
          <label for="mini">Minimum Range</label>
          <input 
          onChange={handleMinChange }
          name="min"
          id="min-rating"
          type="range"
          min="1"
          max="5"
          step="0.1"
          value={min.minValue}
          />
          <label for="maxi">Maximum Range</label>
          <input 
          onChange={handleMaxChange}
          name="max"
          id="max-rating"
          type="range"
          min="1"
          max="5"
          step="0.1"
          value={max.maxValue}
          />
            {props.restaurants.map((res,index) => 

            res.rating >= min.minValue && 
            res.rating <= max.maxValue ?(<div>
                                           <li class="restaurant-wrapper">
                                               <div class=" col-sm-4" id="img-rapper">
                                                  <img src={res.icon}></img>
                                               </div>
                                    
                                               <div class=" col-sm-8" id="info-rapper">
                                                       <h5>{res.name}</h5>
                                                        <div class="reviw-stars-row">
                                                             <div class="reviews">
                                                               <StarRating ave={res.rating}/>
                                                            
                                                              </div>
                                                             <div class="total-ratings">
                                                               <p>({res.user_ratings_total} reviews)</p>
                                                            </div>
                                                          </div>
                                                       <div class="restaurant-address">
                                                        <p>{res.vicinity}</p>
                                                  </div>
                                               </div>
                                             </li>
                                          </div>
                                         ):(<div></div>))}
          
           </div> 
           </div>
      
       
        )
     }
