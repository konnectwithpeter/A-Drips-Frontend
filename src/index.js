import "@fontsource/quicksand";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

let theme = createTheme({
	typography: {
		fontFamily: "Quicksand,cursive",
		// fontWeight: "bold"
	},
	components: {
		MuiCssBaseline: {
			styleOverrides: `
			@font-face {
			  font-family: 'Quicksand';
			  font-style: normal;
			  font-display: swap;
			  font-weight: 400;
			  
			}
		  `,
		},
	},
	palette: {
		//mode: "dark",
		//primary: {
		//main: "#15131d",
		//},
		// 	secondary: {
		// 		main: "#edf2ff",
		// 	},
	},
});

ReactDOM.render(
	<Router>
		<ThemeProvider theme={theme}>
			<App />
		</ThemeProvider>
	</Router>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
