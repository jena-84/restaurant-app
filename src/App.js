import React from 'react';
import RestaurantTable from './RestaurantTable.js';
import './style.css';
import {GoogleMap, LoadScript, Marker,InfoWindow } from '@react-google-maps/api';
import ResForm from './ResForm.js'
import StarRaing from './StarRating';
//import MoreDetails from './MoreDetails.js';




    const libraries = ["places"];
    const mapContainerStyle ={
      height: "125vh",
      width: "74vw",
    };
    const center= {
      lat: 52.429859,
      lng: -1.964820,
    };

export default function App () {
  const [map, setMap] = React.useState(null);
   //Add marker when Click on the map 
  const [markers,setMarkers]= React.useState([]);
  const [clickedMarker,setClickedMarker]= React.useState(null);
  const [clickedRest, setClickedRest] = React.useState(null);

  const [restaurants, setRestaurants] = React.useState([]);

  const addNewResto = ({newResto})=> {
    console.log("This is to be added=> "+ newResto);

    let cloneRestaurant = JSON.parse(JSON.stringify(restaurants));
    cloneRestaurant.push(newResto);
    setRestaurants(cloneRestaurant);
    // setRestaurants([...restaurants, newResto]);
  }
  
  //Loading Map
  const onLoad = React.useCallback(function callback(map) {
    const service = new window.google.maps.places.PlacesService(map);
    map.addListener('idle', (e) => {
      const request = {
      location:{
        lat: map.getCenter().lat(),
        lng: map.getCenter().lng(),
        }, 
      radius: '1500',
      type: ['restaurant'],
      };
     service.nearbySearch(request, callback);
     });

     function callback(results, status) {
       if (status === window.google.maps.places.PlacesServiceStatus.OK) {
       setRestaurants(results)
         }
      }
     setMap(map)
     setMap(service)
      }, [])

    const onUnmount = React.useCallback(function callback(map) {
      setMap(null)
      }, [])

    //Min ad Max ratings range
    const [min, setMin]= React.useState(
      {minValue:'1'});
    const [max, setMax]= React.useState(
      {maxValue:'5'}); 
    const handleMinChange = e => {
      setMin({minValue: e.target.value });
     };
    const handleMaxChange = e => {
      setMax({maxValue: e.target.value });
     };
// Add marker when click on map 
   const onMapClick = React.useCallback((event)=>{
      setMarkers( current => [...current, {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
      }])},[])

  return (
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
    <div className="column-left">
     <div id="map">
      <LoadScript
        googleMapsApiKey={process.env.REACT_APP_API_KEY}
        libraries={libraries}
      >
      <GoogleMap
          center={center}
          mapContainerStyle={mapContainerStyle}
          zoom={15}
          onLoad={onLoad}
          onUnmount={onUnmount}
          onRightClick={onMapClick}
          id="restaurant-id"
        >
          {/* Center Marker */}
        <Marker 
           position={center}
           title={'Current Location'}
          />
                    
          {/* Add Restaurants Markers */}
        {restaurants.map(restaurant => 
         <Marker
                 key={restaurant.place_id}
                 position={{
                     lat: restaurant.geometry.location.lat(), 
                     lng: restaurant.geometry.location.lng(),
                       }} 
                  icon={{
                        url: `./icon-restaurant.png`,
                        origin: new window.google.maps.Point(0,0),
                        scaledSize: new window.google.maps.Size(33,33),
                        anchor: new window.google.maps.Point(10,10),  
                        }} 
                        onClick={()=>{setClickedRest(restaurant)}}
           />)} 
                      
            {clickedRest &&(
                    <InfoWindow
                          position={{
                            lat: clickedRest.geometry.location.lat(), 
                            lng: clickedRest.geometry.location.lng(),
                            }}
                          onCloseClick={()=>{setClickedRest(null)}}
                          >
                        <div class="info-window" >
                          <h5 class="info-header">{clickedRest.name}</h5>
                          <div class="info-img">
                             <img 
                              src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=200&photoreference=CnRtAAAATLZNl354RwP_9UKbQ_5Psy40texXePv4oAlgP4qNEkdIrkyse7rPXYGd9D_Uj1rVsQdWT4oRz4QrYAJNpFX7rzqqMlZw2h2E2y5IKMUZ7ouD_SlcHxYq1yL4KbKUv3qtWgTK0A6QbGh87GB3sscrHRIQiG2RrmU_jF4tENr9wGS_YxoUSSDrYjWmrNfeEHSGSc3FyhNLlBU&key={process.env.REACT_APP_API_KEY}`}
                            />
                          </div>
                          <div class="star-rating">
                            <StarRaing  ave={clickedRest.rating}/>
                          </div>
                          <div><p>{clickedRest.vicinity}</p></div>
                        </div>
                   </InfoWindow>) 
                }
                 
              {markers.map((marker,id)=> (
                <Marker
                    key={id}
                    position={{ 
                      lat:marker.lat,
                      lng:marker.lng
                      }}
                    onClick={()=>{setClickedMarker(marker);
                    }}
                  />))}

               {clickedMarker && (
                <InfoWindow
                      position={{
                        lat: clickedMarker.lat,
                        lng: clickedMarker.lng,
                             }}
                      onCloseClick={()=>{setClickedMarker(null)}}
                   >
                      <div className="new-restaurant">
                         <h4 className="new-Header">Add New Restaurant</h4>
                              <ResForm lat={clickedMarker.lat} lng={clickedMarker.lng} addNewResto={addNewResto}></ResForm>
                        </div>    
                </InfoWindow> 
            )}
        </GoogleMap>
       </LoadScript>
      </div>
    </div>
        <RestaurantTable max={max.maxValue} min={min.minValue} restaurants={restaurants}/>
    </section>
  )  
      }