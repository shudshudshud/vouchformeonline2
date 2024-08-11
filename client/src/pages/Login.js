import React from 'react';
import { Button } from '@mui/material';

function Login() {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Login/Register</h1>
      <Button
        variant="contained"
        color="primary"
        href="/auth/google"
        style={{ margin: '10px' }}
      >
        Login with Google
      </Button>
      <Button
        variant="contained"
        color="secondary"
        href="/auth/google"
        style={{ margin: '10px' }}
      >
        Register with Google
      </Button>
    </div>
  );
}

export default Login;
