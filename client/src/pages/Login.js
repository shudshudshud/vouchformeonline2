import React from 'react';
import { Button } from '@mui/material';

function Login() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Login/Register</h1>
      <Button variant="contained" color="primary" href="/auth/google">
        Login with Google
      </Button>
    </div>
  );
}

export default Login;
