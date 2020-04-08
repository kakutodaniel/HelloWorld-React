import React from 'react'

import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

const CompModal = (props) => {

    return (

        <>

            <Modal show={props.showModal} onHide={props.onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{props.body}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.onClose}>
                        Close
                            </Button>
                </Modal.Footer>
            </Modal>

            {/* {
                props.showModal ? (
                    <Modal show={true} onHide={props.onClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>{props.title}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>{props.body}</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={props.onClose}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>

                ) : (<div></div>)
            } */}

        </>
    )
}

export default CompModal;