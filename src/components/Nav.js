import React from 'react';
import { Link, NavLink } from 'react-router-dom'


function Nav() {

    const navStyle = {
        color: 'white',
        // textDecoration: 'none'
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




            </ul>


        </nav>
    )

}

export default Nav;