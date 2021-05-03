import React, { useContext } from 'react'
// Material
import Grid from '@material-ui/core/Grid'
import CalendarTodayIcon from '@material-ui/icons/CalendarToday'
import AccessAlarmsIcon from '@material-ui/icons/AccessAlarms'
import LanguageIcon from '@material-ui/icons/Language'
// Other
import moment from 'moment'
// import content from '../../../../content/content.json'
import classes from './LeftSideContent.module.scss'
import { ContentContext } from './../../../../content/contentContext'

export const LeftSideContent = ({ dateAccept, date, route, timeZone }) => {
	const content = useContext(ContentContext)
	
	const formatTimeZone = timeZone.split('/').join('-')
	console.log(formatTimeZone)
	return (
		<div className={classes.LeftSideContent}>
			<div className={classes.CalendarIconAndText}>
				<Grid item>
					<CalendarTodayIcon color='inherit' className={classes.CalendarIcon} />
				</Grid>
				{dateAccept === true && (
					<Grid item>
						<h3 className={classes.Text}>
							{moment(date._d).format('dddd, MMMM D, YYYY')}
						</h3>
					</Grid>
				)}
			</div>
			<>
				<Grid item>
					{route[2] && route[2].length > 0 && (
						<div className={classes.AccessAlarmIconAndText}>
							<AccessAlarmsIcon className={classes.AlarmIcon} />
							<h3 className={classes.Text}>
								{content.leftSideColumn[1].text}
								<strong> {route[2]} </strong>
							</h3>
						</div>
					)}
				</Grid>
			</>
			<Grid item>
				<div className={classes.TimeZone}>
					<LanguageIcon />
					<h3 className={classes.Text}>
						{formatTimeZone ? formatTimeZone : 'Unknown'}
					</h3>
				</div>
			</Grid>
		</div>
	)
}

export default LeftSideContent
