import React, { useState, useContext, useEffect } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import {
    makeStyles,
    Container,
    Button,
    Typography,
    Divider,
    Paper,
    Modal,
    Backdrop,
    Fade,
    FormControl,
    InputLabel,
    Select
} from '@material-ui/core'
import { Redirect } from 'react-router-dom'
import PlantContext from '../../utils/PlantContext'
import PlantInfoContext from '../../utils/PlantInfoContext'
import UserContext from '../../utils/UserContext'
import GardenContext from '../../utils/GardenContext'

const useStyles = makeStyles(theme => ({
    paper: {
        padding: 10,
        marginTop: 10,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        borderRadius: 15
    },
    mediaDiv: {
        width: '100%',
    },
    media: {
        height: 390,
        width: 390
    },
    text: {
        overflow: 'hidden'
    },
    divider: {
        marginBottom: 10
    },
    button: {
        margin: 8
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    select: {
        width: '220px'
    },
    modalBtnDiv: {
        margin: 6,
        marginTop: 8
    },
    modalBtn: {
        margin: 6
    }
}))

const PlantInfo = () => {

    const classes = useStyles()
    const plantId = (window.location.pathname).slice(12)
    const { isLoggedIn } = useContext(UserContext)
    const {
        plant_id,
        common_name,
        scientific_name,
        family_common_name,
        duration,
        precipitation_max,
        precipitation_min,
        native_status,
        growth_habit,
        foliage_color,
        lifespan,
        drought_tolerance,
        mature_height,
        shade_tolerance,
        fruit_seed_color,
        bloom_period,
        growth_period,
        flower_color,
        handleRenderPlant,
    } = useContext(PlantInfoContext)
    const { handleSavePlant } = useContext(PlantContext)

    const {
        userGardenSelect,
        userGarden,
        handleRenderGardenNames,
        handleSelectInputChange
    } = useContext(GardenContext)

    useEffect(() => {
        handleRenderPlant(plantId)
        handleRenderGardenNames(localStorage.getItem('id'))
        // eslint-disable-next-line
    }, [isLoggedIn])

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            {isLoggedIn ?
                (<>
                    <Navbar />
                    <Container>
                        <Modal
                            aria-labelledby="transition-modal-title"
                            aria-describedby="transition-modal-description"
                            className={classes.modal}
                            open={open}
                            onClose={handleClose}
                            closeAfterTransition
                            BackdropComponent={Backdrop}
                            BackdropProps={{
                                timeout: 500,
                            }}
                        >
                            <Fade in={open}>
                                <div className={classes.paper}>
                                    <FormControl variant="filled" className={classes.formControl}>
                                        <InputLabel htmlFor="filled-age-native-simple">Choose a Garden</InputLabel>
                                        <Select
                                            native
                                            className={classes.select}
                                            name='userGardenSelect'
                                            value={userGardenSelect}
                                            onChange={handleSelectInputChange}
                                            inputProps={{
                                                name: 'userGardenSelect',
                                                id: 'filled-age-native-simple',
                                            }}
                                        >
                                            {userGarden.map((garden, i) =>
                                                (
                                                    <option
                                                        key={i}
                                                        value={garden._id}
                                                    >{garden.garden_name}</option>
                                                )
                                            )}
                                        </Select>
                                        <div className={classes.modalBtnDiv}>
                                            <Button
                                                className={classes.modalBtn}
                                                variant="contained"
                                                color="primary"
                                                onClick={(e) => { handleSavePlant(e, userGardenSelect, plant_id) }}
                                            >Save Plant</Button>
                                            <Button
                                                className={classes.modalBtn}
                                                variant="contained"
                                                color="secondary"
                                                onClick={() => handleClose()}
                                            >Cancel</Button>
                                        </div>
                                    </FormControl>
                                </div>
                            </Fade>
                        </Modal>
                        <Paper elevation={3} className={classes.paper}>
                            {common_name ?
                                (
                                    <>
                                        <Typography variant='h5' className={classes.text}>
                                            Common Name:
                                        </Typography>
                                        <Typography variant='h4' className={classes.text}>
                                            {common_name}
                                        </Typography>
                                    </>
                                ) : <></>}
                            {scientific_name ?
                                (<Typography variant='subtitle1'>
                                    Scientific Name: {scientific_name}
                                </Typography>) : <></>}
                            {family_common_name ? (<p>Family Common Name: {family_common_name}</p>) : <></>}
                            {duration ? (<p>Duration: {duration}</p>) : <></>}
                            {precipitation_max ? (<p>Precipitation(MAX): {precipitation_max}</p>) : <></>}
                            {precipitation_min ? (<p>Precipitation(MIN): {precipitation_min}</p>) : <></>}
                            {native_status ? (<p>Native Status: {native_status}</p>) : <></>}
                            {growth_habit ? (<p>Growth Habit: {growth_habit}</p>) : <></>}
                            {drought_tolerance ? (<p>Drought Tolerance: {drought_tolerance}</p>) : <></>}
                            {foliage_color ? (<p>Foliage Color: {foliage_color}</p>) : <></>}
                            {lifespan ? (<p>Lifespan: {lifespan}</p>) : <></>}
                            {mature_height ? (<p>Mature Height (ft): {mature_height}</p>) : <></>}
                            {shade_tolerance ? (<p>Shade Tolerance: {shade_tolerance}</p>) : <></>}
                            {fruit_seed_color ? (<p>Fruit or Seed Color: {fruit_seed_color}</p>) : <></>}
                            {bloom_period ? (<p>Bloom Period: {bloom_period}</p>) : <></>}
                            {growth_period ? (<p>Growth Period: {growth_period}</p>) : <></>}
                            {flower_color ? (<p>Flower Color: {flower_color}</p>) : <></>}
                            <Divider className={classes.divider} />
                            <Button
                                className={classes.button}
                                size='small'
                                color='primary'
                                variant='outlined'
                                onClick={handleOpen}
                            >Save Info</Button>
                            <Button
                                size='small'
                                color='primary'
                                variant='outlined'
                                onClick={() => window.location.replace('/')}
                            >More Plants</Button>
                        </Paper>
                    </Container>
                    <Footer />
                </>
                ) : <Redirect to={{ pathname: '/signin' }} />
            }
        </>
    )
}

export default PlantInfo