import React from 'react'
import { Link } from 'react-router'

function Navbar() {
    return (
        <div>

            <Link to={"/"}> Home</Link>
            <br />
            <Link to={"/dashboard"}> Dashboard</Link>
            <br />
            <Link to={"/profile"}> Profile</Link>
            <br />


        </div>
    )
}

export default Navbar