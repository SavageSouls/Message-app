import { useState } from 'react';
import './App.css';
import LoginPage from './Pages/LoginPage';
import RegistryPage from './Pages/RegistryPage';
import { Routes, Route, useNavigate } from 'react-router-dom';

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/register' element={<RegistryPage />} />
      </Routes>
    </>
  )
}

export default App
