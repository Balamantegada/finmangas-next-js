import { createTheme } from '@mui/material/styles';
import {
  AppBar,
  Box,
  Container,
  CssBaseline,
  Link,
  ThemeProvider,
  Toolbar,
  Typography,
  Switch,
} from '@mui/material';
import Head from 'next/head';
import NextLink from 'next/link';
import classes from '../utils/classes';
import { useContext } from 'react';
import { store } from '../utils/store';
import jsCookie from 'js-cookie';

export default function Layout({ title, descripton, children }) {
  const { state, dispatch } = useContext(store);
  const { darkMode } = state;
  const theme = createTheme({
    components: {
      MuiLink: {
        defaultProps: {
          underline: 'hover',
        },
      },
    },
    typography: {
      h1: {
        fontSize: '1.6rem',
        fontWeight: 400,
        margin: '1rem 0',
      },
      h2: {
        fontSize: '1.4rem',
        fontWeight: 400,
        margin: '1rem 0',
      },
    },
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: darkMode ? '#FFC18E' : '#513252',
      },
      secondary: {
        main: '#FFC18E',
      },
    },
  });
  const darkModeChangeHandler = () => {
    dispatch({ type: darkMode ? 'DARK_MODE_OFF' : 'DARK_MODE_ON' });
    const newDarkMode = !darkMode;
    jsCookie.set('darkMode', newDarkMode ? 'ON' : 'OFF');
  };
  return (
    <>
      <Head>
        <title>{title ? `${title} - Finmangas` : 'Finmangas'}</title>
        {descripton && <meta name='description' content={description}></meta>}
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position='static' sx={classes.appbar}>
          <Toolbar sx={classes.toolbar}>
            <Box display='flex' alignItems='center'>
              <NextLink href='/' passHref>
                <Link>
                  <Typography sx={classes.brand}>finmangas</Typography>
                </Link>
              </NextLink>
            </Box>
            <Box>
              <Switch
                checked={darkMode}
                onChange={darkModeChangeHandler}
              ></Switch>
            </Box>
          </Toolbar>
        </AppBar>
        <Container component='main' sx={classes.main}>
          {children}
        </Container>
        <Box component='footer' sx={classes.footer}>
          <Typography>All rights reserved. Finmangas.</Typography>
        </Box>
      </ThemeProvider>
    </>
  );
}
