import React from 'react'
// Material
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Toolbar from '@material-ui/core/Toolbar'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import Typography from '@material-ui/core/Typography'
// Other
import classes from './navbar.module.scss'
import { withRouter } from 'react-router-dom'

export const NavBar = ({ config, history }) => {
	const backToHome = () => {
		history.push('/')
	}

	const handleSignPage = () => {
		history.push('/signin')
	}

	return (
		<AppBar color='primary' position='static'>
			<Toolbar className={classes.Toolbar}>
				<Typography onClick={backToHome} variant='h6' className={classes.Logo}>
					{config.navBar[0].logo}
				</Typography>
				<div className={classes.Sing}>
					<Button
						onClick={handleSignPage}
						className={classes.SignBtn}
						size='medium'
						variant='outlined'
					>
						Sign-in <AccountCircleIcon className={classes.SignIcon} />
					</Button>
				</div>
			</Toolbar>
		</AppBar>
	)
}

export default withRouter(NavBar)
