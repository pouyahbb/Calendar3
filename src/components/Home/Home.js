import React, { useState, useEffect } from 'react'
// Material
// import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField'
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined'
// Other
import Autocomplete from 'react-google-autocomplete'
import { configContext } from './../../config/configContext'

export const Home = ({ config }) => {
	const [address, setAddress] = useState([])

	return (
		<configContext.Provider value={config}>
			{/* <TextField
				onChange={(e) => {
					setAddress(e.target.value)
				}}
				value={address}
				label={config.homePageContent[0].text}
				variant='outlined'
				placeholder={config.homePageContent[1].text}
			/> */}
			<h1>Home</h1>
				<Autocomplete
					apiKey='AIzaSyBGeonjB2g_U8Ss1U8C6iRu7iujdix4BPA'
					onPlaceSelected={(place) => {
						console.log(place)
					}}
				/>
			
			{/* <PlacesAutocomplete value={address} onChange={setAddress}>
				{({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
					<Autocomplete
						id='size-small-standard'
						size='small'
						options={suggestions}
						autoHighlight
						renderOption={(option) => (
							<>
								<LocationOnOutlinedIcon />
								<span>{option.description}</span>
							</>
						)}
						forcePopupIcon
						handleHomeEndKeys
						// getOptionSelected={(option, value) =>
						// 	handleOptionSelect(option, value)
						// }
						loading={loading && true}
						loadingText={<CircularProgress />}
						// noOptionsText={content.autoCompleteContent[0].text + `"${address}"`}
						selectOnFocus
						getOptionLabel={(option) => option.description ?? ''}
						renderInput={(params) => (
							<Grid container spacing={1} alignItems='flex-end'>
								<Grid item>
									<LocationOnIcon />
								</Grid>
								<Grid xs item>
									<TextField
										{...params}
										variant='standard'
										required
										// label={field.label}
										{...getInputProps({
											placeholder: 'Destination',
										})}
									/>
								</Grid>
							</Grid>
						)}
					/>
				)}
			</PlacesAutocomplete> */}
		</configContext.Provider>
	)
}

export default Home
