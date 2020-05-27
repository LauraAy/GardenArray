import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import PlantContext from '../../utils/PlantContext'
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';

const useStylesImg = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function PlantInfo() {

  const classes = useStylesImg();
  const { currentPlant } = useContext(PlantContext)

  console.log(currentPlant)
  const { images, main_species } = currentPlant
  const { specifications, growth } = main_species

  // useEffect(() => {handleToggleInfo()}, [])

  //---------------- Images -------------------
  let plantImage
  if (images.length > 0) {
    const image = images[0]
    plantImage = image.url
  }
  else {
    plantImage = '****'
  }
  //---------------- Images END ----------------

  return (
    <>
      <div>
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <Card className={classes.root}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt="Plant Image not available"
                  height="140"
                  image={plantImage}
                  title="Plant Details"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {currentPlant.common_name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    The gardens I admire most are relaxing, easy to move through, and not too hard to maintain.
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p" fontStyle="italic" m={1}>
                    Fine Gardening: https://www.finegardening.com/article/15-tips-for-designing-a-garden
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary">
                  Share
                </Button>
                <Button size="small" color="primary">
                  Learn More
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={6}>

            <Card className="classes" variant="outlined">
              <CardContent className="{classes.cardContent}">
                <Typography>Scientific Name:      {currentPlant.scientific_name}</Typography>
                <Typography>Common Name:          {currentPlant.common_name}</Typography>
                <Typography>Family Common Name:   {currentPlant.family_common_name}</Typography>
                <Typography>Duration:             {currentPlant.duration}</Typography>
                <Typography>precipitation_maximum (in.): {growth.precipitation_maximum.inches}</Typography>
                <Typography>precipitation_minimum (in.): {growth.precipitation_minimum.inches}</Typography>
                <Typography>specifications:              {specifications.toxicity}</Typography>
                <Typography>Native Status:     {currentPlant.native_status}</Typography>
                <Typography>Growth Habit:      {specifications.growth_habit}</Typography>
                <Typography>Drought Tolerance: {growth.drought_tolerance}</Typography>
                <Typography>Foliage Color:     {main_species.foliage.color}</Typography>
                <Typography>Lifespan:          {specifications.lifespan}</Typography>
                <Typography>Mature Height (ft):  {specifications.mature_height.ftn}</Typography>
                <Typography>Shade Tolerance:     {growth.shade_tolerance}</Typography>
                <Typography>Fruit or Seed Color: {main_species.fruit_or_seed.color}</Typography>
                <Typography>Bloom Period:        {main_species.seed.bloom_period}</Typography>
                <Typography>Palatable Human:     {main_species.products.palatable_human}</Typography>
                <Typography>Growth Period:       {specifications.growth_period}</Typography>
                <Typography>Flower Color:        {main_species.flower.color}</Typography>
                <Typography>Duration:            {currentPlant.duration}</Typography>

                <br></br><br></br>

                <Box boxShadow={3}>
                  <form className="Form" noValidate autoComplete="off">
                    <TextField id="filled-basic" label="Add Notes:" variant="filled"
                      fullWidth
                      margin="normal"
                      InputLabelProps={{ shrink: true, }} />
                  </form>
                </Box>

              </CardContent>
              <CardActions>
                <Button href={`/plants/${currentPlant.common_name}`} size="small" color="primary">Save</Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </div>
    </>
  );
}