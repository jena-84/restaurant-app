import React from 'react';
import { FaStar} from 'react-icons/fa';


export default function StarRating(props) {
    //const [rating,setRating]= useState(0);
    //const reducer = (accumulator, currentValue) => accumulator + currentValue.stars;
    const rating = props.ave;
  

     return (
      <div class="star">

         {[...Array(5)].map((star,i)=>{
          const ratingValue = i+1;

            return<FaStar 
            size={13}
            key={i}
            value={ratingValue}
            color={ratingValue <= rating? '#ffc107': '#e4e5e9'}
            ></FaStar>
         })}
        
     </div>
     )
};
