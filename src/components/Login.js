import React, { useState } from 'react'
import { withRouter } from 'react-router-dom';

function Login(props) {


    const [user, setUser] = useState('user');
    const [pass, setpass] = useState('password');
    const [hasError, setHasError] = useState(false);

    function onChangeUser(e) {
        setUser(e.target.value);
    }

    function onChangePass(e) {
        setpass(e.target.value);
    }

    function onSubmit(e) {
        e.preventDefault();

        setHasError(true);
        // sessionStorage.clear("login");

        // console.log(user);
        // console.log(pass);
        // console.log(props);


        if (user === "user" && pass === "password") {
            setHasError(false);

            // sessionStorage.setItem("login", "true");

            props.handler();

            props.history.push("/");
        }

    }


    return (

        <div className="Login">
            <form onSubmit={onSubmit}>

                <label>User Name</label>
                <input type="text" value={user} onChange={onChangeUser} />

                <br />

                <label>Password</label>
                <input type="password" value={pass} onChange={onChangePass} />

                <br />

                <input type="submit" value="Log In" />

                {
                    hasError ? (<h4>Invalid user or password!</h4>)
                        : (<div></div>)
                }


            </form>
        </div>

    )

}


export default withRouter(Login);