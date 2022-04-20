import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { login, logout, selectUser } from './features/userSlice';
import Feed from './Feed';
import { authentication } from './Firebase';
import Header from './Header';
import Login from './login/Login';
import Sidebar from './Sidebar';
import Widgets from './Widgets';

function App() {

  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    authentication.onAuthStateChanged(
      userAuth => {
        if(userAuth) {
          console.log('User logged in: ', userAuth);
          dispatch(
            login(
            {
              uid: userAuth.uid,
              email: userAuth.email,
              displayName: userAuth.displayName,
              photoUrl: userAuth.photoURL,
            }
          ));
        } else {
          console.log('User logged out');
          dispatch(logout());
        }
      }
    )
  }, [dispatch]);

  return (
    <div className="app">
      <Header />

      {!user ? (
        <Login />
        ) : (
          <div className="app__body">
            <Sidebar />
            <Feed />
            <Widgets/>
          </div>
        )
      }
    </div>
  );
}

export default App;
