import React from 'react'
// Material
import MuiTextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'

// Other
import AutoComplete from './../AutoComplete/AutoComplete'
import classes from './style/fields.module.scss'

export const Fields = ({ field, handleChange, handleOptionSelect, value }) => {
	return (
		<Grid item xs={12}>
			{field.name === 'location' ? (
				<AutoComplete handleOptionSelect={handleOptionSelect} field={field} />
			) : (
				<MuiTextField
					className={classes.TextField}
					onChange={handleChange}
					label={field.label}
					type={field.type}
					value={value}
					required
					name={field.name}
					autoFocus={field.autoFocusFlag}
				/>
			)}
		</Grid>
	)
}

export default Fields
