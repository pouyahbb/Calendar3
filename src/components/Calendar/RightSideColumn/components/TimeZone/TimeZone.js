import React, { useState, useCallback, useEffect, useContext } from 'react'
// Animation
import { Fade } from 'react-reveal'
// Other
import Form from './Form/Form'
import Button from './Form/components/Button/Button'
import { withRouter } from 'react-router-dom'
import moment from 'moment'
import momentTz from 'moment-timezone'
import classes from './style/timeZone.module.scss'
import axios from 'axios'
import { ContentContext } from '../../../../../content/contentContext'
// Material
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'
// Scrollbar
import { mapValues } from 'lodash'
import 'react-perfect-scrollbar/dist/css/styles.css'
import PerfectScrollbar from 'react-perfect-scrollbar'

export const TimeZone = ({ history, routeName, timeZone, date }) => {
	const [buttonsVisibility, setButtonsVisibility] = useState({})
	const [isConfirmed, setConfirmed] = useState(false)
	const [times, setTimes] = useState([])
	const [loading, setLoading] = useState(false)

	const content = useContext(ContentContext)

	useEffect(() => {
		if (timeZone) {
			const generateTimeStamp = momentTz
				.tz(date._d.getTime(), timeZone)
				.format()
			setLoading(true)
			axios
				.post(content.timeZone[0].url, {
					date: generateTimeStamp,
				})
				.then((response) => {
					setTimes(response.data)
					setLoading(false)
				})
				.catch((error) => {
					setLoading(false)
				})
		}
	}, [timeZone, date._d])

	const handleConfirmBtn = (selectedTime) => {
		const time = selectedTime.split(' ').join('-')
		setConfirmed(true)
		history.push(`/?date=${routeName}&time=${time}`)
	}

	const scrollbarOptions = {
		suppressScrollX: true,
		wheelPropagation: false,
	}

	const buttonVisibleHandler = useCallback(
		(time) =>
			setButtonsVisibility((prevState) => ({
				...mapValues(prevState, () => false),
				[time]: !prevState[time] ?? true,
			})),
		[]
	)

	return (
		<>
			{isConfirmed ? (
				<Form timeZone={timeZone} />
			) : (
				<PerfectScrollbar
					style={{ height: '22rem', padding: '1rem' }}
					options={scrollbarOptions}
				>
					<>
						{loading && times.length === 0 ? (
							<div className={classes.loading}>
								<CircularProgress />
							</div>
						) : !loading && times.length > 0 ? (
							React.Children.toArray(
								times.map(({ date, disabled }, idx) => {
									const times = moment(date)
									const time = times.tz(timeZone).format('hh:mm a')
									return (
										// <Grid item key={idx}>
										<Fade>
											<Button
												click={buttonsVisibility[times]}
												setClick={() => buttonVisibleHandler(times)}
												time={time}
												disabled={disabled}
												HandleConfirmBtn={handleConfirmBtn}
											/>
										</Fade>
									)
								})
							)
						) : (
							<h6 className={classes.Text}>
								There is no time available at this day. Please choose another
								day
							</h6>
						)}
					</>
				</PerfectScrollbar>
			)}
		</>
	)
}

export default withRouter(TimeZone)
