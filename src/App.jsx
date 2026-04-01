import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import { LogInPage } from './pages/login-Page/LogInPage';
import './App.css'

function App() {

  return (
    <Routes>

      {/* <Route index element={<HomePage />} /> */}
      <Route path='/login' element={<LogInPage />} />
    </Routes>
  )
}

export default App
