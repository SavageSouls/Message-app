import { useState } from 'react';
import './App.css';
import LoginPage from './Pages/LoginPage';
import { Routes, Route, useNavigate } from 'react-router-dom';

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<LoginPage />} />
      </Routes>
    </>
  )
}

export default App
