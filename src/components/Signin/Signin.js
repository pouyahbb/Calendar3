import React, { useState } from 'react'
// Material
import TextField from '@material-ui/core/TextField'
import Input from '@material-ui/core/Input'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import IconButton from '@material-ui/core/IconButton'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Typography from '@material-ui/core/Typography'
import InputAdornment from '@material-ui/core/InputAdornment'
import Button from '@material-ui/core/Button'

// Other
import classes from './signin.module.scss'
import { configContext } from '../../config/configContext'

export const Signin = ({ config }) => {
	const [value, setValue] = useState({
		email: '',
		password: '',
		showPassword: false,
	})
	const handleChange = (event) => {
		const { name, value } = event.target
		setValue((prevState) => {
			return {
				...prevState,
				[name]: value,
			}
		})
	}

	const handleClickShowPassword = () => {
		setValue((prevState) => {
			return {
				...prevState,
				showPassword: !value.showPassword,
			}
		})
	}

	return (
		<configContext.Provider value={config}>
			<form className={classes.Singin}>
				<Typography className={classes.Text} variant='h5' component='h2'>
					{config.signinPageContent[2].text}
				</Typography>
				<TextField
					id='standard-full-width'
					label={config.signinPageContent[0].label}
					style={{ margin: 8 }}
					placeholder={config.signinPageContent[0].placeholder}
					helperText={config.signinPageContent[0].helperText}
					onChange={handleChange}
					value={value.email}
					name={config.signinPageContent[0].name}
					margin='normal'
					InputLabelProps={{
						shrink: true,
					}}
				/>
				<FormControl className={classes.Password}>
					<InputLabel htmlFor='standard-adornment-password'>
						Password
					</InputLabel>
					<Input
						id='standard-adornment-password'
						type={value.showPassword ? 'text' : 'password'}
						value={value.password}
						onChange={handleChange}
						name={config.signinPageContent[1].name}
						endAdornment={
							<InputAdornment position='end'>
								<IconButton
									aria-label='toggle password visibility'
									onClick={handleClickShowPassword}
								>
									{value.showPassword ? <Visibility /> : <VisibilityOff />}
								</IconButton>
							</InputAdornment>
						}
					/>
				</FormControl>
				<Button variant='outlined' color='primary'>
					Sign in
				</Button>
			</form>
		</configContext.Provider>
	)
}

export default Signin
