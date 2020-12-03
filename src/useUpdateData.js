import {useState} from 'react';

  export default function useUpdateData(intialData){
    const [data, setData] = useState(intialData);
     
      function handleData(event){
        
        event.persist();
        
        setData(data => ({...data, [event.target.name]: event.target.value}));
        console.log(data)
        //setData(event.target.value)
      }
    return [data,handleData]
   };
