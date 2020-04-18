import React from 'react'

import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Spinner from 'react-bootstrap/Spinner'

const Dialog = (props) => {

    return (

        <>

            <Modal show={props.showModal} onHide={props.onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{props.body}</Modal.Body>

                <Modal.Footer>

                    {
                        props.onAction ? (
                            props.requesting ? (
                                <>
                                    <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                    />
                                </>

                            ) : (
                                    <>
                                        <Button variant="success" onClick={props.onAction}>Yes</Button>
                                        <Button variant="danger" onClick={props.onClose}>No</Button>
                                    </>
                                )
                        ) : (
                                <Button variant="secondary" onClick={props.onClose}>Close</Button>
                            )
                    }

                </Modal.Footer>
            </Modal >

        </>
    )

}

export default Dialog
