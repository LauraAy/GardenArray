import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PlantContext from '../../utils/PlantContext'
import PlantInfoContext from '../../utils/PlantInfoContext'

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        marginTop: 8
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold'
    },
    pos: {
        marginBottom: 12,
    },
    cardContent: {
        paddingBottom: 0
    }
});


const PlantQueryCard = () => {

    const classes = useStyles();

    const { plants } = useContext(PlantContext)
    const { handlePlantInfoSearch } = useContext(PlantInfoContext)

    return (
        <>
            {plants.map((plantsMap, i) =>
                <Card key={i} className={classes.root} variant="outlined">
                    {console.log(plantsMap)}
                    <CardContent className={classes.cardContent}>
                        <Typography className={classes.title}>
                            Scientific Name:
                            </Typography>
                        <Typography>
                            {plantsMap.scientific_name}
                        </Typography>
                        {plantsMap.common_name ? (
                            <Typography className={classes.title}>
                                Common Name:
                            </Typography>) : <></>}
                        {plantsMap.common_name ? (
                            <Typography>
                                {plantsMap.common_name}
                            </Typography>) : <></>}
                    </CardContent>
                    <CardActions>
                        <Button onClick={() => handlePlantInfoSearch(plantsMap.id)} size="small">Learn More</Button>
                    </CardActions>
                </Card>)
            }
        </>
    )
}

export default PlantQueryCard