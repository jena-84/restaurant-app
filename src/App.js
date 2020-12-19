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
  //const [markers,setMarkers]= React.useState([]);
  const [currentLocation, setCurrentLocation]= React.useState(null);
  //const [clickedMarker,setClickedMarker]= React.useState(null);
  const [clickedRest, setClickedRest] = React.useState(null);

  const [googleRestaurants, setGoogleRestaurants] = React.useState([]);
  const [localRestaurants, setLocalRestaurants] = React.useState([]);
  const [restaurants, setRestaurants] = React.useState([]);

  const addNewResto = (newResto)=> {

    console.log("This is to be added=> "+ newResto);

    setLocalRestaurants([...restaurants, newResto]);
    setRestaurants([...googleRestaurants, ...localRestaurants, newResto]);
    setCurrentLocation(null)
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
  const [min, setMin]= React.useState({minValue:'1'});
  const [max, setMax]= React.useState({maxValue:'5'}); 
  const handleMinChange = e => {
    setMin({minValue: e.target.value });
  };
  const handleMaxChange = e => {
    setMax({maxValue: e.target.value });
  };
// Add marker when click on map 
  const onMapClick = React.useCallback((event)=>{
    setCurrentLocation({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    })
  },[])

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
                lat: (restaurant.geometry.location.lat instanceof Function) ? restaurant.geometry.location.lat() : restaurant.geometry.location.lat,
                lng: (restaurant.geometry.location.lng instanceof Function) ? restaurant.geometry.location.lng() : restaurant.geometry.location.lng,
              }} 
              icon={{
                url: `./icon-restaurant.png`,
                origin: new window.google.maps.Point(0,0),
                scaledSize: new window.google.maps.Size(33,33),
                anchor: new window.google.maps.Point(10,10),  
              }} 
              onClick={()=>{setClickedRest(restaurant)}}
            />
          )} 
                        
          {clickedRest &&(
            <InfoWindow className="info-window"
              position={{
                lat: clickedRest.geometry.location.lat() ,
                lng: clickedRest.geometry.location.lng() ,
                }}
              onCloseClick={()=>{setClickedRest(null)}}
              >
              <div class="info" >
                <h5 class="info-header">{clickedRest.name}</h5>
                <div class="info-img">
                  <img
                    style={{ maxWidth: '100%', width: '100%', height: 'auto' }}
                    src={`https://maps.googleapis.com/maps/api/streetview?size=400x400&location=${clickedRest.geometry.location.lat()},${clickedRest.geometry.location.lng()}&fov=80&heading=70&pitch=0&key=${process.env.REACT_APP_API_KEY}`}
                  />
                </div>
                <div class="star-rating">
                  <StarRaing  ave={clickedRest.rating}/>
                </div>
                <div class ="info-vicinity">
                  <p>{clickedRest.vicinity}</p>
                </div>
              </div>
            </InfoWindow>
          )}
                 
          {currentLocation && (
            <InfoWindow 
              position={{
                lat: currentLocation.lat,
                lng: currentLocation.lng,
              }}
              onCloseClick={()=>{setCurrentLocation(null)}}
            >
              <div className="new-restaurant">
                <h4 className="new-Header">Add New Restaurant</h4>
                <ResForm lat={currentLocation.lat} lng={currentLocation.lng} addNewResto={addNewResto}></ResForm>
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