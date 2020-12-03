import React from 'react';
// import RestaurantReview from './RestaurantReview.js';
import RestaurantTable from './RestaurantTable.js';
import './style.css';
import { GoogleMap, LoadScript, Marker,InfoWindow } from '@react-google-maps/api';
import AddRes from './AddRes.js';

 
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

  //const [place, setPlace] = React.useState(null);
  const [restaurants, setRestaurants] = React.useState([]);

  const onLoad = React.useCallback(function callback(map) {
    
   const marker= new window.google.maps.Marker({
      position: center,
      map,
      title: "Current Location",
    });

    const service = new window.google.maps.places.PlacesService(map);

    
    map.addListener('idle', (e) => {
      const request = {
      location: map.getCenter(),
      radius: '1500',
      type: ['restaurant'],
    
      };
     service.nearbySearch(request, callback);
     })
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
          onClick={onMapClick}
        >
       
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
                  />)}
                  
                  {markers.map((marker,id)=> (
                    <Marker
                      key={id}
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
                      <div className="new-restaurant">
                         <h4 className="new-Header">Add New Restaurant</h4>
                         <AddRes></AddRes>
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
          
//  class App extends React.Component {
    
//   render(){
//     return (
//       <section>
//           <RestaurantReview ></RestaurantReview>
//       </section>
//       );
//     }
// }
    