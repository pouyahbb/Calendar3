import React from 'react'
import Signin from './../../../components/Signin/Signin'
import config from './../../../config/config.json'

export const SigninPage = () => {
  return(
    <Signin  config={config} />
  )
}

export default SigninPage
