import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import Spinner from 'react-bootstrap/Spinner'
import Dialog from './Dialog';

import { getUsers, deleteById } from '../services/userService.js'


const Home = () => {

    useEffect(() => {

        setTimeout(() => {

            fetchUsers();

        }, 2000);

    }, [])

    const [modalData, setModalData] = useState({

        showModal: false,
        onClose: null,
        onAction: null,
        title: '',
        body: ''
    })

    const [loading, setLoading] = useState(true);

    const [users, setUsers] = useState([]);

    const [requesting, setRequesting] = useState(false)

    // const fetchUsers = userService.get();

    const fetchUsers = async () => {

        const result = await getUsers();

        if (result.ok) {

            setUsers(await result.json())

        }
        else {

            ShowModal(true, 'Error', `${result}. Please check out if Json-Server is running.`,
                () => setModalData({ showModal: false }), null);
        }

        setLoading(false)

    }
    // {
    //     await fetch("http://localhost:3000/users").then(async (response) => {

    //         setUsers(await response.json())
    //         // setLoading(false)
    //     })
    //         .catch((e) => {

    //             setModalData({

    //                 showModal: true,
    //                 title: 'Error',
    //                 body: `${e.message}. Please check out if Json-Server is running.`,
    //                 onClose: () => setModalData({ showModal: false }),
    //                 // onAction: () => { setModalData({ showModal: false }) }
    //             })

    //             console.log(e);
    //         })
    //         .finally(() => {

    //             setLoading(false)

    //         })
    //     // .then(async (r) => {
    //     //     console.log(await r.json());
    //     // })
    //     //setUsers(await data.json());
    // }

    // const fetchUsers = async () => {
    //     const data = await fetch("http://localhost:3000/users");
    //     setUsers(await data.json());
    // }

    const removeHandle = (id, firstName, lastName) => {

        ShowModal(true, 'Delete', `Are you sure you want to delete '${firstName} ${lastName}' ?`,
            () => setModalData({ showModal: false }),
            () => {

                setRequesting(true);

                setTimeout(() => {

                    deleteUser(id)

                }, 2000);
            });

    }

    const deleteUser = async (id) => {

        const result = await deleteById(id);

        if (result.ok) {

            ShowModal(true, 'Success', 'User successfully deleted', () => window.location.reload(), null)

        }
        else {

            let msg = result;

            if (result.status && result.status === 404) {
                msg = 'User not found!'
            }

            ShowModal(true, 'Error', msg, () => setModalData({ showModal: false }), null)

        }

        setRequesting(false);
    }

    const ShowModal = (show, title, body, onClose, onAction) => {

        setModalData({

            showModal: show,
            title: title,
            body: body,
            onClose: onClose,
            onAction: onAction

        })

    }

    // const deleteUser = async (id) => {



    //     await fetch(`http://localhost:3000/users/${id}`,
    //         {
    //             method: 'DELETE',
    //             headers: { 'Content-Type': 'application/json' }

    //         }).then(async (response) => {

    //             const data = await response.json();

    //             if (!response.ok) {

    //                 const error = (data && data.message) || response.status

    //                 return Promise.reject(error);

    //                 // console.log(data.message)
    //             }

    //             setModalData({

    //                 showModal: true,
    //                 title: 'Success',
    //                 body: 'User successfully deleted',
    //                 onClose: () => window.location.reload(), // setModalData({ showModal: false }),
    //                 onAction: null

    //             })

    //             // window.location.reload();

    //         })
    //         .catch((e) => {

    //             const msg = e === 404
    //                 ? 'User not found!'
    //                 : typeof (e) === 'object'
    //                     ? `${e.message}. Please check out if Json-Server is running.`
    //                     : e

    //             setModalData({

    //                 showModal: true,
    //                 title: 'Error',
    //                 body: msg,
    //                 onClose: () => setModalData({ showModal: false }),
    //                 onAction: null

    //             })

    //             // console.log(e);
    //             // console.log('catch');

    //         })
    // }

    return (
        <>

            <h2 style={{ "paddingTop": "20px" }}>Users list</h2>
            <div style={{
                padding: "3%",
                // width: "90%"
            }}>
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            loading ? (
                                <tr>
                                    <td colSpan="6">

                                        <Spinner animation="border" variant="info" />

                                    </td>
                                </tr>

                            ) : (
                                    users.map((item, idx) => (
                                        <tr key={item.id}>
                                            <td>{idx + 1}</td>
                                            <td>{item.firstName}</td>
                                            <td>{item.lastName}</td>
                                            <td>{item.email}</td>
                                            <td>
                                                <Link to={`/register/${item.id}`}>
                                                    <Button style={{ width: "85%" }} variant="success">
                                                        Edit
                                                    </Button>
                                                </Link>
                                            </td>
                                            <td>
                                                <Button style={{ width: "60%" }} variant="danger" onClick={() => removeHandle(item.id, item.firstName, item.lastName)}>
                                                    Remove
                                                </Button>
                                            </td>
                                        </tr>

                                    ))

                                )
                        }

                    </tbody>
                </Table>

            </div>

            <Dialog {...modalData} requesting={requesting} />
        </>

    );
}


export default Home;
