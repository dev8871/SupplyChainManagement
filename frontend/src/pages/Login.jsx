import { VStack, Input, Field, Button, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';


function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const {login_user} = useAuth();
  const navigate = useNavigate();

  const handleLogin =() => {
    login_user(username, password);
  }

  return (
    <VStack>
      <h1> Login</h1>
      <Field.Root>
        <Field.Label>Username</Field.Label>
        <Input placeholder='Username' type='text' onChange={(e) => setUsername(e.target.value)}/> 
      </Field.Root>
      <Field.Root>
        <Field.Label>Password</Field.Label>
        <Input placeholder='Password' type='password' onChange={(e) => setPassword(e.target.value)}/> 
      </Field.Root>
      <Button onClick={handleLogin}>Login</Button>
      <Text onClick={() => navigate("/register")} cursor="pointer" color="blue.500">Don't have an account? Register</Text>
    </VStack>
  )
}

export default Login