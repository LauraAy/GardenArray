import React, { useContext, useEffect } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import {
    makeStyles,
    Container,
    Typography,
    Divider,
    Paper,
    Button,
    TextField
} from '@material-ui/core'
import { Redirect } from 'react-router-dom'
import PlantContext from '../../utils/PlantContext'
import PlantInfoContext from '../../utils/PlantInfoContext'
import UserContext from '../../utils/UserContext'

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
    },
    addBtn: {
        marginRight: 4
    },
    editBtns: {
        margin: 8
    },
    editTextFields: {
        margin: 6,
        width: '100%'
    }
}))

const SavedPlantInfo = () => {

    const classes = useStyles()
    const {
        isLoggedIn,
        edit,
        handleToggleEdit
    } = useContext(UserContext)
    const {
        saved_common_name,
        saved_scientific_name,
        saved_family_common_name,
        saved_duration,
        saved_precipitation_max,
        saved_precipitation_min,
        saved_native_status,
        saved_growth_habit,
        saved_foliage_color,
        saved_lifespan,
        saved_drought_tolerance,
        saved_mature_height,
        saved_shade_tolerance,
        saved_fruit_seed_color,
        saved_bloom_period,
        saved_growth_period,
        saved_flower_color,
        saved_plant_qty,
        handleUpdateSavedPlant,
        handlePlantInputchange,
        handleRemovePlant
    } = useContext(PlantInfoContext)

    const {
        handleSavedPlantRender
    } = useContext(PlantContext)
    const gardenId = (window.location.pathname).slice(13, 37)
    const plantIndex = (window.location.pathname).slice(38)

    useEffect(() => {
        handleSavedPlantRender(gardenId, plantIndex)
        // eslint-disable-next-line
    }, [isLoggedIn])

    return (
        <>
            {isLoggedIn ?
                (<>
                    <Navbar />
                    <Container>
                        <Paper elevation={3} className={classes.paper}>
                            {edit ?
                                (
                                    <>
                                        <form>
                                            <TextField
                                                className={classes.editTextFields}
                                                id="common_name"
                                                label="Common Name"
                                                name='saved_common_name'
                                                defaultValue={saved_common_name}
                                                onChange={handlePlantInputchange}
                                                variant="outlined"
                                            />
                                            <TextField
                                                className={classes.editTextFields}
                                                id="scientific_name"
                                                label="Scientific Name"
                                                name='saved_scientific_name'
                                                defaultValue={saved_scientific_name}
                                                onChange={handlePlantInputchange}
                                                variant="outlined"
                                            />
                                            <TextField
                                                className={classes.editTextFields}
                                                id="family_common_name"
                                                label="Family Common Name"
                                                name='saved_family_common_name'
                                                defaultValue={saved_family_common_name}
                                                onChange={handlePlantInputchange}
                                                variant="outlined"
                                            />
                                            <TextField
                                                className={classes.editTextFields}
                                                id="duration"
                                                label="Duration"
                                                name='saved_duration'
                                                defaultValue={saved_duration}
                                                onChange={handlePlantInputchange}
                                                variant="outlined"
                                            />
                                            <TextField
                                                className={classes.editTextFields}
                                                id="precipitation_max"
                                                label="Precipitation(MAX)"
                                                name='saved_precipitation_max'
                                                defaultValue={saved_precipitation_max}
                                                onChange={handlePlantInputchange}
                                                variant="outlined"
                                            />
                                            <TextField
                                                className={classes.editTextFields}
                                                id="precipitation_min"
                                                label="Precipitation(MIN)"
                                                name='saved_precipitation_min'
                                                defaultValue={saved_precipitation_min}
                                                onChange={handlePlantInputchange}
                                                variant="outlined"
                                            />
                                            <TextField
                                                className={classes.editTextFields}
                                                id="native_status"
                                                label="Native Status"
                                                name='saved_native_status'
                                                defaultValue={saved_native_status}
                                                onChange={handlePlantInputchange}
                                                variant="outlined"
                                            />
                                            <TextField
                                                className={classes.editTextFields}
                                                id="growth_habit"
                                                label="Growth Habit"
                                                name='saved_growth_habit'
                                                defaultValue={saved_growth_habit}
                                                onChange={handlePlantInputchange}
                                                variant="outlined"
                                            />
                                            <TextField
                                                className={classes.editTextFields}
                                                id="foliage_color"
                                                label="Foliage Color"
                                                name='saved_foliage_color'
                                                defaultValue={saved_foliage_color}
                                                onChange={handlePlantInputchange}
                                                variant="outlined"
                                            />
                                            <TextField
                                                className={classes.editTextFields}
                                                id="lifespan"
                                                label="Lifespan"
                                                name='saved_lifespan'
                                                defaultValue={saved_lifespan}
                                                onChange={handlePlantInputchange}
                                                variant="outlined"
                                            />
                                            <TextField
                                                className={classes.editTextFields}
                                                id="drought_tolernace"
                                                label="Drought Tolerance"
                                                name='saved_drought_tolerance'
                                                defaultValue={saved_drought_tolerance}
                                                onChange={handlePlantInputchange}
                                                variant="outlined"
                                            />
                                            <TextField
                                                className={classes.editTextFields}
                                                id="mature_height"
                                                label="Mature Height(ft)"
                                                name='saved_mature_height'
                                                defaultValue={saved_mature_height}
                                                onChange={handlePlantInputchange}
                                                variant="outlined"
                                            />
                                            <TextField
                                                className={classes.editTextFields}
                                                id="shade_tolerance"
                                                label="Shade Tolerance"
                                                name='saved_shade_tolerance'
                                                defaultValue={saved_shade_tolerance}
                                                onChange={handlePlantInputchange}
                                                variant="outlined"
                                            />
                                            <TextField
                                                className={classes.editTextFields}
                                                id="fruit_seed_color"
                                                label="Fruit Seed Color"
                                                name='saved_fruit_seed_color'
                                                defaultValue={saved_fruit_seed_color}
                                                onChange={handlePlantInputchange}
                                                variant="outlined"
                                            />
                                            <TextField
                                                className={classes.editTextFields}
                                                id="bloom_period"
                                                label="Bloom Period"
                                                name='saved_bloom_period'
                                                defaultValue={saved_bloom_period}
                                                onChange={handlePlantInputchange}
                                                variant="outlined"
                                            />
                                            <TextField
                                                className={classes.editTextFields}
                                                id="growth_period"
                                                label="Growth Period"
                                                name='saved_growth_period'
                                                defaultValue={saved_growth_period}
                                                onChange={handlePlantInputchange}
                                                variant="outlined"
                                            />
                                            <TextField
                                                className={classes.editTextFields}
                                                id="flower_color"
                                                label="Flower Color"
                                                name='saved_flower_color'
                                                defaultValue={saved_flower_color}
                                                onChange={handlePlantInputchange}
                                                variant="outlined"
                                            />
                                            <TextField
                                                className={classes.editTextFields}
                                                id="plant_qty"
                                                label="Plant Qty"
                                                name='saved_plant_qty'
                                                defaultValue={saved_plant_qty}
                                                onChange={handlePlantInputchange}
                                                variant="outlined"
                                            />
                                            <div className={classes.editBtns}>
                                                <Button
                                                variant="outlined"
                                                onClick={(e) => handleUpdateSavedPlant(e, gardenId, plantIndex)}
                                                >Save</Button>
                                                <Button
                                                    variant="contained"
                                                    color="secondary"
                                                    className={classes.editBtns}
                                                    onClick={() => window.location.replace(window.location.pathname)}
                                                >Cancel</Button>
                                            </div>
                                        </form>
                                    </>
                                ) : (
                                    <div>
                                        {saved_common_name ?
                                            (
                                                <>
                                                    <Typography variant='h5' className={classes.text}>
                                                        Common Name:
                                                        </Typography>
                                                    <Typography variant='h4' className={classes.text}>
                                                        {saved_common_name}
                                                    </Typography>
                                                </>
                                            ) : <></>}
                                        {saved_scientific_name ?
                                            (<Typography variant='subtitle1'>
                                                Scientific Name: {saved_scientific_name}
                                            </Typography>) : <></>}
                                        {saved_family_common_name ? (<p>Family Common Name: {saved_family_common_name}</p>) : <></>}
                                        {saved_duration ? (<p>Duration: {saved_duration}</p>) : <></>}
                                        {saved_precipitation_max ? (<p>Precipitation(MAX): {saved_precipitation_max}</p>) : <></>}
                                        {saved_precipitation_min ? (<p>Precipitation(MIN): {saved_precipitation_min}</p>) : <></>}
                                        {saved_native_status ? (<p>Native Status: {saved_native_status}</p>) : <></>}
                                        {saved_growth_habit ? (<p>Growth Habit: {saved_growth_habit}</p>) : <></>}
                                        {saved_drought_tolerance ? (<p>Drought Tolerance: {saved_drought_tolerance}</p>) : <></>}
                                        {saved_foliage_color ? (<p>Foliage Color: {saved_foliage_color}</p>) : <></>}
                                        {saved_lifespan ? (<p>Lifespan: {saved_lifespan}</p>) : <></>}
                                        {saved_mature_height ? (<p>Mature Height (ft): {saved_mature_height}</p>) : <></>}
                                        {saved_shade_tolerance ? (<p>Shade Tolerance: {saved_shade_tolerance}</p>) : <></>}
                                        {saved_fruit_seed_color ? (<p>Fruit or Seed Color: {saved_fruit_seed_color}</p>) : <></>}
                                        {saved_bloom_period ? (<p>Bloom Period: {saved_bloom_period}</p>) : <></>}
                                        {saved_growth_period ? (<p>Growth Period: {saved_growth_period}</p>) : <></>}
                                        {saved_flower_color ? (<p>Flower Color: {saved_flower_color}</p>) : <></>}
                                        <p>Qty: {saved_plant_qty}</p>
                                        <Divider className={classes.divider} />
                                        <Button
                                            variant="outlined"
                                            className={classes.addBtn}
                                            onClick={() => handleToggleEdit()}
                                        >Edit/Add Info</Button>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={() => handleRemovePlant(gardenId)}
                                        >Remove</Button>
                                    </div>)}
                        </Paper>
                    </Container>
                    <Footer />
                </>
                ) : <Redirect to={{ pathname: '/signin' }} />
            }
        </>
    )
}

export default SavedPlantInfo