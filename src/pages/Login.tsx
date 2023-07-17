import { FormEvent, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import config from '../config/config';

type LoginProps = {
  setCurrentPage: (currentPage: string) => void;
  setIsAuth: (isAuth: boolean) => void;
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Login({ setCurrentPage, setIsAuth }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    (async () => {
      try {
        const response = await axios.post(
          `${config.api.url}/auth/login`,
          { email, password }
        );

        localStorage.setItem('user', JSON.stringify(response.data));

        setCurrentPage('dashboard');
        setIsAuth(true);
      } catch (err: any) {
        console.error(err);
      }
    })();
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 12,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          </Avatar>
          <Typography component="h1" variant="h4">
            Courier Service App
          </Typography>
          <Typography component="h1" variant="h5">
            Log in
          </Typography>
          <Box component="form" sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 2 }}
              onClick={login}
            >
              LOG IN
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="outlined"
              onClick={() => setCurrentPage('register')}
            >
              Create a new account
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
