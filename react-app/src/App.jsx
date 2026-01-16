import { useState } from 'react';
import './App.css';
import LoginPage from './Pages/LoginPage';
import RegistryPage from './Pages/RegistryPage';
import ToastApp from './Components/Toast';
import { Routes, Route, useNavigate } from 'react-router-dom';

function App() {
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(true);
  const [toastData, setToastData] = useState( { title: 'Szia', description: 'Szia...' } );

  return (
    <>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/register' element={<RegistryPage />} />
      </Routes>

      <ToastApp
        open={showToast}
        onOpenChange={setShowToast}
        title={toastData.title}
        description={toastData.description}
      />
    </>
  )
}

export default App
