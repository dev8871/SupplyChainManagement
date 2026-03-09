import { VStack, Input, Field, Button, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'

function Register() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const {register_user} = useAuth();
  const navigate = useNavigate();

  const handleRegister =() => {
    register_user(username, password, email);
  }

  return (
    <VStack>
      <h1> Register</h1>
      <Field.Root>
        <Field.Label>Username</Field.Label>
        <Input placeholder='Username' type='text' onChange={(e) => setUsername(e.target.value)}/> 
      </Field.Root>
      <Field.Root>
        <Field.Label>Email</Field.Label>
        <Input placeholder='Email' type='email' onChange={(e) => setEmail(e.target.value)}/> 
      </Field.Root>
      <Field.Root>
        <Field.Label>Password</Field.Label>
        <Input placeholder='Password' type='password' onChange={(e) => setPassword(e.target.value)}/> 
      </Field.Root>
      <Button onClick={handleRegister}>Register</Button>
      <Text onClick={() => navigate("/login")} cursor="pointer" color="blue.500">Already have an account? Login</Text>
    </VStack>
  )
}

export default Register;