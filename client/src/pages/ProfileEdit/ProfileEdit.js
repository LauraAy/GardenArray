import React, { useContext } from 'react'
import { Redirect } from 'react-router-dom'
import {
    Container,
    makeStyles,
    Typography,
    TextField,
    Button
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
        fontSize: 48
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
    }
}));

const ProfileEdit = () => {

    const classes = useStyles()
    const history = useHistory()

    const {
        handleProfileEditChange,
        handleEditProfileSubmit,
        isLoggedIn,
        editUser,
        editFirst,
        editLast,
        editEmail
    } = useContext(UserContext)

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
                            <Typography variant="h1" className={classes.title} >Edit Profile</Typography>
                        </div>
                        <form>
                            <TextField
                                id="editUser"
                                label="Username"
                                variant="outlined"
                                name="editUser"
                                className={classes.textField}
                                value={editUser}
                                onChange={handleProfileEditChange}
                            />
                            <TextField
                                id="editFirst"
                                label="First Name"
                                variant="outlined"
                                name="editFirst"
                                className={classes.textField}
                                value={editFirst}
                                onChange={handleProfileEditChange}
                                placeholder={localStorage.getItem('first_name')}
                            />
                            <TextField
                                id="editLast"
                                label="Last Name"
                                variant="outlined"
                                name="editLast"
                                className={classes.textField}
                                value={editLast}
                                onChange={handleProfileEditChange}
                                placeholder={localStorage.getItem('last_name')}
                            />
                            <TextField
                                id="editEmail"
                                label="Email"
                                variant="outlined"
                                name="editEmail"
                                className={classes.textField}
                                value={editEmail}
                                onChange={handleProfileEditChange}
                                placeholder={localStorage.getItem('email')}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.btn}
                                onClick={(e) => {handleEditProfileSubmit(e)}}
                            >
                                Submit
                            </Button>
                            <Button
                                variant="contained"
                                color="secondary"
                                className={classes.btn}
                                onClick={() => { redirect(`/info/${localStorage.getItem('id')}`) }}
                            >
                                Cancel
                            </Button>
                        </form>
                    </Container>
                </>)
                : <Redirect to={{ pathname: '/signin' }} />
            }
        </>
    )
}

export default ProfileEdit