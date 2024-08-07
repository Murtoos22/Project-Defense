import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.css';

import Home from './components/home/Home';
import Login from './components/login/Login';
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Tokens from './components/Tokens/Tokens';
import Register from './components/register/Register';
import UserComments from './components/user-comments/UserComments';
import TokenDetails from './components/token-details/TokenDetails';

// TODO fix logout logic
import { logout } from './api/user-api';
import { useGetAllTokens } from './hooks/useGetAllTokens';
import TokenContext from './context/TokenContext';

function App() {
  // TODO review auth state functionality
  const [authState, setAuthState] = useState({});

  const [token, setToken] = useState({});

  const changeAuthState = (state) => {
    setAuthState(state);
  };

  // const contextData = {
  //   token,
  //   setToken,
  // };

  const tokens = useGetAllTokens();

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      <div className="wrapper">
        <Header />

        <main className="main-container-box">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/tokens' element={<Tokens tokens={tokens} />} />
            <Route path='/tokens/:id' element={<TokenDetails tokens={tokens} />} />
            <Route path='/userComments/:id' element={<UserComments tokens={tokens} />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </TokenContext.Provider>
  );
};

export default App;
