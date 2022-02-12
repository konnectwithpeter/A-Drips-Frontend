import {
	Alert,
	AlertTitle,
	Box,
	Fab,
	FormControl,
	FormHelperText,
	InputLabel,
	MenuItem,
	Select,
	Snackbar,
	TextField,
} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import * as React from "react";
import APIContext from "../../context/APIContext";
import AuthContext from "../../context/AuthContext";

const useStyles = makeStyles((theme) => ({
	container: {
		position: "relative",
		[theme.breakpoints.up("sm")]: {
			padding: "0 2rem",
			marginTop: "3rem",
		},
		backgroundColor: "transparent",
	},
}));

export default function RequestForm() {
	const classes = useStyles();
	const [expanded, setExpanded] = React.useState(false);
	const [open, setOpen] = React.useState(false);
	const { user } = React.useContext(AuthContext);

	const defaultValues = {
		type: "",
		size: "",
		color: "",
		condition: "brand new",
		gender: "",
		description: "",
		email: user.email || "",
		phone: "",
		name: user.username !== "guest" ? user.username : "",
	};
	const [values, setValues] = React.useState(defaultValues);

	const { API_URL } = React.useContext(APIContext);

	const handleChange = (prop) => (event) => {
		setValues({ ...values, [prop]: event.target.value });
	};

	const handleCollapseChange = () => {
		expanded === false ? setExpanded(true) : setExpanded(false);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		try {
			axios.post(`${API_URL}api/request-find/`, {
				type: values.type,
				size: values.size,
				color: values.color,
				condition: values.condition,
				gender: values.gender,
				description: values.description,
				email: values.email,
				phone: values.phone,
				name: values.name,
			});
			setOpen(true);
			setExpanded(false);
		} catch (e) {
			setExpanded(false);
		}
		setValues(defaultValues);
	};

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		setOpen(false);
	};

	return (
		<Box className={classes.container}>
			<Accordion
				elevation={0}
				expanded={expanded}
				onChange={handleCollapseChange}
			>
				<AccordionSummary
					//expandIcon={<ExpandMoreIcon />}
					aria-controls="panel1bh-content"
					id="make-find-request"
				>
					<div
						style={{
							margin: "0 auto",
							maxWidth: "50rem",
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
						}}
					>
						<Typography
							sx={{
								flexShrink: 0,
								fontWeight: "light-bold",
								fontSize: "23px",
							}}
						>
							Let us help you find what you need.
						</Typography>
						{!expanded && (
							<>
								<br />
								<Typography sx={{ color: "text.primary" }}>
									You having trouble finding the pair you
									need? <br />
									Need a different size from the one posted?
									<br />
									Need a pair with a lower price?
								</Typography>
								<br />
								<Fab
									variant="extended"
									color="primary"
									size="large"
									sx={{
										backgroundColor: "black",
										textTransform: "none",
									}}
								>
									Let us find it for you.
								</Fab>
							</>
						)}
					</div>
				</AccordionSummary>
				<AccordionDetails>
					<form
						onSubmit={handleSubmit}
						style={{ margin: "0 auto", maxWidth: "50rem" }}
					>
						<div style={{ display: "flex" }}>
							<FormControl sx={{ m: 1, width: "50%" }}>
								<TextField
									required
									variant="standard"
									fullwidth="true"
									label="Type"
									value={values.type}
									onChange={handleChange("type")}
								/>
								<FormHelperText>
									example: rubbers, crocs
								</FormHelperText>
							</FormControl>
							<FormControl sx={{ m: 1, width: "50%" }}>
								<TextField
									required
									variant="standard"
									fullwidth="true"
									label="Size"
									value={values.size}
									onChange={handleChange("size")}
								/>
								<FormHelperText>
									size of the shoe
								</FormHelperText>
							</FormControl>
						</div>
						<div style={{ display: "flex" }}>
							<FormControl sx={{ m: 1, width: "50%" }}>
								<TextField
									required
									variant="standard"
									fullwidth="true"
									label="Color"
									value={values.color}
									onChange={handleChange("color")}
								/>
								<FormHelperText>
									color of the shoe
								</FormHelperText>
							</FormControl>
							<FormControl required sx={{ m: 1, width: "50%" }}>
								<InputLabel>Condition</InputLabel>
								<Select
									value={values.condition}
									label="Condition"
									variant="standard"
									fullwidth="true"
									onChange={handleChange("condition")}
								>
									<MenuItem value={"mtumba"}>mtumba</MenuItem>
									<MenuItem value={"brand new"}>
										brand new
									</MenuItem>
								</Select>
								<FormHelperText>
									brand new / mtumba
								</FormHelperText>
							</FormControl>
						</div>
						<div style={{ display: "flex" }}>
							<FormControl required sx={{ m: 1, minWidth: 120 }}>
								<InputLabel>Gender</InputLabel>
								<Select
									value={values.gender}
									label="Gender"
									variant="standard"
									fullwidth="true"
									onChange={handleChange("gender")}
								>
									<MenuItem value={"men"}>men</MenuItem>
									<MenuItem value={"ladies"}>female</MenuItem>
									<MenuItem value={"unisex"}>unisex</MenuItem>
								</Select>
								<FormHelperText>men / ladies</FormHelperText>
							</FormControl>
						</div>
						<div style={{ display: "flex" }}>
							<FormControl sx={{ m: 1, width: "100%" }}>
								<TextField
									variant="standard"
									fullwidth="true"
									multiline
									rows={2}
									label="Description"
									type="description"
									value={values.description}
									onChange={handleChange("description")}
									placeholder="provide other specifications..(optional)"
								/>
								<FormHelperText>
									other specifications
								</FormHelperText>
							</FormControl>
						</div>
						<div style={{ display: "flex" }}>
							<FormControl sx={{ m: 1, width: "50%" }}>
								<TextField
									required
									variant="standard"
									fullwidth="true"
									label="Name"
									value={values.name}
									onChange={handleChange("name")}
								/>
								<FormHelperText>your name</FormHelperText>
							</FormControl>
							<FormControl sx={{ m: 1, width: "50%" }}>
								<TextField
									required
									variant="standard"
									fullwidth="true"
									label="Phone"
									value={values.phone}
									onChange={handleChange("phone")}
								/>
								<FormHelperText>
									your phone number
								</FormHelperText>
							</FormControl>
						</div>
						<div style={{ display: "flex" }}>
							<FormControl sx={{ m: 1, width: "100%" }}>
								<TextField
									required
									variant="standard"
									fullwidth="true"
									label="Email"
									type="email"
									value={values.email}
									onChange={handleChange("email")}
								/>
								<FormHelperText>your email</FormHelperText>
							</FormControl>
						</div>
						<br />
						<Fab
							variant="extended"
							color="primary"
							size="medium"
							sx={{
								textTransform: "none",
							}}
							type="submit"
						>
							Submit Ruquest Now
						</Fab>
					</form>
				</AccordionDetails>
			</Accordion>
			<Snackbar
				open={open}
				autoHideDuration={3000}
				onClose={handleClose}
				style={{ textTransform: "none" }}
				variant="filled"
			>
				<Alert severity="success" open={false}>
					<AlertTitle>Success</AlertTitle>
					Submitted Successfully, we will be in touch.
				</Alert>
			</Snackbar>
		</Box>
	);
}
