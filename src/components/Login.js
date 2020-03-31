import React, { useState } from 'react'
import { withRouter } from 'react-router-dom';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

function Login(props) {
    const errorStyle = {
        color: 'red'
    }

    const [user, setUser] = useState('user');
    const [pass, setpass] = useState('password');
    const [hasError, setHasError] = useState(false);

    function onChangeUser(e) {
        setUser(e.target.value);
    }

    function onChangePass(e) {
        setpass(e.target.value);
    }

    function onSubmit() {
        // e.preventDefault();

        setHasError(true);
        // sessionStorage.clear("login");

        // console.log(user);
        // console.log(pass);
        // console.log(props);


        if (user === "user" && pass === "password") {
            setHasError(false);

            // sessionStorage.setItem("login", "true");
            sessionStorage.setItem("logged", "1");
            props.handler();

            props.history.push("/");
        }

    }


    return (

        <div className="App">
            <div className="App-header">
                <div className="Login">
                    <TextField
                        variant="standard"
                        placeholder="Username"
                        margin="normal"
                        required
                        onChange={onChangeUser}
                        value={user}
                    />
                    <TextField
                        variant="standard"
                        placeholder="Password"
                        margin="normal"
                        required
                        type="password"
                        onChange={onChangePass}
                        value={pass}
                    />

                    <div className="Button">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                onSubmit();
                            }}
                        >
                            Log In
                        </Button>
                    </div>
                </div>
                {
                    hasError ? (<h4 style={errorStyle}>Invalid user or password!</h4>)
                        : (<div></div>)
                }
            </div>


        </div>

        // <div className="Login">
        //     <form onSubmit={onSubmit}>

        //         <label>User Name</label>
        //         <input type="text" value={user} onChange={onChangeUser} />

        //         <br />

        //         <label>Password</label>
        //         <input type="password" value={pass} onChange={onChangePass} />

        //         <br />

        //         <input type="submit" value="Log In" />

        //         {
        //             hasError ? (<h4>Invalid user or password!</h4>)
        //                 : (<div></div>)
        //         }


        //     </form>
        // </div>

    )

}


export default withRouter(Login);