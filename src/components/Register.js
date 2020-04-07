import React, { useState, useEffect } from 'react';

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

const Register = () => {

    const left = { "textAlign": "left" }

    const [validated, setValidated] = useState(false);

    const handleSubmit = (e) => {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }

        setValidated(true);
    }

    return (
        <div style={{
            padding: "5%",
            display: "flex",
            "flexDirection": "column",
            "alignItems": "center",
            "justifyContent": "center",
        }}>

            <Form style={{ "width": "40%" }} noValidate validated={validated} onSubmit={handleSubmit}>

                <Form.Group controlId="formBasicEmail" style={left}>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" required placeholder="John" />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>

                </Form.Group>

                <Form.Group controlId="formBasicEmail" style={left}>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" required placeholder="Stuart" />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formBasicEmail" style={left}>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" required placeholder="name@example.com" />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">Provide a valid email</Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formBasicEmail" style={left}>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form.Group>


            </Form>

        </div>

    );
}


export default Register;