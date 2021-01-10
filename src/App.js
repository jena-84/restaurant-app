import React from 'react';
import RestaurantTable from './RestaurantTable.js';
import './style.css';
import {GoogleMap, LoadScript, Marker,InfoWindow } from '@react-google-maps/api';
import ResForm from './ResForm.js'
import StarRaing from './StarRating';
import {Card} from "react-bootstrap";


    const libraries = ["places"];
    const mapContainerStyle ={
      height: "84vh",
      width: "63vw",
    };
    const center= {
      lat: 52.429859,
      lng: -1.964820,
    };

export default function App () {

  const [map, setMap] = React.useState(null);
   //Add marker when Click on the map 
  const [currentLocation, setCurrentLocation]= React.useState(null);
  const [clickedRest, setClickedRest] = React.useState(null);


  // Display Google reviews,new reviews,total reviews variables
  const [googleReviews, setGoogleReviews] = React.useState([]);
  const [localReviews, setLocalReviews] = React.useState([]);

  const reviews = React.useRef([])
  React.useEffect(()=>{
    //console.log(googleReviews)
    reviews.current = [...googleReviews,...localReviews];
  })

  const addNewReview = (newRev) =>{
     setLocalReviews([...localReviews,newRev])
     reviews.current =[...googleReviews,...localReviews,newRev]
     console.log(reviews.current)
  }

  // Adding restaurants(ByGoogle,NewRes, Total on map) variables
  const [googleRestaurants, setGoogleRestaurants] = React.useState([]);
  const [localRestaurants, setLocalRestaurants] = React.useState([]);
  
  const restaurants = React.useRef([])
  React.useEffect(()=>{
    //console.log(localRestaurants)
    //console.log(googleRestaurants)
  restaurants.current = [...googleRestaurants,...localRestaurants];
  })

  
  const addNewResto = (newResto)=> {
    //console.log(newResto);
    setLocalRestaurants([...localRestaurants, newResto]);
    restaurants.current= [...googleRestaurants,...localRestaurants,newResto];
    //console.log(restaurants)
   setCurrentLocation(null)
   
  }

  // Get Restaurants reviews
  function getGoogleReviews(place_id) {
    //console.log("map from getGoodleReviews",map)
    const request = {
      placeId: place_id,
      fields: ["review"],
    };
    map.getDetails(request, callback);

    function callback(results, status) {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
       // console.log(status,results.reviews)
       return  setGoogleReviews(results.reviews)
      }
    }}; 


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
        setGoogleRestaurants(results)
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
   
    <div className='container-xl'>
      <div className="row">
        <div className="col-md-12" id="nav-bar">
          <h3><i className="fas fa-utensils"></i>Find Your Favourite Food</h3>
            <div className="filter-content">
              <label>Low rate: {min.minValue}</label>
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
              <label>High rate: {max.maxValue}</label>
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
      <div className="row">
    <div className="column-left col-md-9">
     <div id="map">
  
      <LoadScript
        googleMapsApiKey={process.env.REACT_APP_API_KEY}
        libraries={libraries}
      >
      <GoogleMap
        center={center}
        mapContainerStyle={mapContainerStyle}
        zoom={14}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={onMapClick}
        id="restaurant-id"
      >
          {/* Center Marker */}
          <Marker 
            position={center}
            title={'Current Location'}
          />
                      
            {/* Add Restaurants Markers */}
          {restaurants.current.map(restaurant => 
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
              onClick={()=>{setClickedRest(restaurant)
                getGoogleReviews(restaurant.place_id)
            }}
            />
          )} 
            {/* Add Info Window to show restaurants details*/}          
          {clickedRest &&(
            <InfoWindow className="info-window"
              position={{
                lat: clickedRest.geometry.location.lat() ,
                lng: clickedRest.geometry.location.lng() ,
                }}
              onCloseClick={()=>{setClickedRest(null)}}
              >
              <div className="info" >
                <Card style={{ width: '20rem' }}>
                <img alt='googleImg' style={{ maxWidth: '90%', width: '70%', height: 'auto',float:'left'}}
                 src={`https://maps.googleapis.com/maps/api/streetview?size=300x300&location=${clickedRest.geometry.location.lat()},${clickedRest.geometry.location.lng()}&fov=80&heading=70&pitch=0&key=${process.env.REACT_APP_API_KEY}`}
                />
                 <Card.Body>
                 <Card.Title>{clickedRest.name}</Card.Title>
                 <Card.Text>
                 <h4 style={{margin:'0', padding:'0',color:'blue'}}>Location</h4>
                 <p style={{fontSize:'12px',fontWeight:'500',padding:'2px'}}>{clickedRest.vicinity}</p>

                 <h4 style={{padding:'0', margin:'0',color:'blue'}}>Rating </h4>
                 <StarRaing  ave={clickedRest.rating}/> 
                 {/*<RestDetails  reviews={reviews.current}  getGoogleReviews={getGoogleReviews} addNewReview={addNewReview}  restaurants={restaurants.current} ></RestDetails>*/}
               
                </Card.Text>
                </Card.Body>
                </Card>
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
                <h4>Add New Restaurant</h4>
                <div className='header'>
                <ResForm lat={currentLocation.lat} lng={currentLocation.lng} addNewResto={addNewResto}></ResForm>
                </div>
              </div>    
            </InfoWindow> 
          )}
        </GoogleMap>
       </LoadScript>
      </div>
    </div>
    <RestaurantTable max={max.maxValue} min={min.minValue} restaurants={restaurants.current} addNewResto={addNewResto}
       reviews={reviews.current}  addNewReview={addNewReview} />
    
     </div>
    </div>
  )  
}