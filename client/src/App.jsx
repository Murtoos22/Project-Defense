import { Routes, Route } from 'react-router-dom';

import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import Login from '../components/login/Login';
import Register from '../components/register/Register';
import Home from '../components/home/Home';

function App() {
  return (
    <>
      <Header />
      
      <main className="main-container-box">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
};

export default App;
