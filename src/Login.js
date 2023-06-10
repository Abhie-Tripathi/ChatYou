import React from 'react'
import logo from "./assets/wechat.svg"
import "./css/login.css"
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from './firebase'
import { useStateValue } from './StateProvider'

function Login() {
  
  const [{},dispatch] = useStateValue()
  
  const signIn = () =>{
    signInWithPopup(auth,provider).then((result)=>{
      dispatch({type: "SET_USER",user:result.user})
    }).catch((error)=>alert(error))
  }

  return (
    <div className='login__wrapper'>
        <div className='login'>
            <img src={logo}/>
            <h2>Sign in to ChatYou</h2>
            <button onClick={signIn}>Login with Gmail</button>
        </div>
    </div>
  )
}

export default Login