import React,{useState} from 'react';
import Modal from 'react-modal';




Modal.setAppElement('#root');
function ModalBox() {

    const [isOpen, setIsOpen] = useState(true);

    function toggleModal(){ 
      setIsOpen(!isOpen);
      }
    return(
      <div>
      <Modal 
            isOpen={isOpen}
            onRequestClose={toggleModal} 
            closeTimeoutMS={500}
            style={{
            overlay: {
            top: 240,
            left:550,
            right:550,
            bottom: 260,
            padding:0,
            margin: 0,
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
             
            <div className='modal-inside'>
              <h4>** Low rate must be less than high rate**</h4>
            </div>
       </Modal>
       </div>
    );
 };
export default ModalBox;
