import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Redirect } from 'react-router-dom';

function Success() {
    const [show, setShow] = useState(true);
    const [navigate,setNavigate] = useState(false);
    const handleClose = () => {
        setShow(false)
        setNavigate(true)
    };
    /* Modal dialog style */
    const modalStyle = {
        position: 'absolute',
        top: '-17px',
        left: '47%',
        background: '#1abc9c',
        borderRadius: '50%',
        padding: '3px'
    }
    /* on click of ok  */
    if (navigate) {
        return <Redirect to="/stepone" push={true} />
    }
    return (
        <div>
            <>
                <Modal show={show} md="true" onHide={handleClose} animation={true}>
                    <div className="modal-header text-center">
                        <i style={modalStyle} className="fa fa-check fa-2x" aria-hidden="true"></i>
                        <h3 className="modal-title w-100">Success</h3>
                    </div>
                    <Modal.Body>A confirmation message has been sent to your Email. Kindly check that!</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" style={{ width: '100%' }} onClick={handleClose}>
                            Ok
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        </div>
    )
}
export default Success;
