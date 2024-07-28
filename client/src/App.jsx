import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

import { AuthContext } from '../context/authContext';

import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import Login from '../components/login/Login';
import Register from '../components/register/Register';
import Home from '../components/home/Home';

// TODO fix lgout logic
import { logout } from '../api/user-api';

function App() {
  const [authState, setAuthState] = useState({});

  const changeAuthState = (state) => {
    setAuthState(state);
  };

  const contextData = {
    userId: authState._id,
    email: authState.email,
    accessToken: authState.accessToken,
    isAuthenticated: !!authState.email,
    changeAuthState,
  };

  return (
    <AuthContext.Provider value={contextData}>
      <div className="wrapper">
        <Header />

        <main className="main-container-box">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            {/* <Route path='/logout' element={logout()} /> */}
          </Routes>
        </main>

        <Footer />
      </div>
    </AuthContext.Provider>
  );
};

export default App;
