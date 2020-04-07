import React, { useState, useEffect } from 'react';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

//import TextField from "@material-ui/core/TextField";

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
//import FormGroup from 'react-bootstrap/FormGroup'




const Home = () => {

    const left = { "textAlign": "left" }

    useEffect(() => {

        // fetchUsers();

    }, [])

    const [loading, setLoading] = useState(false);

    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        await fetch("http://localhost:3000/users").then(async (response) => {
            setUsers(await response.json())
            setLoading(false)
        })
            .catch((e) => {
                console.log(e);
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

    const columnDefs = [{
        headerName: "First Name", field: "firstName", sortable: true, filter: true
    }, {
        headerName: "Last Name", field: "lastName"
    }, {
        headerName: "E-mail", field: "email"
    }, {
        headerName: "Age", field: "age"
    }]


    // const rowData = [{
    //     make: "Toyota", model: "Celica", price: 35000
    // }, {
    //     make: "Ford", model: "Mondeo", price: 32000
    // }, {
    //     make: "Porsche", model: "Boxter", price: 72000
    // }]

    return (
        <div style={{
            padding: "5%",
            display: "flex",
            "flexDirection": "column",
            "alignItems": "center",
            "justifyContent": "center",
        }}>

            <Form style={{ "width": "40%" }} validated="false">

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
                    <Form.Control type="email"required placeholder="name@example.com" />
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
        // loading ? (
        //     <div>
        //         <h1>Loading...</h1>
        //     </div>
        // ) : (
        //         <div
        //             className="ag-theme-balham"
        //             style={{
        //                 height: '500px',
        //                 width: '60%'
        //             }}
        //         >
        //             <AgGridReact
        //                 columnDefs={columnDefs}
        //                 rowData={users}>
        //             </AgGridReact>
        //         </div>

        //     )

    );
}


export default Home;