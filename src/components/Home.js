import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import Spinner from 'react-bootstrap/Spinner'
import Dialog from './Dialog';


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

    const fetchUsers = async () => {
        await fetch("http://localhost:3000/users").then(async (response) => {

            setUsers(await response.json())
            // setLoading(false)
        })
            .catch((e) => {

                setModalData({

                    showModal: true,
                    title: 'Error',
                    body: `${e.message}. Please check out if Json-Server is running.`,
                    onClose: () => setModalData({ showModal: false }),
                    // onAction: () => { setModalData({ showModal: false }) }
                })

                console.log(e);
            })
            .finally(() => {

                setLoading(false)

            })
        // .then(async (r) => {
        //     console.log(await r.json());
        // })
        //setUsers(await data.json());
    }

    // const fetchUsers = async () => {
    //     const data = await fetch("http://localhost:3000/users");
    //     setUsers(await data.json());
    // }

    const removeHandle = (id) => {

        setModalData({

            showModal: true,
            title: 'Delete',
            body: `Do you want to delete the record '${id}' ?`,
            onClose: () => setModalData({ showModal: false }),
            onAction: () => setModalData({ showModal: false })

        })

    }

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
                                                <Button style={{ width: "60%" }} variant="danger" onClick={() => removeHandle(item.id)}>
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

            <Dialog {...modalData} />
        </>

    );
}


export default Home;
