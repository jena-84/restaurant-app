import React, { useCallback, useEffect, useState } from 'react';
import StarRaing from './StarRating';

import { GoogleMap,
         useLoadScript,
         Marker,
         InfoWindow,} from '@react-google-maps/api';      

const libraries = ["places"];

const mapContainerStyle ={
    height: "125vh",
    width: "74vw",
 };
 const center= {
     lat: 52.429859,
     lng: -1.964820,
  }
  

 export default function GoogleApi(props) {

 
    const API_KEY = process.env.REACT_APP_API_KEY;
    const [selected, setSelected]= useState(null)
   
      // loading the  map
     const { isLoaded, loadError } = useLoadScript({
          googleMapsApiKey: API_KEY,
          libraries,
           });

       //Add marker when Click on the map 
        const [markers,setMarkers]=useState([]);
        const [clickedMarker,setClickedMarker]=useState(null);

        const onMapClick = useCallback((event)=>{
          // Get the modal
          var modal = document.getElementById("myModal");
          
          // Get the button that opens the modal
          //var btn = document.getElementById("myBtn");
          
          // Get the <span> element that closes the modal
          var span = document.getElementsByClassName("close")[0];
          
          // When the user clicks on the button, open the modal
          //btn.onclick = function() {
            modal.style.display = "block";
         // }
          
          // When the user clicks on <span> (x), close the modal
          span.onclick = function() {
            modal.style.display = "none";
          }
          
          // When the user clicks anywhere outside of the modal, close it
          window.onclick = function(event) {
            if (event.target == modal) {
              modal.style.display = "none";
            }
          } 
          setMarkers( current => [...current, {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
            }])},[])


         if(loadError) return "Error"
         if(!isLoaded) return "Loading ...."
         //Get the current position
        navigator.geolocation.getCurrentPosition(function(position) {
        // Then  the positioning coordinates.
        let coordinates = {
            lat: position.coords.latitude,
            lon:  position.coords.longitude,
             }  
           
         }, function() {
            alert('Oops! An error occurred.');
            }); 

        return (
              <div class="column-left">
                 <div id="map">
                
                  <GoogleMap
                     mapContainerStyle={mapContainerStyle}
                     center={center} 
                     zoom={15}
                     onClick={onMapClick}
                  
                    >
                      
                    <Marker 
                      position={center}
                    />
                    
                    {props.restaurants.map(restaurant => 
                       restaurant.rating >= props.min && 
                       restaurant.rating <= props.max ? ( 
                   
                        <Marker
                              key={restaurant.place_id}
                                position={{
                                lat: restaurant.geometry.location.lat, 
                                lng: restaurant.geometry.location.lng,
                                        }}
                              icon={{
                                url: `./icon-restaurant.png`,
                                    origin: new window.google.maps.Point(0,0),
                                    scaledSize: new window.google.maps.Size(40,40),
                                    anchor: new window.google.maps.Point(10,10),  
                                     }}
                              onClick = {()=>{setSelected(restaurant)}}
                                  />
                                 ):(null))
                     }

                    {selected && (
                        <InfoWindow
                          position={{
                            lat: selected.geometry.location.lat, 
                            lng: selected.geometry.location.lng,
                            }}
                          onCloseClick={()=>{setSelected(null)}}
                          >
                         <div class="info-window" >
                          <h5 class="info-header">{selected.name}</h5>
                          <div class="info-img">
                              <img 
                              src={`https://maps.googleapis.com/maps/api/streetview?size=148x110&location=${selected.geometry.location.lat},${selected.geometry.location.lng}
                               &fov=100&heading=280&pitch=-0.76
                               &key=AIzaSyCjxuRk47EfgCJYQcF0DBkkiMEgXVstjzw`}
                             />
                          </div>
                          <div class="star-rating">
                            <StarRaing  ave={selected.rating}/>

                          </div>
                          <div><p>{selected.vicinity}</p></div>
                         
                        </div>
                       </InfoWindow>)
                      } 


                    {markers.map((marker)=> (
                        <Marker
                          position={{ 
                            lat:marker.lat,
                            lng:marker.lng
                            }}
                          onClick={()=>{setClickedMarker(marker);
                          }}
                        />
                       ))}

                    {clickedMarker && (
                        <InfoWindow
                          position={{
                            lat: clickedMarker.lat,
                            lng: clickedMarker.lng,
                                 }}
                          onCloseClick={()=>{setClickedMarker(null)}}
                         >
                          <div class="new-restaurant">
                             <h2 class="new-Header">Add New Restaurant</h2>
                          </div>
                        </InfoWindow> 
                     )}

                        
                    </GoogleMap>
                   <div id="myModal" class="modal">
                   <div class="modal-content">
                   <span class="close">&times;</span>
                   <form action="action_page.php">
                  <input type="text" id="fname" name="firstname" placeholder="Your name.."/>

                  <label for="lname">Last Name</label>
                  <input type="text" id="lname" name="lastname" placeholder="Your last name.."/>

                  <label for="country">Country</label>
                  <select id="country" name="country">
                    <option value="australia">Australia</option>
                    <option value="canada">Canada</option>
                    <option value="usa">USA</option>
                  </select>

                  <label for="subject">Subject</label>
                  <textarea id="subject" name="subject" placeholder="Write something.." ></textarea>

                  <input type="submit" value="Submit"/>

                    </form>

                   </div>

                   </div>
             
                 </div>
              </div>
        )
    
    }