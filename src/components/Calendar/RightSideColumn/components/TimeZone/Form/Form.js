import React, { useState , useContext } from 'react'
// Animation
import { Fade } from 'react-reveal'
// Material
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
// Other
import { FormValidation } from './components/formValidation/formValidation'
import axios from 'axios'
import Fileds from './components/Fields/Fields'
import classes from './style/form.module.scss'
// import content from '../../../../../../content/content.json'
import { ContentContext } from './../../../../../../content/contentContext'
import moment from 'moment'
import { withRouter } from 'react-router-dom'
import queryString from 'query-string'
import {formatPhoneNumber} from './components/formatPhoneNumber/phoneNumberFormatter'
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete'

export const Form = ({ history, location, timeZone }) => {
	const content = useContext(ContentContext)

	// For getting query parameters
	const queryParameters = location.search
	const { date, time } = queryString.parse(queryParameters)
	// For loading
	const [loading, setLoading] = useState(false)
	// For responsive
	const [responseValue, setResponseValue] = useState({})
	// User information
	const [companyLocation, setCompanyLocation] = useState({})
	// const [phoneNumber, setPhoneNumber] = useState('')
	const [value, setValue] = useState({
		phoneNumber: '',
		email: '',
		firstName: '',
		lastName: '',
	})
	// Error validation
	const [error, setError] = useState({
		isValid: true,
		message: '',
	})
	// Change time and date to UTC format
	let formatTime = moment(time.split('-').join(' '), ['h:mm A']).format(
		'HH:mm:ss'
	)
	let dateInput = moment(`${date.split('-').join(' ')} ${formatTime}`).format(
		content.formComponentContent[2].format
	)
	let format = content.formComponentContent[2].format
	let convertToUTC = moment.tz(dateInput, format, timeZone).utc().format(format)

	// For company location change
	const handleOptionSelect = (option, value) => {
		setResponseValue(value)
		geocodeByAddress(value.description)
			.then((results) => getLatLng(results[0]))
			.then((latLng) => {
				setCompanyLocation(latLng)
			})
			.catch((error) => console.error('Error', error))
	}
	const handleChange = (e) => {
		const { name, value } = e.target
		if (name === 'phoneNumber') {
			const formattedPhoneNumber = formatPhoneNumber(value)
			setValue({ phoneNumber: formattedPhoneNumber })
		} else {
			setValue((prevState) => {
				return {
					...prevState,
					[name]: value,
				}
			})
		}
	}

	const handleClick = () => {
		FormValidation(value, (data) => {
			if (data.isValid === false) {
				setError({
					isValid: data.isValid,
					message: data.message,
				})
			} else {
				setError({
					isValid: data.isValid,
					message: data.message,
				})
			}
		})
		setLoading(true)
		axios
			.post(content.formComponentContent[1].url, {
				date: convertToUTC,
				origin: content.formComponentContent[1].origin,
				user: {
					email: value.email,
					firstName: value.firstName,
					lastName: value.lastName,
					phone: value.phoneNumber,
					company: {
						address: responseValue.description || null,
						components: {
							city: null,
							country: responseValue.description || null,
							countryCode: null,
							locationName: null,
							number: null,
							state: null,
							stateCode: null,
							street: null,
							zipCode: null,
						},
						location: {
							lat: companyLocation.lat || null,
							lng: companyLocation.lng || null,
						},
						postalCode: null,
					},
				},
			})
			.then((response) => {
				console.log(response)
				setLoading(false)
				history.push(
					`/?date=${date}&time=${time}&email=${value.email}&firstName=${value.firstName}&lastName=${value.lastName}&companyName=${companyLocation}&phoneNumber=${value.phoneNumber}`
				)
			})
			.catch((error) => {
				console.log(error)
				setLoading(false)
			})
	}
	return (
		<>
			<div className={classes.Form}>
				{/* Handle errors Alert */}
				{content.formFieldsContent.map((field, index) => (
					<Fade bottom key={index}>
						<Grid container item>
							<Fileds
								field={field}
								handleChange={handleChange}
								handleOptionSelect={handleOptionSelect}
								value={value[field.name]}
							/>
						</Grid>
					</Fade>
				))}
				<Button
					onClick={handleClick}
					className={classes.AppointmentBtn}
					variant='outlined'
					color='primary'
					disabled={
						!value.email ||
						!value.lastName ||
						value.lastName.length <= 3 ||
						!value.firstName ||
						value.firstName.length <= 3 ||
						// !companyLocation ||
						!value.phoneNumber
					}
				>
					{loading ? (
						<CircularProgress />
					) : (
						content.formComponentContent[0].text
					)}
				</Button>
			</div>
		</>
	)
}

export default withRouter(Form)
