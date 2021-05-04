import React from 'react'
import muiTheme from './theme'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider as SCThemeProvider } from 'styled-components'
import {
	ThemeProvider as MuiThemeProvider,
	StylesProvider,
} from '@material-ui/styles'

import Delivery from './Pages'

export const App = () => {
	return (
		<StylesProvider injectFirst>
			<MuiThemeProvider theme={muiTheme}>
				<SCThemeProvider theme={muiTheme}>
					<CssBaseline />
					<Delivery />
				</SCThemeProvider>
			</MuiThemeProvider>
		</StylesProvider>
	)
}

export default App
