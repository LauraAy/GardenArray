import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Redirect } from 'react-router-dom'
import UserContext from '../../utils/UserContext'
import { green } from '@material-ui/core/colors';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Garden Array
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createMuiTheme({
  palette: {
    primary: green
  }
})

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  subtitle: {
    fontSize: 12
  },
  logoImg: {
    width: 200,
    height: '100%'
  }
}));

export default function SignIn() {
  const classes = useStyles();

  const { username, password, isLoggedIn, handleSignInUser, handleInputChange } = useContext(UserContext)

  return (
    <>
      {isLoggedIn ? <Redirect to={{ pathname: `/user/${localStorage.getItem('id')}` }} /> :
        (<Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <img src='https://i.imgur.com/lwEAqtD.png' alt='garden-array-logo' className={classes.logoImg} />
            <Typography component="h1" variant="h5">
              Sign in
          </Typography>
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                onChange={handleInputChange}
                value={username}
                autoFocus
              />
              <Typography display="block" className={classes.subtitle}>
                Username is case sensitive*
              </Typography>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleInputChange}
                value={password}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <ThemeProvider theme={theme}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={handleSignInUser}
                >
                  Sign In
                </Button>
              </ThemeProvider>
              <Grid container>
                <Grid item>
                  <div className={classes.floatRight}>
                    <Link href="/signup" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </div>
                  <div className={classes.floatRight}>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </div>
                </Grid>
              </Grid>
            </form>
          </div>
          <Box mt={8}>
            <Copyright />
          </Box>
        </Container>)
      }
    </>
  );
}