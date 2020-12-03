import React,{useState} from 'react';
import {Modal, Header , Button} from 'semantic-ui-react' ;
import useUpdateData from './useUpdateData.js';


export default function AddRes(){

  const [open,setOpen]= React.useState(false)

  const [data,handleData]= useUpdateData({
      resName:'',
      phoneNum:'',
      address:'',
      resUrl:'',
   });

  /*const [resName,setResName]= useUpdateData('');
  const [phoneNum,setPhoneNum]= useUpdateData('');
  const [address,setAddress]= useUpdateData('');
  const [resUrl,setResUrl]= useUpdateData('');*/

  function handleSubmit(e,data){

    e.preventDefault();
   console.log(data)
   
  }

return (
    <Modal className="form"
     size= "small"
    onClose={()=> setOpen(false)}
    onOpen={()=>setOpen(true)}
    open={open}
    trigger={<Button>Add New Restaurant</Button>}
    >
    <Header>Add Restaurant</Header>
       <Modal.Description>
       <form  onSubmit={handleSubmit}>
          <fieldset>
             <label>Resataurant Name</label>
             <input onChange={handleData}
                         placeholder=' Pizza Pepper' name='resName' 
                         value={data.resName}/>
            </fieldset>
          <fieldset>
             <label>Phone Number</label>
             <input onChange={handleData}
                         placeholder='0121 473 5050' 
                         name="phoneNum" value={data.phoneNum}/> 
          </fieldset>
          <fieldset> 
          <label>Adrees</label>
             <input onChange={handleData} 
                         placeholder='766 Bristol Rd, Selly Oak, Birmingham'
                         value={data.address} name="address" />
          </fieldset>
          <fieldset>
               <label>Website</label>
              <input onChange={handleData}  
                         placeholder='pizzapeppersellyoak.com.uk'
                         name="setResUrl" value={data.resUrl}/> 
          </fieldset>
          <div>
            <button  type="cancel" onClick={() => setOpen(false)}>Cancel</button>
            <button  type="add" onClick={() => setOpen(false)}>Add</button>
          </div>
        </form>
       </Modal.Description>
    </Modal>
  )
}