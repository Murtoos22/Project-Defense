import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

import { AuthContext } from './context/authContext';

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Login from './components/login/Login';
import Register from './components/register/Register';
import Home from './components/home/Home';
import Tokens from './components/Tokens/Tokens';
import TokenDetails from './components/token-details/TokenDetails';

// TODO fix logout logic
import { logout } from './api/user-api';
import { useGetAllTokens } from './hooks/useGetAllTokens';

function App() {
  // TODO review auth state functionality
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

  const tokens = useGetAllTokens();

  return (
    <AuthContext.Provider value={contextData}>
      <div className="wrapper">
        <Header />

        <main className="main-container-box">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/tokens' element={<Tokens tokens={tokens}/> }/>
            <Route path='/tokens/:id' element={<TokenDetails tokens={tokens} />} />
            {/* <Route path='/myComments/:id' element={<UserComments tokens={tokens}/>} /> */}
          </Routes>
        </main>

        <Footer />
      </div>
    </AuthContext.Provider>
  );
};

export default App;
