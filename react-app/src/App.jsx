import { useState } from 'react'
import './App.css'
import LoginPage from './Pages/LoginPage'

function App() {
  const [login, loginTrue] = useState(false)

  return (
    <>
      <LoginPage/>
    </>
  )
}

export default App
