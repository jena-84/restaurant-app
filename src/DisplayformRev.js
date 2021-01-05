import React from 'react';
import StarRaing from './StarRating';

export default function DisplayformRev(props){
 
    return (
        <div className='rating'>
            {(props.displayReviews).map((displayReview)=> 
              <div>
                <h5>Add your review</h5>
                <p>{displayReview.addRev}</p>
                <h5>Add your rating</h5>
                    <StarRaing ave={displayReview.rating}/>
              </div>)}
               
                    </div>
                
           )

}