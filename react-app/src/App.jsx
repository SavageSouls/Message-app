import { useState, useEffect } from 'react';
import './App.css';
import LoginPage from './Pages/LoginPage';
import RegistryPage from './Pages/RegistryPage';
import ToastApp from './Components/Toast';
import ChatPage from './Pages/ChatPage';
import { Routes, Route, useNavigate } from 'react-router-dom';

function App() {
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [toastData, setToastData] = useState({ open: false, title: '', description: '', isError: false });
  const [userData, setUserData] = useState({ isLoggedIn: false });

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem('userData'));
    if (storedUserData) {
      setUserData(storedUserData);
    } else {
      setUserData({ isLoggedIn: false });
      navigate('/login')
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path='/' element={<ChatPage loading={loading} setLoading={setLoading}  toastData={toastData} setToastData={setToastData} />} />
        {!userData.isLoggedIn && <Route path='/register' element={<RegistryPage loading={loading} setLoading={setLoading} toastData={toastData} setToastData={setToastData} />} />}
        {!userData.isLoggedIn && <Route path='/login' element={<LoginPage loading={loading} setLoading={setLoading} toastData={toastData} setToastData={setToastData} userData={userData} setUserData={setUserData} />} />}
      </Routes>

      <ToastApp
        toastData={toastData}
        setToastData={setToastData}
      />
    </>
  )
}

export default App