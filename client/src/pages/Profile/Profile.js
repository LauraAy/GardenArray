import React, { useState, useContext, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import {
    Container,
    makeStyles,
    Grid,
    GridList,
    Typography,
    Button,
    TextField,
    Divider
} from '@material-ui/core'
import ProfileHeader from '../../components/ProfileHeader'
import GardenContext from '../../utils/GardenContext'
import UserContext from '../../utils/UserContext'
import Navbar from '../../components/Navbar'
import GardenDisplay from '../../components/GardenDisplay'
import Garden from '../../utils/Garden'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            marginTop: '4rem',
        },
        marginBottom: '3rem'
    },
    gridListRoot: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden'
    },
    gridList: {
        width: '100%',
        [theme.breakpoints.down('sm')]: {
            width: 500
        }
    },
    gridListImg: {
        cellHeight: 450,
        [theme.breakpoints.down('sm')]: {
            cellHeight: 180
        }
    },
    gardensTitle: {
        fontWeight: 'bold',
        margin: 8
    },
    divider: {
        margin: 12
    },
    editInput: {
        width: '100%',
        margin: 8
    },
    cancelBtn: {
        margin: 8
    }
}));

const Profile = () => {
    const classes = useStyles()
    const { isLoggedIn } = useContext(UserContext)
    const [userInfoState, setUserInfoState] = useState({
        first_name: '',
        last_name: '',
        username: ''
    })

    const [gardenInfoState, setGardenInfoState] = useState({
        gardens: []
    })

    const {
        edit,
        handleToggleEdit,
        handleToggleEditFalse,
    } = useContext(UserContext)

    const {
        handleGardenInputChange,
        handleGardenEdit,
        handleGardenDelete
    } = useContext(GardenContext)

    useEffect(() => {
        Garden.getGardenByUser(localStorage.getItem('id'))
            .then(({ data }) => {
                setUserInfoState({
                    ...userInfoState,
                    first_name: data.first_name,
                    last_name: data.last_name,
                    username: data.username
                })
                setGardenInfoState({ ...gardenInfoState, gardens: data.gardens })
            })
            .catch(e => console.error(e))
        // eslint-disable-next-line
    }, [isLoggedIn])

    return (
        <>

            {isLoggedIn ?
                (<>
                    <Navbar />
                    <Container className={classes.root}>
                        <Grid className={classes.header} container>
                            <ProfileHeader
                                gardenAmount={gardenInfoState.gardens.length}
                                firstName={userInfoState.first_name}
                                lastName={userInfoState.last_name}
                                username={userInfoState.username}
                                toggleEdit={handleToggleEdit}
                            />
                            {edit ?
                                (
                                    <>
                                        <Grid item xs={12}>
                                            <Typography
                                                variant="subtitle1"
                                                className={classes.gardensTitle}
                                            >My Gardens</Typography>
                                            <form>
                                                {gardenInfoState.gardens.map((data, i) => (
                                                    <div key={i}>
                                                        <Divider className={classes.divider} />
                                                        <TextField
                                                            className={classes.editInput}
                                                            id="garden_name"
                                                            label="Garden Name"
                                                            name='garden_name'
                                                            defaultValue={data.garden_name}
                                                            onChange={handleGardenInputChange}
                                                            variant="outlined"
                                                        />
                                                        <TextField
                                                            className={classes.editInput}
                                                            id="about_garden"
                                                            label="About Garden"
                                                            name='about'
                                                            defaultValue={data.about}
                                                            onChange={handleGardenInputChange}
                                                            variant="outlined"
                                                        />
                                                        <TextField
                                                            className={classes.editInput}
                                                            id="location"
                                                            label="Location"
                                                            name='location'
                                                            defaultValue={data.location}
                                                            onChange={handleGardenInputChange}
                                                            variant="outlined"
                                                        />
                                                        <Divider className={classes.divider} />
                                                        <Button
                                                            onClick={(e) => handleGardenEdit(e, data)}
                                                        >Save</Button>
                                                        <Button
                                                            variant="contained"
                                                            color="secondary"
                                                            onClick={(e) => handleGardenDelete(e, data._id)}
                                                        >Delete Garden</Button>
                                                    </div>
                                                ))}
                                                <Button className={classes.cancelBtn} variant="contained" color="secondary" onClick={(e) => handleToggleEditFalse(e)}>Cancel</Button>
                                            </form>
                                        </Grid>
                                    </>
                                ) : (
                                    <Grid item xs={12}>
                                        <Typography
                                            variant="subtitle1"
                                            className={classes.gardensTitle}
                                        >My Gardens</Typography>
                                        <div className={classes.gridListRoot}>
                                            <GridList className={classes.gridList}>
                                                {gardenInfoState.gardens.length > 0 ?
                                                    (gardenInfoState.gardens.map((data, i) =>
                                                        (<GardenDisplay
                                                            key={i}
                                                            title={data.garden_name}
                                                            about={data.about}
                                                            location={data.location}
                                                            plants={data.plants}
                                                            gardenId={data._id}
                                                        />)
                                                    )) :
                                                    <GardenDisplay
                                                        title='You do not have any gardens! Please add a garden'
                                                        disabled={true}
                                                        plants={[]}
                                                    />
                                                }
                                            </GridList>
                                        </div>
                                    </Grid>)}
                        </Grid>
                    </Container>
                </>
                ) : <Redirect to={{ pathname: '/signin' }} />}
        </>
    )
}


export default Profile