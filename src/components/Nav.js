import React from 'react';
import { Link } from 'react-router-dom'


function Nav(props) {

    const navStyle = {
        color: 'white',
        // textDecoration: 'none'
    }

    function logout() {
        props.handler()
    }

    return (

        <nav>
            <h3>Logo</h3>
            <ul className="nav-links">

                {/* <li>
                    <NavLink activeClassName={"active"} style={navStyle} to='/' exact>Home</NavLink>
                </li>

                <li>
                    <NavLink activeClassName={"active"} style={navStyle} to='/about'>About</NavLink>
                </li>

                <li>
                    <NavLink activeClassName={"active"} style={navStyle} to='/shop'>Shop</NavLink>
                </li> */}

                <Link to='/'>
                    <li style={navStyle}>Home</li>
                </Link>

                <Link to='/about'>
                    <li style={navStyle}>About</li>
                </Link>

                <Link to='/shop'>
                    <li style={navStyle}>Shop</li>
                </Link>

                <Link onClick={logout} to=''>
                    <li style={navStyle}>Logout</li>
                </Link>

                {/* <li onClick={logout}>Logout</li> */}

            </ul>


        </nav>
    )

}

export default Nav;