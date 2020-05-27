import React, { useState } from 'react';
import { Route } from 'react-router-dom'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import LogIn from './pages/SignIn'
import Profile from './pages/Profile'
import ProfileInfo from './pages/ProfileInfo'
import ProfileEdit from './pages/ProfileEdit'
import CreateGarden from './pages/CreateGarden'
import { createMuiTheme, ThemeProvider } from '@material-ui/core'
import UserContext from './utils/UserContext'
import PlantContext from './utils/PlantContext'
import User from './utils/Users';
import Plant from './utils/Plant'
import PlantInfo from './pages/PlantInfo'
import SavedPlantInfo from './pages/SavedPlantInfo'
import Garden from './utils/Garden'
import GardenContext from './utils/GardenContext';
import PlantInfoContext from './utils/PlantInfoContext'

function App() {

  const theme = createMuiTheme({
    typography: {
      fontFamily: [
        'Nanum Gothic',
        'sans-serif'
      ].join(','),
    }
  });

  const [userState, setUserState] = useState({
    user: '',
    first: '',
    last: '',
    username: '',
    email: '',
    password: '',
    editUser: localStorage.getItem('username'),
    editFirst: localStorage.getItem('first_name'),
    editLast: localStorage.getItem('last_name'),
    editEmail: localStorage.getItem('email'),
    redirect: false,
    edit: false,
    isLoggedIn: localStorage.getItem('isLoggedIn')
  });

  const [plantState, setPlantState] = useState({
    plants: [],
    result: 'No results',
    searchPlant: '',
    searchedPlant: '',
    sortBy: 'q',
    name: '',
    isInfo: false,
    currentPlant: {},
    completeData: 'completeData'
  });

  const [plantInfoState, setPlantInfoState] = useState({
    plant_id: '',
    common_name: '',
    scientific_name: '',
    family_common_name: '',
    duration: '',
    precipitation_max: '',
    precipitation_min: '',
    specifications: '',
    native_status: '',
    growth_habit: '',
    drought_tolerance: '',
    foliage_color: '',
    lifespan: '',
    mature_height: '',
    shade_tolerance: '',
    fruit_seed_color: '',
    bloom_period: '',
    growth_period: '',
    flower_color: '',
    saved_common_name: '',
    saved_scientific_name: '',
    saved_family_common_name: '',
    saved_duration: '',
    saved_precipitation_max: '',
    saved_precipitation_min: '',
    saved_specifications: '',
    saved_native_status: '',
    saved_growth_habit: '',
    saved_drought_tolerance: '',
    saved_foliage_color: '',
    saved_lifespan: '',
    saved_mature_height: '',
    saved_shade_tolerance: '',
    saved_fruit_seed_color: '',
    saved_bloom_period: '',
    saved_growth_period: '',
    saved_flower_color: '',
    saved_plant_qty: ''
  })

  const [gardenState, setGardenState] = useState({
    garden: {},
    garden_name: '',
    about: '',
    location: '',
    my_garden: '',
    userGarden: [],
    userGardenSelect: ''
  })

  plantState.handlePlantInputChange = ({ target }) => {
    setPlantState({ ...plantState, [target.name]: target.value })
  }

  plantState.handleSelectInputChange = ({ target }) => {
    setPlantState({ ...plantState, [target.name]: target.value })
  }

  gardenState.handleGardenInputChange = ({ target }) => {
    setGardenState({ ...gardenState, [target.name]: target.value })
  }

  // User Handlers
  userState.handleInputChange = ({ target }) => {
    setUserState({ ...userState, [target.name]: target.value })
  }

  userState.handleProfileEditChange = ({ target }) => {
    setUserState({ ...userState, [target.name]: target.value })
  }

  userState.handleRegisterUser = event => {
    event.preventDefault()
    const user = {
      first_name: userState.first,
      last_name: userState.last,
      username: userState.username,
      email: userState.email,
      password: userState.password
    }

    User.register(user)
      .then(() => {
        setUserState({ ...userState, redirect: true })
      })
      .catch(e => console.error(e))
  }

  userState.handleSignInUser = event => {
    event.preventDefault()
    localStorage.setItem('username', userState.username)
    const user = {
      username: userState.username,
      password: userState.password
    }

    User.login(user)
      .then(({ data }) => {
        localStorage.setItem('jwt', data.token)
        localStorage.setItem('isLoggedIn', data.isLoggedIn)
        setUserState({ ...userState, username: '', password: '', isLoggedIn: data.isLoggedIn })
      })
      .catch(e => console.error(e))

    User.getOneUser(userState.username)
      .then(({ data: userData }) => {
        localStorage.setItem('id', userData._id)
        localStorage.setItem('username', userData.username)
        localStorage.setItem('first_name', userData.first_name)
        localStorage.setItem('last_name', userData.last_name)
        localStorage.setItem('email', userData.email)
        setUserState({ ...userState, user: userData })
        // window.location.replace(`/user/${userData._id}`)
      })
      .catch(e => console.error(e))

    User.editUserInfo(localStorage.getItem('id'), user)
      .then(({ data }) => {
        localStorage.setItem('username', data.username)
        localStorage.setItem('first_name', data.first_name)
        localStorage.setItem('last_name', data.last_name)
        localStorage.setItem('email', data.email)
        window.location.replace(`/user/${localStorage.getItem('id')}`)
      })
      .catch(e => console.error(e))
  }

  userState.handleEditProfileSubmit = event => {
    event.preventDefault()

    const user = {
      first_name: userState.editFirst,
      last_name: userState.editLast,
      username: userState.editUser,
      email: userState.edutEmail
    }
    User.editUserInfo(localStorage.getItem('id'), user)
      .then(({ data }) => {
        localStorage.setItem('username', data.username)
        localStorage.setItem('first_name', data.first_name)
        localStorage.setItem('last_name', data.last_name)
        localStorage.setItem('email', data.email)
        window.location.replace(`/info/${localStorage.getItem('id')}`)
      })
      .catch(e => console.error(e))
  }

  userState.handleLogOut = () => {
    localStorage.clear()
    setUserState({ ...userState, isLoggedIn: false })
  }
  // Plant Handlers 
  plantState.handlePlantInputChange = ({ target }) => {
    setPlantState({ ...plantState, [target.name]: target.value })
  }

  plantState.handleSelectInputChange = ({ target }) => {
    setPlantState({ ...plantState, [target.name]: target.value })
  }

  plantInfoState.handlePlantInfoSearch = (id) => {
    window.location.replace(`/plant_info/${id}`)
  }

  plantState.handleSearchPlant = event => {
    event.preventDefault()
    Plant.getPlants(plantState.sortBy, plantState.searchPlant, plantState.completeData)
      .then(({ data: plantsObj }) => {
        let resultCount = plantsObj.length
        let searchedPlantResult = plantState.searchPlant
        setPlantState({ ...plantState, plants: plantsObj, result: resultCount, searchedPlant: ` for '${searchedPlantResult}'`, searchPlant: '' })
      })
      .catch(e => console.error(e))
  }

  plantInfoState.handleRenderPlant = id => {
    Plant.getPlantInfoPage(id)
      .then(({ data }) => {
        setPlantInfoState({
          ...plantInfoState,
          plant_id: data.id,
          common_name: data.common_name,
          scientific_name: data.scientific_name,
          family_common_name: data.family_common_name,
          duration: data.duration,
          precipitation_max: data.main_species.growth.precipitation_maximum.inches,
          precipitation_min: data.main_species.growth.precipitation_minimum.inches,
          native_status: data.native_status,
          growth_habit: data.main_species.specifications.growth_habit,
          foliage_color: data.main_species.foliage.color,
          lifespan: data.main_species.specifications.lifespan,
          drought_tolerance: data.main_species.growth.drought_tolerance,
          mature_height: data.main_species.specifications.mature_height.ft,
          shade_tolerance: data.main_species.growth.shade_tolerance,
          fruit_seed_color: data.main_species.fruit_or_seed.color,
          bloom_period: data.main_species.seed.bloom_period,
          growth_period: data.main_species.specifications.growth_period,
          flower_color: data.main_species.flower.color,
        })
      })
      .catch(e => console.error(e))
  }

  // Add Plant to Garden
  plantState.handleSavePlant = (e, gardenid, plantId) => {
    e.preventDefault()
    let plantObj = {
      saved_plant_id: plantId,
      saved_common_name: plantInfoState.common_name,
      saved_scientific_name: plantInfoState.scientific_name,
      saved_family_common_name: plantInfoState.family_common_name,
      saved_duration: plantInfoState.duration,
      saved_precipitation_max: plantInfoState.precipitation_max,
      saved_precipitation_min: plantInfoState.precipitation_min,
      saved_native_status: plantInfoState.native_status,
      saved_growth_habit: plantInfoState.growth_habit,
      saved_foliage_color: plantInfoState.foliage_color,
      saved_lifespan: plantInfoState.lifespan,
      saved_drought_tolerance: plantInfoState.drought_tolerance,
      saved_mature_height: plantInfoState.mature_height,
      saved_shade_tolerance: plantInfoState.shade_tolerance,
      saved_fruit_seed_color: plantInfoState.fruit_seed_color,
      saved_bloom_period: plantInfoState.bloom_period,
      saved_growth_period: plantInfoState.growth_period,
      saved_flower_color: plantInfoState.flower_color,
      saved_plant_qty: 1
    }

    Plant.savePlantToGarden(gardenid, plantObj)
      .then(() => { window.location.replace(`/user/${localStorage.getItem('id')}`) })
      .catch(e => console.error(e))
  }

  plantState.handleSavedPlantSearch = (gardenId, plantIndex) => {
    window.location.replace(`/saved_plant/${gardenId}/${plantIndex}`)
  }

  plantState.handleSavedPlantRender = (gardenid, plantindex) => {
    Plant.getSavedPlant(gardenid)
      .then(({ data }) => {
        setPlantInfoState({
          ...plantInfoState,
          saved_common_name: data.plants[plantindex].saved_common_name,
          saved_scientific_name: data.plants[plantindex].saved_scientific_name,
          saved_family_common_name: data.plants[plantindex].saved_family_common_name,
          saved_duration: data.plants[plantindex].saved_duration,
          saved_precipitation_max: data.plants[plantindex].saved_precipitation_max,
          saved_precipitation_min: data.plants[plantindex].saved_precipitation_min,
          saved_native_status: data.plants[plantindex].saved_native_status,
          saved_growth_habit: data.plants[plantindex].saved_growth_habit,
          saved_foliage_color: data.plants[plantindex].saved_foliage_color,
          saved_lifespan: data.plants[plantindex].saved_lifespan,
          saved_drought_tolerance: data.plants[plantindex].saved_drought_tolerance,
          saved_mature_height: data.plants[plantindex].saved_mature_height,
          saved_shade_tolerance: data.plants[plantindex].saved_shade_tolerance,
          saved_fruit_seed_color: data.plants[plantindex].saved_fruit_seed_color,
          saved_bloom_period: data.plants[plantindex].saved_bloom_period,
          saved_growth_period: data.plants[plantindex].aved_growth_period,
          saved_flower_color: data.plants[plantindex].saved_flower_color,
          saved_plant_qty: data.plants[plantindex].saved_plant_qty
        })
      })
      .catch(e => console.error(e))
  }

  // Garden Functions
  gardenState.handleSelectInputChange = ({ target }) => {
    setGardenState({ ...gardenState, [target.name]: target.value })
  }

  gardenState.handleRenderGardenNames = () => {
    Garden.getGardenByUser(localStorage.getItem('id'))
      .then(({ data }) => {
        setGardenState({ ...gardenState, userGarden: data.gardens, userGardenSelect: data.gardens[0]._id })
      })
      .catch(e => console.error(e))
  }

  gardenState.handleCreateGarden = event => {
    event.preventDefault()

    const garden = {
      garden_name: gardenState.garden_name,
      about: gardenState.about,
      location: gardenState.location,
      my_garden: gardenState.my_garden,
      userId: localStorage.getItem('id')
    }

    Garden.create(garden)
      .then(({ data }) => {
        setGardenState({ ...gardenState, redirect: true, garden, userGardenSelect: data.gardens[0] })
      })
      .catch(e => console.error(e))
  }

  gardenState.handleGetAllGardens = () => {
    window.location.replace(`/user/${localStorage.getItem('id')}`)
  }

  // Edit Toggle
  userState.handleToggleEdit = () => {
    setUserState({ ...userState, edit: true })
  }

  userState.handleToggleEditFalse = (e) => {
    e.preventDefault()
    setUserState({ ...userState, edit: false })
  }

  // Save Garden Edit
  gardenState.handleGardenEdit = (e, obj) => {
    e.preventDefault()

    let gardenChanges = {
      garden_name: gardenState.garden_name,
      about: gardenState.about,
      location: gardenState.location
    }

    if (gardenChanges.garden_name === '') {
      gardenChanges.garden_name = obj.garden_name
    }
    if (gardenChanges.about === '') {
      gardenChanges.about = obj.about
    }
    if (gardenChanges.location === '') {
      gardenChanges.location = obj.location
    }

    Garden.updateGardenInfo(obj._id, gardenChanges)
      .then(() => {
        window.location.replace(`/user/${localStorage.getItem('id')}`)
      })
      .catch(e => console.error(e))
  }

  gardenState.handleGardenDelete = (e, gardenid) => {
    e.preventDefault()

    Garden.delete(gardenid)
      .then(() => window.location.replace(window.location.pathname))
      .catch(e => console.error(e))
  }

  // Update Saved Plant
  plantInfoState.handlePlantInputchange = ({ target }) => {
    setPlantInfoState({ ...plantInfoState, [target.name]: target.value })
  }

  plantInfoState.handleUpdateSavedPlant = (e, gardenid, plantindex) => {
    e.preventDefault()

    const savedPlantObj = {
      saved_common_name: plantInfoState.saved_common_name,
      saved_scientific_name: plantInfoState.saved_scientific_name,
      saved_family_common_name: plantInfoState.saved_family_common_name,
      saved_duration: plantInfoState.saved_duration,
      saved_precipitation_max: plantInfoState.saved_precipitation_max,
      saved_precipitation_min: plantInfoState.saved_precipitation_min,
      saved_native_status: plantInfoState.saved_native_status,
      saved_growth_habit: plantInfoState.saved_growth_habit,
      saved_foliage_color: plantInfoState.saved_foliage_color,
      saved_lifespan: plantInfoState.saved_lifespan,
      saved_drought_tolerance: plantInfoState.saved_drought_tolerance,
      saved_mature_height: plantInfoState.saved_mature_height,
      saved_shade_tolerance: plantInfoState.saved_shade_tolerance,
      saved_fruit_seed_color: plantInfoState.saved_fruit_seed_color,
      saved_bloom_period: plantInfoState.saved_bloom_period,
      saved_growth_period: plantInfoState.saved_growth_period,
      saved_flower_color: plantInfoState.saved_flower_color,
      saved_plant_qty: plantInfoState.saved_plant_qty
    }

    Plant.getSavedPlant(gardenid)
      .then(({ data }) => {

        let oldAndNew = {
          oldPlant: data.plants[plantindex],
          newPlant: savedPlantObj
        }

        Plant.updateSavedPlant(gardenid, oldAndNew)
          .then(() => {
            window.location.replace(window.location.pathname)
          })
          .catch(e => console.error(e))
      })
      .catch(e => console.error(e))
  }

  plantInfoState.handleRemovePlant = (gardenid) => {

    const savedPlantObj = {
      saved_common_name: plantInfoState.saved_common_name,
      saved_scientific_name: plantInfoState.saved_scientific_name,
      saved_family_common_name: plantInfoState.saved_family_common_name,
      saved_duration: plantInfoState.saved_duration,
      saved_precipitation_max: plantInfoState.saved_precipitation_max,
      saved_precipitation_min: plantInfoState.saved_precipitation_min,
      saved_native_status: plantInfoState.saved_native_status,
      saved_growth_habit: plantInfoState.saved_growth_habit,
      saved_foliage_color: plantInfoState.saved_foliage_color,
      saved_lifespan: plantInfoState.saved_lifespan,
      saved_drought_tolerance: plantInfoState.saved_drought_tolerance,
      saved_mature_height: plantInfoState.saved_mature_height,
      saved_shade_tolerance: plantInfoState.saved_shade_tolerance,
      saved_fruit_seed_color: plantInfoState.saved_fruit_seed_color,
      saved_bloom_period: plantInfoState.saved_bloom_period,
      saved_growth_period: plantInfoState.saved_growth_period,
      saved_flower_color: plantInfoState.saved_flower_color,
      saved_plant_qty: plantInfoState.saved_plant_qty
    }

    Plant.removePlant(gardenid, {plant: savedPlantObj})
      .then(() => {
        window.location.replace(`/user/${localStorage.getItem('id')}`)
      })
      .catch(e => console.error(e))
  }

  return (
    <>
      <UserContext.Provider value={userState} >
        <GardenContext.Provider value={gardenState} >
          <PlantInfoContext.Provider value={plantInfoState}>
            <PlantContext.Provider value={plantState}>
              <ThemeProvider theme={theme} >
                <Route exact path="/" component={Home} />
                <Route exact path="/signup" component={SignUp} />
                <Route exact path="/signin" component={LogIn} />
                <Route path="/user/:userid" component={Profile} />
                <Route path="/info/:userid" component={ProfileInfo} />
                <Route path="/edit" component={ProfileEdit} />
                <Route path="/plant_info/:id" component={PlantInfo} />
                <Route path="/saved_plant/:plantindex" component={SavedPlantInfo} />
                <Route path="/creategarden" component={CreateGarden} />
              </ThemeProvider>
            </PlantContext.Provider>
          </PlantInfoContext.Provider>
        </GardenContext.Provider>
      </UserContext.Provider>
    </>
  );
}

export default App;