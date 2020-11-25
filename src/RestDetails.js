import React  from 'react';
import {Grid, Image,Segment, Button,Header, Placeholder } from 'semantic-ui-react' ;
import { useParams } from 'react-router-dom';
import StarRating from './StarRating.js';

export default function  RestDetails(props){
    const {id,name, vicinity,rating, icon} = useParams()
  
    

    return(
      <div style={{width:900 , padding:80}}>
   <Grid centered celled >
    <Grid.Row>
       <Grid.Column width={3}>
       <Image  src={icon} size='samll'/>
       </Grid.Column>
       <Grid.Column width={13}>
     <Header size='large'>{name}</Header>
     <Header size='small'>{vicinity}</Header>
     <Header size='small'>
       <StarRating ave={rating}/> </Header>
       </Grid.Column>
    </Grid.Row>
   
    <Grid.Row>
       <Grid.Column width={11}>
       <Placeholder style={{ height: 150, width: 150 }}>
         <Placeholder.Image />
        </Placeholder>
    <p>{id}</p>
        </Grid.Column>
        <Grid.Column width={5}>
          <Image src="" size='medium' circular/>
        </Grid.Column>
    </Grid.Row>

    <Grid.Row >
    <Grid.Column>
    <h3>See Reviews</h3>
       <Segment></Segment>
       <Segment></Segment>
       <Segment></Segment>
     </Grid.Column>
    </Grid.Row>
   
   <Grid.Row>
   <div>
    <Button content='Primary' primary />
    <Button content='Secondary' secondary />
  </div>
   </Grid.Row>

   </Grid>
   </div>
    )
};