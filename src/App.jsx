import react from "react";
import { useState } from 'react'
import './App.css'
import RegisterPage from './components/RegisterPage.jsx';
import LoginPage from './components/LoginPage.jsx'
import { Routes, Route } from 'react-router-dom';
import DashboardPage  from './components/DashboardPage.jsx';
import AddtodoPage from "./components/AddtodoPage.jsx";
import NavBar from "./components/NavBar.jsx";


function App() {


  return (
    <div>
      <NavBar/>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/addTodo" element={<AddtodoPage/>} />
      <Route path="/dashboard" element={<DashboardPage />} />
    </Routes>

    </div>
  )
}

export default App
