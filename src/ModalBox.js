import React, {useState} from 'react';
import Modal from 'react-modal';


Modal.setAppElement('#root');
function ModalBox() {

    const [modalIsOpen, setModalIsOpen] = useState(false);
   
    return(
      <Modal 
            isOpen={!modalIsOpen}
            onRequestClose={() => setModalIsOpen(false)} 
           
            style={{
            overlay: {
            position: 'fixed',
            top: 160,
            left:560,
            right: 560,
            bottom: 160,
            padding:0,
            margin:0,
           },
           content: {
                position: 'absolute',
                top: '1px',
                left: '1px',
                right: '1px',
                bottom: '1px',
                border: '2px solid #ccc',
                background: '#fff',
                overflow: 'auto',
                WebkitOverflowScrolling: 'touch',
                borderRadius: '5px',
                outline: 'none',
                padding: '5px',
                backgroundColor: 'rgba(255, 255, 255, 0.75)'

              }    
            }}>
             <div>
              <h4>Minimum rate must be less</h4>
             <div>
              <button onClick={()=> setModalIsOpen(false) }>Close</button>
            </div>
            </div>
       </Modal>
    );
};
export default ModalBox;
