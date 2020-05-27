import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    footer: {
        height: '5rem',
        width: '100%'
    }
});


const PlantQueryCard = () => {

    const classes = useStyles();

    return (
        <div className={classes.footer} ></div>
    )
}

export default PlantQueryCard