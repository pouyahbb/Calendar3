import React, { useContext } from 'react'
// Animation
import { Fade } from 'react-reveal'
// Material
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import useMediaQuery from '@material-ui/core/useMediaQuery'
// Other
import _ from 'lodash'
// Config file that imported Strings that we used inside the components
// import content from '../../../content/content.json'
import { withRouter } from 'react-router-dom'
import classes from './style/leftSide.module.scss'
import LeftSideContent from './components/LeftSideContent'
import { ContentContext } from './../../../content/contentContext'

export const LeftSideColumn = ({
	dateAccept,
	handleBackBtn,
	date,
	history,
	shouldChangeResponse,
	timeZone,
}) => {
	const content = useContext(ContentContext)

	const route = _.split(history.location.pathname, '/')
	const matches = useMediaQuery(`(max-width : 1535px)`)
	return (
		<div
			style={{ height: shouldChangeResponse && '20rem' }}
			className={classes.LeftSide}
		>
			{dateAccept ? (
				<>
					<div className={classes.ArrowBack}>
						<IconButton onClick={handleBackBtn} color='inherit'>
							<ArrowBackIcon color='primary' fontSize='large' />
						</IconButton>
					</div>
					<h2
						style={{
							fontSize: matches ? '1.2rem' : '28px',
							position: 'absolute',
							top: shouldChangeResponse ? '24%' : '13%',
							left: '3%',
						}}
						className={classes.Text}
					>
						{content.leftSideColumn[0].text}
					</h2>
					<Grid container>
						<LeftSideContent
							dateAccept={dateAccept}
							date={date}
							route={route}
							timeZone={timeZone}
						/>
					</Grid>
				</>
			) : (
				<Fade>
					<h2
						style={{
							fontSize: matches ? '1.2rem' : '28px',
							position: 'absolute',
							top: shouldChangeResponse ? '24%' : '13%',
							left: '3%',
						}}
						className={classes.TextAlone}
					>
						{content.leftSideColumn[0].text}
					</h2>
				</Fade>
			)}
		</div>
	)
}

export default withRouter(LeftSideColumn)
