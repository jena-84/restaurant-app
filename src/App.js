import React from 'react';
import axios from 'axios';
// import RestaurantReview from './RestaurantReview.js';
import './style.css'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
//import { defaultLoadScriptProps } from '@react-google-maps/api/dist/LoadScript';
 
    const libraries = ["places"];

    const mapContainerStyle ={
      height: "125vh",
      width: "74vw",
    };
    const center= {
      lat: 52.429859,
      lng: -1.964820,
    }

export default function App () {

  //const [map, setMap] = React.useState(null);
  //const [place, setPlace] = React.useState(null);
  const [restaurants, setRestaurants] = React.useState([]);
 
   
  React.useEffect(() => {
    axios.get(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=52.429859,-1.964820&radius=1300&type=restaurant&key=AIzaSyCjxuRk47EfgCJYQcF0DBkkiMEgXVstjzw`)
     
    .then(response=> {
     setRestaurants(response.data.results)
    }).catch((err)=> {alert('OoOoOps')})
    }, []);
  
  /*const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds();

        const service = new window.google.maps.places.PlacesService(map);

        map.addListener('idle', (e) => {
        const request = {
        location: map.getCenter(),
        radius: '1500',
        type: ['restaurant']
        };
    
       service.nearbySearch(request, callback);
      })

    /*function callback(results, status) {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        setRestaurants(results)
      }
    }
    map.fitBounds(bounds);
    setMap(map)
    setMap(service)
  }, [])
 
  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])*/

  return (
    <div className="column-left">
    <div id="map">
    <LoadScript
       googleMapsApiKey={process.env.REACT_APP_API_KEY}
       libraries= {libraries}
      >
      <GoogleMap
          center={center}
          mapContainerStyle={mapContainerStyle}
          zoom={14}
            //onLoad={onLoad}
            //onUnmount={onUnmount}
              >
           <Marker
            position={center}
            />
          {restaurants.map(restaurant => 
              <Marker
                key={restaurant.place_id}
                position={{
                  lat: restaurant.geometry.location.lat, 
                  lng: restaurant.geometry.location.lng,
                }}
              />
            )}
      </GoogleMap>
      </LoadScript>
    </div>
    </div>
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
    