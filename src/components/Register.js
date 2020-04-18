import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Dialog from './Dialog';
import Spinner from 'react-bootstrap/Spinner'
import { createRef } from 'react';


const Register = (props) => {

    useEffect(() => {

        setDisabled(false)

        if (props.match && props.match.params.id) {

            setDisabled(true)
            setTitle('Update a user')
            setId(props.match.params.id)

            const setUser = async () => {
                await fetch(`${api_base_url}/users/${props.match.params.id}`).then(async (response) => {

                    const data = await response.json();
                    setState(state => ({ ...state, ...data }));
                    setDisabled(false)

                })
                    .catch((e) => {
                        console.log(e);
                    })
            }

            setTimeout(() => {

                setUser()

            }, 2000);

        }
        else {

            setTitle('Register a new user')
            setState({ firstName: '', lastName: '', email: '' })
        }

    }, [props])

    const api_base_url = 'http://localhost:3000';

    const initialState = {
        firstName: "",
        lastName: "",
        email: ""
    };

    const [{ firstName, lastName, email }, setState] = useState(initialState);

    // const clearState = () => {
    //     //setState(state => ({ ...state, ...initialState }))
    //     setState({ ...initialState });
    // };

    const onChange = e => {

        // console.log(e.target.name);
        const { name, value } = e.target;
        setState(prevState => ({ ...prevState, [name]: value }));
    };

    // const [name, setName] = useState("")
    // const [lastName, setLastName] = useState("")
    // const [email, setEmail] = useState("")

    const [id, setId] = useState('')
    const [title, setTitle] = useState('')
    const [validated, setValidated] = useState(false)
    const [disabled, setDisabled] = useState(false)

    const [modalData, setModalData] = useState({
        showModal: false,
        // onClose: () => { setModalData({ ...modalData, showModal: false }) },
        //onClose: () => { hasError ? setModalData({ ...modalData, showModal: false }) : props.history.push('/') },
        onClose: null,
        title: '',
        body: ''
    })

    const wrapper = createRef()

    const requestOptions = {
        method: id !== '' ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            firstName,
            lastName,
            email,
            age: 1000,
            companyId: 1
        })
    };

    const saveData = async () => {

        let url = `${api_base_url}/users`;

        if (id !== '') {
            url += `/${id}`
        }

        await fetch(url, requestOptions)
            .then(async response => {

                const data = await response.json();
                // console.log(data);

                if (!response.ok) {

                    const error = (data && data.message) || response.status

                    return Promise.reject(error);

                    // console.log(data.message)
                }

                const bodyMessage = id !== '' ? 'User successfully updated' : 'User successfully registered';
                // setModalData({ ...modalData, showModal: true, title: 'Success', body: bodyMessage })
                setModalData({

                    showModal: true,
                    title: 'Success',
                    body: bodyMessage,
                    onClose: () => props.history.push('/')

                })

                // clearState();

            }).catch(error => {

                setModalData({

                    showModal: true,
                    title: 'Error',
                    body: error.message,
                    onClose: () => setModalData({ showModal: false })

                })


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

        saveData();

    }

    return (
        <>
            <h2 style={{ "paddingTop": "20px" }}>{title}</h2>
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
                        <Form.Control type="text" required placeholder="Insert you first name" minLength="3" value={firstName} name="firstName" onChange={onChange} />
                        <Form.Control.Feedback type="invalid">min length is 3</Form.Control.Feedback>
                        {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}

                    </Form.Group>

                    <Form.Group controlId="formBasicEmail" style={{ textAlign: "left" }}>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" required placeholder="Insert your last name" minLength="3" value={lastName} name="lastName" onChange={onChange} />
                        <Form.Control.Feedback type="invalid">min length is 3</Form.Control.Feedback>
                        {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail" style={{ textAlign: "left" }}>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" required placeholder="example@example.com" value={email} name="email" onChange={onChange} />
                        {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
                        <Form.Control.Feedback type="invalid">Provide a valid email</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail" style={{ textAlign: "left" }}>
                        <Button variant="primary" type="submit" disabled={disabled}>

                            {disabled ? (
                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />
                            )
                                : 'Submit'}
                        </Button>
                    </Form.Group>

                </Form>

            </div>

            <div ref={wrapper}>

                <Dialog {...modalData} />

            </div>

        </>

    );
}


export default withRouter(Register);