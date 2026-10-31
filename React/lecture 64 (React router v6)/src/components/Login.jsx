import React from 'react'

import {useNavigate} from "react-router";

function Login() {

    const navigate= useNavigate();

    function handleLogin(e){
        e.preventDefault();
        console.log("login")
        navigate("/dashboard")
    }

  return (
    <div>
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
            <input type="text" name="username0" id="" />
            <button>Login</button>
        </form>
    </div>
  )
}

export default Login