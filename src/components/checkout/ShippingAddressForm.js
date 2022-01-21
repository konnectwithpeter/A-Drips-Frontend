import { ArrowForward, LocalShippingRounded } from "@mui/icons-material";
import {
	Alert,
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	Paper,
	Select,
	TextField,
	Typography
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import TimeStamp from "react-timestamp";
import { useCart } from "react-use-cart";
import Custom from "../../reusable/Custom";
import CartSummary from "../cart/CartSummary";

let useStyles = makeStyles({
	input__fields: {
		width: "90%",
		marginBottom: "2em",
		alignItems: "left",
	},
	input__num: {
		"& input[type=number]": {
			"-moz-appearance": "textfield",
		},
		"& input[type=number]::-webkit-outer-spin-button": {
			"-webkit-appearance": "none",
			margin: 0,
		},
		"& input[type=number]::-webkit-inner-spin-button": {
			"-webkit-appearance": "none",
			margin: 0,
		},
	},
});

const ShippingAddress = ({ formData, setForm, navigation, locations }) => {
	let { telephone, area, location } = formData;
	let [deliveryEst, setDeliveryEst] = useState(null);
	let [telError, setTelError] = useState(false);
	let classes = useStyles();
	let { isEmpty } = useCart();
	const navigate = useNavigate();

	if (isEmpty) {
		navigate('/cart', {replace: true})
	}

	let verifyPhone = () => {
		const phoneRegex =
			/^[+]?[(]?[0-9]{3}[)]?[-\s]?[0-9]{3}[-\s]?[0-9]{4,6}$/im;
		if (
			formData.telephone.length > 0 &&
			formData.telephone.match(phoneRegex)
		) {
			setTelError(false);
		} else if (
			formData.telephone > 0 &&
			!formData.telephone.match(phoneRegex)
		) {
			setTelError(true);
		}
	};

	let estimatedDeliveryTime = () => {
		if (formData.location !== "") {
			let time = locations.filter(
				(item) => item.location === formData.location
			)[0].days;
			let start = new Date();
			let end = new Date();
			let tommorrow = new Date(end.setDate(start.getDate() + time));
			setDeliveryEst(tommorrow);
		}
	};
	useEffect(() => {
		verifyPhone();
		estimatedDeliveryTime();
	}, [formData]);

	const handleNext = (e) => {
		e.preventDefault();
		if (telError !== true) {
			navigation.next();
		}
	};

	return (
		<Grid container spacing={2} style={{ minHeight: "72vh" }}>
			<Grid item sm={12} md={6} lg={6}>
				<div
					style={{
						display: "flex",
						marginBottom: "2em",
						justifyContent: "center",
						width: "95%",
						padding: "1em",
						paddingTop: "0px",
						margin: "auto",
					}}
				>
					<Paper
						align="center"
						elevation={5}
						sx={{
							maxWidth: "35em",
							margin: "auto",

							maxHeight: "fit",
						}}
					>
						<form onSubmit={handleNext}>
							<Typography
								variant="h6"
								sx={{ marginBottom: "2em" }}
							>
								Shipping Details
							</Typography>
							<FormControl
								align="left"
								className={classes.input__fields}
								required
							>
								<TextField
									className={classes.input__num}
									error={telError}
									label="Telephone"
									type="number"
									name="telephone"
									autoComplete="off"
									defaultValue={telephone}
									onChange={setForm}
									required={true}
									helperText={
										telError === true
											? "Please Enter a Valid Number"
											: null
									}
								/>
							</FormControl>

							<FormControl
								align="left"
								className={classes.input__fields}
								required
							>
								<InputLabel id="select-label">
									Location
								</InputLabel>
								<Select
									autoComplete="off"
									labelId="select-label"
									name="location"
									label="Location"
									value={location}
									onChange={setForm}
								>
									{locations.map((loc, index) => (
										<MenuItem
											key={index}
											value={loc.location}
										>
											{loc.location}
										</MenuItem>
									))}
								</Select>
							</FormControl>

							<FormControl
								align="left"
								sx={{ width: "90%" }}
								required
							>
								<TextField
									placeholder="Type in your area"
									label="Area"
									name="area"
									value={area}
									required
									onChange={setForm}
									autoComplete="off"
								/>
							</FormControl>
							{deliveryEst !== null ? (
								<div
									style={{
										paddingTop: "1em",
										maxWidth: "90%",
									}}
								>
									<Alert
										align="left"
										variant="filled"
										severity="info"
										icon={
											<LocalShippingRounded fontSize="inherit" />
										}
									>
										<Typography>
											Items delivered to{" "}
											<strong>{formData.location}</strong>{" "}
											are estimated to be delivered in{" "}
											<strong>
												<TimeStamp
													relative
													date={deliveryEst}
												/>
											</strong>
											.
										</Typography>
										<em>Note that this is an estimate.</em>
									</Alert>
								</div>
							) : null}
							<div
								style={{
									display: "flex",
									justifyContent: "end",
								}}
							>
								<Custom.ButtonPry
									style={{
										width: "30%",
										margin: "2em",
									}}
									backicon={
										<ArrowForward color="black" size={10} />
									}
									text="Next"
									type="submit"
								/>
							</div>
						</form>
					</Paper>
				</div>
			</Grid>

			<Grid
				item
				sm={12}
				md={6}
				lg={6}
				sx={{
					marginBottom: "2em",
					display: "flex",
					justifyContent: "center",
					width: "100%",
				}}
			>
				<CartSummary />
			</Grid>
		</Grid>
	);
};

export default ShippingAddress;
