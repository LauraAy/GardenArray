import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    CardContent,
    Card,
    CardActions,
    Divider
} from '@material-ui/core'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import PlantContext from '../../utils/PlantContext'
import PlantInfoContext from '../../utils/PlantInfoContext'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    listItemDiv: {
        width: '100%',
        [theme.breakpoints.down('sm')]: {
            width: '100%'
        }
    },
    noPlants: {
        paddingLeft: 24,
        paddingRight: 24
    },
    addPlantBtn: {
        margin: 4,
        fontSize: 10
    },
    menuItem: {
        fontSize: 14
    }
}));

export default function SimpleExpansionPanel(props) {
    const classes = useStyles();
    const { handleSavedPlantSearch } = useContext(PlantContext)
    const { handleRemovePlant } = useContext(PlantInfoContext)

    return (
        <div className={classes.root}>
            <ExpansionPanel disabled={props.disabled}>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography className={classes.heading}>{props.title}</Typography>
                </ExpansionPanelSummary>
                <Typography className={classes.heading}>Description: {props.about}</Typography>
                <Typography className={classes.heading}>Location: {props.location}</Typography>
                {props.plants.length > 0 ?
                    props.plants.map((data, i) => (
                        <Card key={i} className={classes.root}>
                            {console.log(data)}
                            <Divider />
                            <CardContent>
                                {data.saved_common_name ?
                                    (<Typography className={classes.title} color="textSecondary">
                                        Common Name: {data.saved_common_name}
                                    </Typography>)
                                    : (<Typography color="textSecondary">
                                        Scientific Name: {data.saved_scientific_name}
                                    </Typography>)}
                                <Typography className={classes.pos} color="textSecondary">
                                    Qty: {data.saved_plant_qty}x
                                </Typography>
                            </CardContent>
                            {console.log(props.gardenId)}
                            <CardActions>
                                <Button
                                    size="small"
                                    variant="outlined"
                                    onClick={() => handleSavedPlantSearch(props.gardenId, i)}
                                >View Info</Button>
                                <Button
                                    size="small"
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => handleRemovePlant(props.gardenId)}
                                >Remove</Button>
                            </CardActions>
                        </Card>)
                    ) :
                    (<>
                        <Typography
                            variant="subtitle2"
                            className={classes.noPlants}
                        >You do not have any plants in this garden!</Typography>
                    </>)}
                <Button
                    size='small'
                    className={classes.addPlantBtn}
                    variant="outlined"
                    onClick={() => window.location.replace('/')}
                ><AddIcon />Add Plant(s)</Button>
                <Divider />
            </ExpansionPanel>
        </div >
    );
}