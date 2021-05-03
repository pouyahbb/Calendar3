import React, { useState } from 'react'
// Material
import Button from '@material-ui/core/Button'
// Other
import classes from './style/button.module.scss'

export const ButtonComponent = ({
	HandleConfirmBtn,
	time,
	click,
	setClick,
	disabled
}) => {
	const [selectedTime, setSelectedTime] = useState(null)
	
	const handleClick = (e) => {
		setSelectedTime(e.target.textContent)
		setClick(!click)
	}

	return (
		<>
			<div className={classes.TimeBtns}>
				<Button
					style={{
						width: click ? '49%' : '100%',
						backgroundColor: click && 'rgba(0, 0, 0, 0.6)',
						color: click && '#fff',
						borderColor: click && '#3333',
					}}
					className={classes.TimeBtn}
					variant='outlined'
					color='primary'
					onClick={handleClick}
					disabled={disabled}
				>
					{time}
				</Button>
				{click && (
					<Button
						style={{ display: !click && 'none', width: '49%' }}
						className={classes.ConfirmBtn}
						variant='contained'
						color='primary'
						onClick={() => HandleConfirmBtn(selectedTime)}
					>
						Confirm
					</Button>
				)}
			</div>
		</>
	)
}

export default ButtonComponent
