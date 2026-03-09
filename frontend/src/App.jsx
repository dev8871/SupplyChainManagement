import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './pages/Register';
import Login from './pages/Login';
import { ChakraProvider } from '@chakra-ui/react';
import system from './theme';
import Dashboard from './pages/DashBoard';
import { AuthProvider } from './context/useAuth';
import PrivateRoute from './components/PrivateRoute';

function App() {


  return (
    <>
    <ChakraProvider value={system}>
        
          <BrowserRouter>
            <AuthProvider>
              <Routes>
              <Route path= "/register" element={<Signup />} />
              <Route path= "/login" element={<Login />} />
              <Route path= "/" element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              } />
            </Routes>
            </AuthProvider>
            
          </BrowserRouter>
      </ChakraProvider>
      
    </>
  )
}

export default App


