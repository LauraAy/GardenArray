
import React from 'react'
import {
    Container,
    Typography,
    Avatar,
    Grid,
    makeStyles,
    Button
} from '@material-ui/core'
import { green } from '@material-ui/core/colors'

const useStyles = makeStyles((theme) => ({
    avatar: {
        color: theme.palette.getContrastText(green[300]),
        backgroundColor: green[300],
        marginRight: 0,
        [theme.breakpoints.down('sm')]: {
            width: 100,
            height: 100
        },
        [theme.breakpoints.up('md')]: {
            width: 150,
            height: 150
        },
        [theme.breakpoints.up('lg')]: {
            width: 200,
            height: 200
        }
    },
    avatarDiv: {
        display: 'flex',
        justifyContent: 'space-around'
    },
    username: {
        display: 'flex',
        justifyContent: 'space-around',
        fontSize: 64,
        [theme.breakpoints.down('sm')]: {
            fontSize: 32
        }
    },
    usernameDiv: {
        display: 'inline',
        textAlign: 'center'
    },
    headerBtnDiv: {
        display: 'flex',
        justifyContent: 'center'
    },
    headerBtn: {
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            margin: 1,
            marginTop: 12
        },
        [theme.breakpoints.up('md')]: {
            margin: 4
        }
    },
    divider: {
        width: '100%'
    },
    info: {
        display: 'inline',
        margin: 8
    },
    infoContent: {
        textAlign: 'center'
    },
    infoDiv: {
        justifyContent: 'space-around',
        display: 'flex'
    },
    infoTitle: {
        fontWeight: 'bold'
    },
    infoContainer: {
        marginTop: 10
    }
}));

const ProfileHeader = (props) => {

    const classes = useStyles()

    const avatarLetters = () => {
        let chars = (props.firstName).charAt(0) + (props.lastName).charAt(0)
        return chars.toUpperCase()
    }

    return (
        <Container className={classes.root}>
            <Grid item xs={12}>
                <div className={classes.avatarDiv}>
                    <Avatar className={classes.avatar}>{avatarLetters()}</Avatar>
                </div>
                <div className={classes.usernameDiv}>
                    <Typography variant='h2' className={classes.username}>
                        {props.username}
                    </Typography>
                </div>
            </Grid>
            <Grid item xs={12} className={classes.infoContainer}>
                <hr />
                <div className={classes.infoDiv}>
                    <div className={classes.infoContent}>
                        <Typography>
                            {props.gardenAmount}
                        </Typography>
                        <Typography className={classes.infoTitle}>
                            Gardens
                        </Typography>
                    </div>
                </div>
                <hr />
            </Grid>
            <Grid item xs={12}>
                <div className={classes.headerBtnDiv}>
                    <Button
                        className={classes.headerBtn}
                        variant='outlined'
                        onClick={() => { window.location.replace(`/creategarden/${localStorage.getItem('id')}`) }}
                    >Add Garden</Button>
                    <Button
                        className={classes.headerBtn}
                        variant='outlined'
                        onClick={() => props.toggleEdit()}
                    >Edit Garden</Button>
                </div>
            </Grid>
        </Container>
    )
}

export default ProfileHeader