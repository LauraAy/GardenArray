import {createContext} from 'react'

const GardenContext = createContext({
  garden: {},
  garden_name: '',
  about: '',
  location: '',
  my_garden: '',
  userGarden: [],
  userGardenSelect: '',
  handleSelectInputChange: () => {},
  handleGardenInputChange: () => {},
  handleCreateGarden: () => {},
  handleGetAllGardens: () => {},
  handleRenderGardenNames: () => {},
  handleGardenEdit: () => {},
  handleGardenDelete: () => {}
}) 

export default GardenContext;