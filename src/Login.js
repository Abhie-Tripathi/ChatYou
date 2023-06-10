import React from 'react'
import logo from "./assets/wechat.svg"
import "./css/login.css"

function Login() {
  return (
    <div className='login__wrapper'>
        <div className='login'>
            <img src={logo}/>
            <h2>Sign in to ChatYou</h2>
            <button>Login with Gmail</button>
        </div>
    </div>
  )
}

export default Login