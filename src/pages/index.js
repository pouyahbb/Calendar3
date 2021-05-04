import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import HomePage from './Home/Home'
import SigninPage from './Sign/Singin/Signin'
import SignupPage from './Sign/Signup/Signup'
import NavBar from '../components/NavBar/Navbar'
import classes from './index.module.scss'
import config from './../config/config.json'

export const Delivery = () => {
	
	return (
		<div className={classes.Pages}>
			<Router>
				<NavBar config={config} />
				<Switch>
					<Route exact path='/' component={HomePage} />
					<Route path='/signin' component={SigninPage} />
					<Route path='/signup' component={SignupPage} />
				</Switch>
			</Router>
		</div>
	)
}

export default Delivery
