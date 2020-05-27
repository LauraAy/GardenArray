import React, { useContext } from 'react'
import { Redirect } from 'react-router-dom'
import {
    Container,
    makeStyles,
    Typography,
    Button,
    Paper
} from '@material-ui/core'
import UserContext from '../../utils/UserContext'
import Navbar from '../../components/Navbar'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '4rem',
        justifyContent: 'space-around'
    },
    title: {
        fontSize: 32
    },
    username: {
        fontSize: 64,
        [theme.breakpoints.down('sm')]: {
            fontSize: 32
        }
    },
    textField: {
        marginTop: 8,
        [theme.breakpoints.down('sm')]: {
            width: '100%'
        },
        [theme.breakpoints.up('md')]: {
            width: '100%'
        },
    },
    btn: {
        marginTop: 8,
        margin: 2
    },
    infoTitle: {
        fontSize: 24,
        margin: 18
    },
    infoText: {
        color: 'gray',
        marginLeft: 16,
        overflow: 'hidden'
    },
    paper: {
        padding: 6
    }
}));

const ProfileInfo = () => {

    const classes = useStyles()
    const history = useHistory()

    const { isLoggedIn } = useContext(UserContext)

    const redirect = (path) => {
        history.push(path)
    }

    return (
        <>
            {isLoggedIn ?
                (<>
                    <Navbar />
                    <Container className={classes.root}>
                        <div>
                            <Typography variant="h1" className={classes.title} >Profile Settings</Typography>
                        </div>
                        <Paper elevation={3} className={classes.paper}>
                            <Typography variant="h3" className={classes.infoTitle}>
                                Username:
                            </Typography>
                            <Typography variant="h4" className={classes.infoText}>
                                {localStorage.getItem('username')}
                            </Typography>
                            <Typography variant="h3" className={classes.infoTitle}>
                                First Name:
                            </Typography>
                            <Typography variant="h4" className={classes.infoText}>
                                {localStorage.getItem('first_name')}
                            </Typography>
                            <Typography variant="h3" className={classes.infoTitle}>
                                Last Name:
                            </Typography>
                            <Typography variant="h4" className={classes.infoText}>
                                {localStorage.getItem('last_name')}
                            </Typography>
                            <Typography variant="h3" className={classes.infoTitle}>
                                Email:
                            </Typography>
                            <Typography variant="h4" className={classes.infoText}>
                                {localStorage.getItem('email')}
                            </Typography>
                            <Button
                                variant="outlined"
                                onClick={() => { redirect('/edit') }}
                            >
                                Edit Info
                            </Button>
                        </Paper>
                    </Container>
                </>)
                : <Redirect to={{ pathname: '/signin' }} />
            }
        </>
    )
}

export default ProfileInfo