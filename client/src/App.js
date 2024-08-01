// Import necessary modules
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Navbar from './components/Navbar'
import Home from './components/Home'
import Login from './components/Login'
import NewHostel from './components/NewHostel';
import DisplayHostel from './components/DisplayHostel';
import HostelPage from './components/HostelPage';

// Define your main App component
const App = () => {
  return (
    <>
    
    <Router>
    <Navbar/>
      {/* Define your routes */}
      <Routes>
        <Route path ='/' element={<Home/>}/>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/createhostel" element={<NewHostel/>} />
        <Route path='/displayhostels' element={<DisplayHostel/>}/>
        <Route path='/hostelpage/:id' element ={<HostelPage/>}/>
        {/* Add more routes as needed */}
      </Routes>
    </Router>
    </>
  );
};

export default App;
