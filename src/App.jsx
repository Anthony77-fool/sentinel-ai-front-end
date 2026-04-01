import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import { LogInPage } from './pages/LogInPage';
import  SignUpPage  from './pages/SignUpPage';
import './App.css'

function App() {

  return (
    <Routes>

      {/* <Route index element={<LandingPage />} /> */}
      <Route path='/login' element={<LogInPage />} />
      <Route path='/signup' element={<SignUpPage />} />
      {/*<Route path='/forgotpassword' element={<ForgotPasswordPage />} /> */}
    </Routes>
  )
}

export default App
