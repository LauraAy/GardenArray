import React, { useContext } from 'react'
import GardenInput from '../../components/GardenInput'
import Navbar from '../../components/Navbar'
import { Redirect } from 'react-router-dom'
import UserContext from '../../utils/UserContext'

const CreateGarden = () => {

  const { isLoggedIn } = useContext(UserContext)

  return (
    <>
      {isLoggedIn ?
        (<>
          <Navbar />
          <GardenInput />
        </>) : <Redirect to={{ pathname: '/signin' }} />}
    </>
  )
}

export default CreateGarden
