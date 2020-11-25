import React, { useEffect, useState } from 'react';
import GoogleApi from './GoogleApi.js';
import RestaurantTable from './RestaurantTable';
import axios from 'axios';
import './style.css';
import RestDetails from './RestDetails';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

//const api = axios.create(`http://localhost:3000/restaurantData.sjon/`);
export default function RestaurantReview() {

   const [restaurant, setRestaurant] = useState([]);

    useEffect(() => {
      axios.get(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=52.429859,-1.964820&radius=1300&type=restaurant&key=AIzaSyCjxuRk47EfgCJYQcF0DBkkiMEgXVstjzw`)
       
      .then(response=> {
       setRestaurant(response.data.results)
      }).catch((err)=> {alert('OoOoOps')})
      }, []);
      
      
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
        <Router>
             <section>
                <div className="row">
                <div className="col-md-12" id="nav-bar">
                  <h3><i className="fas fa-utensils"></i>Find Your Favourite Food</h3>
                    <div className="filter-content">
                      <label>Minimum rate: {min.minValue}</label>
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
                      <label>Maximum rate: {max.maxValue}</label>
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
                  </div>
                </div>
              </div>
              <Switch>
                <Route path="/" exact>
                  <GoogleApi  max={max.maxValue} min={min.minValue} restaurants={restaurant}/>
                  <RestaurantTable max={max.maxValue} min={min.minValue} restaurants={restaurant}/>
                </Route>
                <Route path="/restaurant/:id/:name/:vicinity/:rating/:icon"><RestDetails></RestDetails></Route>
              </Switch>
             </section>
          </Router>
        );
       
      }