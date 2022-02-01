import React, { useState, useContext, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./App.css";

import Login from './components/Login';
import Singup from './components/Singup';
import Todo from './components/Todo';
import Menu from './components/Menu';

function App() {
  const token = localStorage.getItem("token");

  return (
    <>
    <Router>
      <Menu />
      <Routes>
        <Route path="/" element={(token && <Todo />) || (!token && <Login />)} />

        {!token && <Route path="/login" element={<Login />} />}

        {!token && <Route path="/singup" element={<Singup />} />}
      </Routes>
    </Router>
    
    <footer>Made by Yakorev Volodymyr</footer>
    </>
  );
}

export default App;
