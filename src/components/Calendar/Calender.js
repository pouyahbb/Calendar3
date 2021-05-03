import React, { useState } from 'react'
// Animation
import { Fade } from 'react-reveal'
// DatePicker
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import Grid from '@material-ui/core/Grid'
import useMediaQuery from '@material-ui/core/useMediaQuery'
// Other components
import MomentUtils from '@date-io/moment'
import timeZone from 'moment-timezone'
import queryString from 'query-string'
import { useLocation } from 'react-router-dom'
import classes from './calendar.module.scss'
import _ from 'lodash'
import LeftSideColumn from './LeftSideColumn/LeftSideColumn'
import RightSideColumn from './RightSideColumn/RightSideColumn'
import ConfirmPage from './Confirm/Confirm'
import { ContentContext } from '../../content/contentContext'
import content from '../../content/content.json'
import { withRouter } from 'react-router-dom'

export const Calendar = ({ history }) => {
	const { search } = useLocation()
	const {
		date,
		time,
		email,
		firstName,
		lastName,
		companyName,
		phoneNumber,
	} = queryString.parse(search)
	// This state is emergency for 'material DatePicker' library,  which we use inside the both columns
	const [selectedDate, setSelectedDate] = useState(new Date())
	const [dateAccept, setDateAccept] = useState(false)
	const [routeName, setRoutName] = useState(null)
	const [timeZoneSelect, setTimeZoneSelect] = useState(timeZone.tz.guess())

	const handleTimeZoneChange = (value) => {
		setTimeZoneSelect(value)
	}
	// It's for DatePicker onAccept props
	const handleAcceptedDate = (date) => {
		setDateAccept((prevState) => !prevState)
		const routeName = _.split(date._d, ' ', 4).join('-')
		setRoutName(routeName)
		history.push(`/?date=${routeName}`)
	}
	const handleBackButton = () => {
		history.push(`/`)
		setSelectedDate(null)
		setDateAccept(false)
	}
	// For responsive
	const matches = useMediaQuery('(max-width : 1143px)')
	const matches2 = useMediaQuery(`(max-width : 500px)`)

	return (
		<ContentContext.Provider value={content}>
			{date &&
			time &&
			email &&
			firstName &&
			lastName &&
			companyName &&
			phoneNumber ? (
				<div
					style={{ height: matches2 ? '40rem' : '30rem' }}
					className={classes.Confirm}
				>
					<Fade style={{ height: '100%' }}>
						<ConfirmPage
							style={{ border: '1px solid #3333' }}
							date={date}
							time={time}
							timeZone={timeZoneSelect}
						/>
					</Fade>
				</div>
			) : (
				<MuiPickersUtilsProvider utils={MomentUtils}>
					<Grid
						className={classes.ColumnWrapper}
						style={{ height: matches ? '60rem' : '35rem' }}
						container
						justify='space-around'
					>
						<Grid item xs>
							<LeftSideColumn
								shouldChangeResponse={matches}
								date={selectedDate}
								handleBackBtn={() => handleBackButton()}
								handleAcceptedDate={handleAcceptedDate}
								dateAccept={dateAccept}
								timeZone={timeZoneSelect}
							/>
						</Grid>
						<Grid
							item
							xs={matches && 12}
							style={{ margin: matches ? '0' : 'auto auto' }}
							className={classes.RightSide}
						>
							<RightSideColumn
								date={selectedDate}
								handleChange={setSelectedDate}
								handleAcceptedDate={handleAcceptedDate}
								dateAccept={dateAccept}
								routeName={routeName}
								timeZoneSelect={timeZoneSelect}
								handleTimeZoneChange={handleTimeZoneChange}
							/>
						</Grid>
					</Grid>
				</MuiPickersUtilsProvider>
			)}
		</ContentContext.Provider>
	)
}

export default withRouter(Calendar)
