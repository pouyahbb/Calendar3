import React , {useContext} from 'react'
// Material
import CalendarTodayIcon from '@material-ui/icons/CalendarToday'
import LanguageIcon from '@material-ui/icons/Language'
// Other
import classes from './bodyContent.module.scss'
import { ContentContext} from './../../../../../content/contentContext'

export const BodyContent = ({
	matches,
	date,
	time,
	tenMinuteAfter,
	timeZone,
}) => {
	const content = useContext(ContentContext)
	return (
		<>
			<div className={classes.ConfirmTenMinuteText}>
				<div className={classes.ConfirmCirculeIcon}></div>
				<h3 style={{ fontSize: matches && '15px' }}>
					{' '}
					{content.confirmPage[3].text}{' '}
				</h3>
			</div>
			<div>
				<div className={classes.ConfirmTimeAndDate}>
					<CalendarTodayIcon />
					<span style={{ fontSize: matches && '13px' }}>
						{time.split('-').join('')} - {time.split(':')[0]}:{tenMinuteAfter}
						{time.split(':')[1].split('-')[1]}, {date}{' '}
					</span>
				</div>
				<div className={classes.ConfirmTimeZone}>
					<LanguageIcon />
					<span>{timeZone}</span>
				</div>
			</div>
		</>
	)
}

export default BodyContent
