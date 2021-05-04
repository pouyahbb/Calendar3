import React from 'react'
import config from './../../config/config.json'
import Home from '../../components/Home/Home'

export const HomePage = () => {

	return <Home config={config} />
}

export default HomePage
