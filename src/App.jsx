import { Routes, Route } from 'react-router-dom';
import { LogInPage } from './pages/LogInPage';
import  SignUpPage1  from './pages/SignUpPage1';
import  SignUpPage2  from './pages/SignUpPage2';
import SignUpPage3_Employee from './pages/SignUpPage3_Employee';
import './App.css'

function App() {

  return (
    <Routes>

      {/* <Route index element={<LandingPage />} /> */}
      <Route path='/login' element={<LogInPage />} />
      <Route path='/signup1' element={<SignUpPage1 />} />
      <Route path='/signup2' element={<SignUpPage2 />} />
      <Route path='/signup3-employee' element={<SignUpPage3_Employee />} />
      {/*<Route path='/forgotpassword' element={<ForgotPasswordPage />} /> */}
    </Routes>
  )
}

export default App
