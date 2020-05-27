import React, { useContext, useState } from 'react';
import GardenContext from '../../utils/GardenContext'
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Container } from '@material-ui/core'
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { green } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: green
  },
  stepper: {
    iconColor: green
  }
})

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
  },
  form: {
    width: '50%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  subtitle: {
    fontSize: 12
  },
  stepper: {
    padding: 0,
    margin: 4
  },
  pageTitle: {
    fontSize: 26,
    marginLeft: 6,
    marginTop: 12
  },
  stepLabelColor: {
    backgroundColor: '#4caf50'
  },
  description: {
    marginTop: 6
  }
}));

function getSteps() {
  return ['Garden Name', 'About Garden', 'Garden Location', 'Your Garden?'];
}


function getStepContent(
  step,
  garden_name,
  about,
  location,
  my_garden,
  handleGardenInputChange
) {
  switch (step) {
    case 0:
      return (
        <Container>
          <form>
            <FormLabel>What is your garden called?</FormLabel>
            <TextField
              id="standard-basic"
              margin="normal"
              required
              fullWidth
              label="Garden Name"
              name="garden_name"
              value={garden_name}
              onChange={handleGardenInputChange}
            />
          </form>
        </Container>
      );
    case 1:
      return (
        <Container>
          <form>
            <FormLabel>Write a short description about your garden.</FormLabel>
            <br />
            <TextField
              id="outlined-multiline-flexible"
              label="About Your Garden"
              multiline rowsMax="4"
              variant="outlined"
              name="about"
              value={about}
              onChange={handleGardenInputChange}
            />
          </form>
        </Container>
      )
    case 2:
      return (
        <Container>
          <form>
            <FormLabel>Where is your garden located?</FormLabel>
            <TextField
              id="standard-basic"
              margin="normal"
              required
              fullWidth
              label="location"
              name="location"
              value={location}
              onChange={handleGardenInputChange}
            />
          </form>
        </Container>
      )
    case 3:
      return (
        <Container>
          <FormControl component="fieldset">
            <FormLabel component="legend">Who's garden is this?</FormLabel>
            <RadioGroup aria-label="Whose Garden" name="my_garden" value={my_garden} onChange={handleGardenInputChange}>
              <FormControlLabel value="myGarden" control={<Radio />} label="This is my wonderful garden!" />
              <FormControlLabel value="otherGarden" control={<Radio />} label="A garden I've visited or want to visit someday!" />
            </RadioGroup>
          </FormControl>
        </Container>
      );
    default:
      return (
        <></>
      )
  }
}

export default function HorizontalLinearStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const steps = getSteps();
  const {
    garden_name,
    about,
    location,
    my_garden,
    handleGardenInputChange,
    handleCreateGarden
  } = useContext(GardenContext)

  const isStepOptional = (step) => {
    return step === (1, 2);
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const returnHome = () => {
    window.location.replace(`/user/${localStorage.getItem('id')}`)
  }

  const addPlants = () => {
    window.location.replace(`/`)
  }

  // const handleReset = () => {
  //   setActiveStep(0);
  // };

  return (
    <div className={classes.root}>
      <h1 className={classes.pageTitle}>Create a Garden!</h1>
      <ThemeProvider theme={theme}>
        <Stepper activeStep={activeStep} className={classes.stepper}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            if (isStepOptional(index)) {
              labelProps.optional = <Typography variant="caption">Optional</Typography>;
            }
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </ThemeProvider>
      <>
        {activeStep === steps.length ? (
          <Container>
            <Typography className={classes.instructions}>
              Your garden is created! Click below to either return to your 'My Gardens' page or to start adding plants to your new garden!
            </Typography>
            {/* <Button onClick={handleReset} className={classes.button}>
              Reset
            </Button> */}
            <ThemeProvider theme={theme}>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={() => returnHome()}
              >
                Return Home
            </Button>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={() => addPlants()}
              >
                Add Plants
            </Button>
            </ThemeProvider>
          </Container>
        ) : (
            <>
              <div className={classes.instructions}>{
                getStepContent(
                  activeStep,
                  garden_name,
                  about,
                  location,
                  my_garden,
                  handleGardenInputChange,
                  handleCreateGarden)}
              </div>
              <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                Back
              </Button>
              {isStepOptional(activeStep) && (
                <ThemeProvider theme={theme}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSkip}
                    className={classes.button}
                  >
                    Skip
                </Button>
                </ThemeProvider>
              )}
              <ThemeProvider theme={theme}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={(event) => {
                    if (activeStep === steps.length - 1) {
                      handleCreateGarden(event)
                    }
                    handleNext(event)
                  }}
                  className={classes.button}
                >
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </ThemeProvider>
            </>
          )}
      </>
    </div>
  );
}
//}
