import React from 'react';
import Modal from 'react-modal';


//Modal.setAppElement('#root');

 export default function Modal() {
    const[modalIsOpen, setModalIsOpen] = useState(true);

    return(
        <div isOpen={modalIsOpen}
         style={{
          overlay: {
            position: 'fixed',
            top: 160,
            left:560,
            right: 560,
            bottom: 160,
            padding:0,
            margin:0,
            border: '1px solid #ccc',
            backgroundColor: 'rgba(255, 255, 255, 0.75)'
            }}}
           onRequestClose={()=> setModalIsOpen(false)} >
          <h1>Hello</h1>
        <div>
        <button onClick={()=> setModalIsOpen(false)}>Close</button>
        </div>
       </div>
    
    );

};
