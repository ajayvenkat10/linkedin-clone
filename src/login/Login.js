import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../features/userSlice';
import { authentication } from '../Firebase';
import LinkedinImages from '../linkedin_images/LinkedinImages';
import "./Login.css";

function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const dispatch = useDispatch();

  const loginToApp = (event) => {
    event.preventDefault();
    signInWithEmailAndPassword(authentication, email, password)
    .then((userAuth) => {
      dispatch(
        login(
          {
            uid: userAuth.user.uid,
            email: userAuth.user.email,
            displayName: userAuth.user.displayName,
            photoUrl: userAuth.user.photoURL,
          }
        )
      );
    }).catch((error) => alert(error));
  };

  const register = () => {
    if (!name) {
      return alert('Please enter your name');
    }

    createUserWithEmailAndPassword(authentication, email, password)
      .then((userAuth) => {
        updateProfile(userAuth.user,
          {
            displayName: name,
            photoURL: profilePicture,
          }
        ).then(() => {
          dispatch(login({
            uid: userAuth.user.uid,
            displayName: name,
            email: userAuth.user.email,
            photoUrl: profilePicture,
          })
          );
        })
      }).catch((error) => alert(error));
  };

  return (
    <div className="login">
      <img src={LinkedinImages.linkedin_login_image} alt="" />
      <form>
        <input type="text" placeholder='Full name (required if registering)' value={name} onChange={event => setName(event.target.value)} />
        <input type="text" placeholder='Profile picture URL (optional)' value={profilePicture} onChange={event => setProfilePicture(event.target.value)} />
        <input type="email" placeholder='Email address' value={email} onChange={event => setEmail(event.target.value)} />
        <input type="password" placeholder='Password' value={password} onChange={event => setPassword(event.target.value)} />
        <button type="submit" onClick={loginToApp}>Sign in</button>
      </form>

      <p>Not a member? {" "}
        <span className='login__register' onClick={register}>
          Register Now
        </span>
      </p>
    </div>
  );
}

export default Login