import { FormEvent, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import config from '../config/config';
import { toast } from 'react-toastify';

type RegisterProps = {
  setCurrentPage: (currentPage: string) => void;
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Register({ setCurrentPage }: RegisterProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const register = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    (async () => {
      try {
        await axios.post(
          `${config.api.url}/user`,
          { name, email, password },
          { withCredentials: true },
        );

        setCurrentPage('login');

        toast.success('Registration successfull');
      } catch (err: any) {
        console.log(err?.response?.data);

        const errorData = err?.response?.data?.data;

        if (errorData) {
          for (const dataPoint of errorData) {
            toast.error(dataPoint.message);
          }
        } else {
          const message = err?.response?.data?.message || 'An unknown error occurred';
          toast.error(message);
        }
      }
    })();
  };

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
            Register
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => register}
            >
              Create account
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="outlined"
              onClick={() => setCurrentPage('login')}
            >
              Log in to existing account
            </Button>

          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
