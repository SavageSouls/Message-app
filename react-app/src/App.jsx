import { useState } from 'react';
import './App.css';
import LoginPage from './Pages/LoginPage';
import RegistryPage from './Pages/RegistryPage';
import ToastApp from './Components/Toast';
import { Routes, Route, useNavigate } from 'react-router-dom';

function App() {
  const [loading, setLoading] = useState(false);
  const [toastData, setToastData] = useState( { open: false, title: '', description: '', isError: true } );

  return (
    <>
      <Routes>
        <Route path='/' element={<LoginPage loading={loading} setLoading={setLoading} />} />
        <Route path='/login' element={<LoginPage loading={loading} setLoading={setLoading} />} />
        <Route path='/register' element={<RegistryPage loading={loading} setLoading={setLoading} toastData={toastData} setToastData={setToastData} />} />
      </Routes>

      <ToastApp
        toastData={toastData}
        setToastData={setToastData}
      />
    </>
  )
}

export default App
