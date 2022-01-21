import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
	Alert,
	Box,
	Button,
	Chip,
	IconButton,
	InputAdornment,
	Modal,
	Paper,
	TextField
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { useLocation, useNavigate } from "react-router-dom";
import APIContext from "../../context/APIContext";

let useStyles = makeStyles({
	field: {
		width: "100%",
	},
});

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	boxShadow: 24,
	p: 4,
};

const ResetPassword = () => {
	let { API_URL, BASE_URL } = useContext(APIContext);
	const navigate = useNavigate();
	let classes = useStyles();
	const location = useLocation();
	let url = location.pathname;
	let reset_uuid = url.substring(
		url.lastIndexOf("64=") + 3,
		url.lastIndexOf("/")
	);
	let reset_token = url.slice(url.lastIndexOf("en=") + 3);

	const [open, setOpen] = useState(false);
	let defaultData = { password: "", repeatPassword: "", resetEmail: "" };
	const [values, setValues] = useState(defaultData);
	let [passwordMismatch, setPasswordMismatch] = useState(false);
	let [passwordError, setPasswordError] = useState(false);
	let [fieldValidated, setFieldValidated] = useState({
		password: false,
		repeatPassword: false,
	});

	let [isInvalid, setIsInvalid] = useState(false);
	let [linkRequested, setLinkRequested] = useState(false);

	const handleClose = () => {
		setOpen(false);
	};

	let resetEmailRequest = async () => {
		try {
			await axios.post(`${API_URL}api/request-reset-email/`, {
				email: values.resetEmail,
				redirect_url: `${BASE_URL}#/reset-password/`,
			});
			setOpen(false);
			setLinkRequested(true);
		} catch (err) {
			setOpen(false);
		}
	};

	const handleChange = (prop) => (event) => {
		setValues({ ...values, [prop]: event.target.value });
	};

	const handleClickShowPassword = () => {
		setValues({
			...values,
			showPassword: !values.showPassword,
		});
	};

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	let handleVerification = () => {
		if (values.password.length > 0 && values.password.length < 6) {
			setPasswordError(true);
		} else {
			setPasswordError(false);
			setFieldValidated({ ...fieldValidated, password: true });
		}
		if (values.password !== values.repeatPassword) {
			setPasswordMismatch(true);
		} else {
			setPasswordMismatch(false);
			setFieldValidated({ ...fieldValidated, repeatPassword: true });
		}
	};

	useEffect(() => {
		handleVerification();
	}, [values]);

	let handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await axios.patch(`${API_URL}api/password-reset-complete`, {
				password: values.password,
				token: reset_token,
				uidb64: reset_uuid,
			});
			navigate("/login", { replace: true });
		} catch (err) {
			setIsInvalid(true);
		}
	};

	return (
		<Paper
			sx={{
				margin: "auto",
				width: "80%",
				maxWidth: "30em",
				padding: "20px",
				marginTop: "2em",
			}}
		>
			{isInvalid === true && linkRequested === false ? (
				<Alert
					variant="outlined"
					severity="error"
					sx={{ marginTop: "2em", marginBottom: "2em" }}
				>
					Your reset password link is invalid! Please request for
					another link.
				</Alert>
			) : null}
			{linkRequested === true ? (
				<Alert
					variant="outlined"
					severity="success"
					sx={{ margin: "auto" }}
				>
					A new reset password link has been sent. Please check your
					mails and use the link to reset your password.
				</Alert>
			) : (
				<form onSubmit={handleSubmit}>
					<TextField
						className={classes.field}
						error={passwordError}
						label="Enter password"
						onChange={handleChange("password")}
						value={values.password}
						helperText={
							passwordError === true
								? "6 Characters Minimum"
								: null
						}
						type={values.showPassword ? "text" : "password"}
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<IconButton
										aria-label="toggle password visibility"
										onClick={handleClickShowPassword}
										onMouseDown={handleMouseDownPassword}
										edge="end"
									>
										{values.showPassword ? (
											<VisibilityOff />
										) : (
											<Visibility />
										)}
									</IconButton>
								</InputAdornment>
							),
						}}
						required
					/>
					<br />
					<br />
					<TextField
						className={classes.field}
						error={passwordMismatch}
						label="Repeat password"
						onChange={handleChange("repeatPassword")}
						value={values.repeatPassword}
						helperText={
							passwordMismatch === true
								? "Password Mismatch"
								: null
						}
						type={values.showPassword ? "text" : "password"}
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<IconButton
										aria-label="toggle password visibility"
										onClick={handleClickShowPassword}
										onMouseDown={handleMouseDownPassword}
										edge="end"
									>
										{values.showPassword ? (
											<VisibilityOff />
										) : (
											<Visibility />
										)}
									</IconButton>
								</InputAdornment>
							),
						}}
						required
					/>
					<br />
					<div
						style={{
							marginTop: "2em",
							display: "flex",
							justifyContent: "end",
						}}
					>
						{isInvalid === true ? (
							<Chip
								onClick={() => setOpen(true)}
								label="New Link?"
								component={Button}
								color="primary"
								variant="outlined"
								sx={{
									"&:hover": {
										backgroundColor: "#EDEDED",
										color: "black",
										border: "1px solid black",
									},
									marginRight: "30%",
								}}
							/>
						) : null}
						<Chip
							type="submit"
							label="Reset Password"
							component={Button}
							disabled={
								values.password.length < 1 ||
								passwordError === true ||
								passwordMismatch === true
									? true
									: false
							}
							color={
								isInvalid === false ? "primary" : "secondary"
							}
							variant="contained"
							sx={{
								"&:hover": {
									backgroundColor: "#EDEDED",
									color: "black",
									border: "1px solid black",
								},
							}}
						/>
					</div>
				</form>
			)}
			<Modal open={open} onClose={handleClose}>
				<Box
					sx={{
						...style,
						width: 300,
						padding: 2,
					}}
				>
					<ValidatorForm
						style={{ margin: 0, padding: 0 }}
						align="center"
						noValidate
						autoComplete="off"
						onSubmit={() => resetEmailRequest()}
					>
						<TextValidator
							className={classes.inputField}
							label="Email"
							onChange={handleChange("resetEmail")}
							name="email"
							value={values.resetEmail}
							validators={["required", "isEmail"]}
							errorMessages={[
								"this field is required",
								"email is not valid",
							]}
							fullWidth
						/>
						<br />

						<Chip
							label="Send Reset Email"
							variant="outlined"
							style={{ minWidth: "50%" }}
							component={Button}
							type="submit"
						/>

						<br />
					</ValidatorForm>
				</Box>
			</Modal>
		</Paper>
	);
};

export default ResetPassword;
