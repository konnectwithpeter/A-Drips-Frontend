import {
	Chip,
	FormControl,
	FormHelperText,
	InputAdornment,
	OutlinedInput
} from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import APIContext from "../context/APIContext";

const SubscribeForm = () => {
	let { API_URL } = useContext(APIContext);
	let [values, setValues] = useState({ email: "" });
	let [error, setError] = useState(false);
	let [success, setSuccess] = useState(false);

	const regex =
		/^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@(([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	const handleChange = (prop) => (event) => {
		setSuccess(false)
		setError(false);
		setValues({ ...values, [prop]: event.target.value });
	};

	useEffect(() => {
		handleChange();
	}, [values]);

	let handleSubscribe = async () => {
		if (values.email.length > 0 && regex.test(values.email) === false) {
			setError(true);
		} else if (values.email.length === 0) {
			setError(true);
		} else {
			axios.post(`${API_URL}api/subscribe/`, {
				email: values.email,
			}).then(setSuccess(true));
			
			values.email = "";
		}
	};

	return (
		<FormControl error={error} variant="outlined">
			<OutlinedInput
				sx={{ borderRadius: "40px", backgroundColor: "white" }}
				size="small"
				value={values.email}
				placeholder="Enter your email"
				onChange={handleChange("email")}
				endAdornment={
					<InputAdornment position="end">
						<Chip
							sx={{ m: 0 }}
							variant="contained"
							size="small"
							color="primary"
							label="Subscribe"
							onClick={() => handleSubscribe()}
						/>
					</InputAdornment>
				}
			/>
			{error === true ? (
				<FormHelperText color="error">Email not valid</FormHelperText>
			) : null}
			{success?<FormHelperText sx={{color: 'white'}}>Success, It's great to have you.</FormHelperText>
			: null}
		</FormControl>
	);
};

export default SubscribeForm;
