import React from 'react';
import { Button } from '@material-ui/core';
import './Login.css';
import firebase from 'firebase';
import { actionTypes } from './reducer';
import { useStateValue } from './StateProvider';

function Login() {

  const [{},dispatch] = useStateValue();

  const signIn=()=>{
    var provider=new firebase.auth.GoogleAuthProvider();
  firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
     dispatch({
        type: actionTypes.SET_USER,
        user: result.user,
        })
  }).catch((error) => {
    alert(error.message);
  });
  }
  return (
    <div className="login">
      <div className="login__container">
          <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt=""/> 
          <div className="login_text">
          <h1>Sign in to Whatsapp</h1>
          </div>
          <Button onClick={signIn}>Sign in With Google</Button>
      </div>
    </div>
  )
}

export default Login
