import React, { useState } from 'react';

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import CompModal from './CompModal';
import { createRef } from 'react';


const Register = () => {
    
    const initialState = {
        name: "",
        lastName: "",
        email: ""
    };

    const [{ name, lastName, email }, setState] = useState(initialState);

    const clearState = () => {
        setState({ ...initialState });
    };

    const onChange = e => {
        // console.log(e.target.name);
        const { name, value } = e.target;
        setState(prevState => ({ ...prevState, [name]: value }));
    };

    // const [name, setName] = useState("")
    // const [lastName, setLastName] = useState("")
    // const [email, setEmail] = useState("")


    const [validated, setValidated] = useState(false)
    const [disabled, setDisabled] = useState(false)

    const [modalData, setModalData] = useState({
        showModal: false,
        onClose: () => { setModalData({ ...modalData, showModal: false }) },
        title: '',
        body: ''
    })

    const wrapper = createRef()

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            firstName: name,
            lastName,
            email,
            age: 1000,
            companyId: 1
        })
    };

    const postData = async () => {

        await fetch('http://localhost:3000/users', requestOptions)
            .then(async response => {

                const data = await response.json();
                // console.log(data);

                if (!response.ok) {

                    const error = (data && data.message) || response.status

                    return Promise.reject(error);

                    // console.log(data.message)
                }

                setModalData({ ...modalData, showModal: true, title: 'Success', body: 'User successfully registered' })

                clearState();

            }).catch(error => {

                console.log(error)

                setModalData({ ...modalData, showModal: true, title: 'Error', body: error.message })

            }).finally(() => {

                setDisabled(false)
                setValidated(false);

            })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        setDisabled(true)

        const form = e.currentTarget;

        if (form.checkValidity() === false) {

            setDisabled(false)

            setValidated(true)

            e.stopPropagation();

            return;
        }

        postData();

    }

    return (
        <>
            <h2 style={{ "paddingTop": "20px" }}>Register a new user</h2>
            <div style={{
                padding: "3%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}>
                <Form style={{ "width": "40%" }} noValidate validated={validated} onSubmit={handleSubmit}>

                    <Form.Group controlId="formBasicEmail" style={{ textAlign: "left" }}>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" required placeholder="John" minLength="3" value={name} name="name" onChange={onChange} />
                        <Form.Control.Feedback type="invalid">min length is 3</Form.Control.Feedback>
                        {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}

                    </Form.Group>

                    <Form.Group controlId="formBasicEmail" style={{ textAlign: "left" }}>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" required placeholder="Stuart" minLength="3" value={lastName} name="lastName" onChange={onChange} />
                        <Form.Control.Feedback type="invalid">min length is 3</Form.Control.Feedback>
                        {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail" style={{ textAlign: "left" }}>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" required placeholder="name@example.com" value={email} name="email" onChange={onChange} />
                        {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
                        <Form.Control.Feedback type="invalid">Provide a valid email</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail" style={{ textAlign: "left" }}>
                        <Button variant="primary" type="submit" disabled={disabled}>
                            {disabled ? 'Wait ...' : 'Submit'}
                        </Button>
                    </Form.Group>


                </Form>

            </div>

            <div ref={wrapper}>

                <CompModal {...modalData} />

            </div>

        </>

    );
}


export default Register;