import { Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LandingPage from './pages/landing-page/LandingPage';
import { LogInPage } from './pages/LogInPage';
import  SignUpPage1  from './pages/SignUpPage1';
import  SignUpPage2  from './pages/SignUpPage2';
import SignUpPage3_Employee from './pages/SignUpPage3_Employee';
import SignUpPage3_Organization from './pages/SignUpPage3_Organization';
import ResetPasswordPage from './pages/ResetPasswordPage';
import Main from './pages/organization/Main';
import EmployeeMain from './pages/employee/EmployeeMain';
import './App.css'

function App() {

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route index element={<LandingPage />} />
        <Route path='/login' element={<LogInPage />} />
        <Route path='/signup1' element={<SignUpPage1 />} />
        <Route path='/signup2' element={<SignUpPage2 />} />
        <Route path='/signup3-employee' element={<SignUpPage3_Employee />} />
        <Route path='/signup3-organization' element={<SignUpPage3_Organization />} />
        <Route path='/forgotpassword' element={<ResetPasswordPage />} />
        <Route path='/organization/dashboard' element={<Main />} />
        <Route path='/employee/dashboard' element={<EmployeeMain />} />
      </Routes>
    </QueryClientProvider>
  )
}

export default App
