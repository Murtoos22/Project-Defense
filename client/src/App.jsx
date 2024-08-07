import React from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.css';

import Home from './components/home/Home';
import Login from './components/login/Login';
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Tokens from './components/Tokens/Tokens';
import Register from './components/register/Register';
import NotFound from './components/not-found/NotFound'; 
import UserComments from './components/user-comments/UserComments';
import TokenDetails from './components/token-details/TokenDetails';

import { useGetAllTokens } from './hooks/useGetAllTokens';

const App = () => {
  const tokens = useGetAllTokens();

  return (
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
          <Route path='*' element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default App;
