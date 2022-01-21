import { Fab, Paper, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import parse from "html-react-parser";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import APIContext from "../../context/APIContext";
import ProductsContext from "../../context/ProductsContext";

const useStyles = makeStyles((theme) => ({
	container: {
		//border: "1px solid black",
		display: "flex",
		width: "100%",
		maxWidth: "100%",
		margin: "0 auto",
		minHeight: "fit-content",
		[theme.breakpoints.up("md")]: {
			minHeight: "60vh",
			marginBottom: "3rem",
		},
		[theme.breakpoints.down("md")]: {
			flexDirection: "column",
		},
	},

	left__div: {
		color: "black",
		display: "flex",
		width: "60%",
		[theme.breakpoints.up("md")]: {
			paddingLeft: "4rem",
			alignItems: "center",
		},
		[theme.breakpoints.down("md")]: {
			width: "100%",
			height: "fit-content",
			maxWidth: "100%",
			margin: "0 auto",
		},
	},

	left__container: {
		display: "flex",
		flexDirection: "column",
		[theme.breakpoints.up("md")]: {
			gap: "3rem",
			width: "fit-content",
			maxWidth: "30rem",
			// paddingLeft: "3rem",
			// paddingTop: "3rem",
		},
		[theme.breakpoints.down("md")]: {
			top: "8%",
			gap: "1.5rem",
			alignItems: "center",
			padding: "1rem",
		},
	},

	right__div: {
		width: "40%",
		display: "flex",
		flexDirection: "column",

		[theme.breakpoints.up("md")]: {
			alignItems: "flex-start",
			justifyContent: "center",
		},
		// position: "relative",
		[theme.breakpoints.down("md")]: {
			alignItems: "center",
			maxWidth: "100%",
			width: "100%",
			maxHeight: "fit-content",
			justifyContent: "center",
		},
	},

	title: {
		fontSize: "25px",
		[theme.breakpoints.down("md")]: {
			textAlign: "center",
		},
	},
	more__text: {
		fontSize: "15px !important",
		[theme.breakpoints.down("md")]: {
			textAlign: "center",
			fontSize: "12px !important",
		},
	},

	hero__image: {
		//position: "absolute",
		height: "350px",
		objectFit: "cover",
		width: "350px",
		[theme.breakpoints.down("md")]: {},
		[theme.breakpoints.up("md")]: {
			//paddingTop: "8%",
			margin: ".5rem",
		},
	},
}));

const Hero = () => {
	let classes = useStyles();
	let { hero } = useContext(ProductsContext);
	let { API_URL } = useContext(APIContext);
	let navigate = useNavigate();
	let heroImage = "";
	if (hero[0] !== undefined) {
		heroImage =
			hero[0].image.slice(0, 4) === "http"
				? `${hero[0].image}`
				: `${API_URL}${hero[0].image.slice(1)}`;
	}

	return (
		hero[0] !== undefined && (
			<div className={classes.container}>
				<div className={classes.left__div}>
					<div className={classes.left__container}>
						<Typography className={classes.title} variant="h1">
							{hero[0].title}
						</Typography>
						<Typography className={classes.more__text} variant="h2">
							{parse(hero[0].text)}
						</Typography>
						<div>
							<Fab
								variant="extended"
								color="primary"
								size="large"
								sx={{
									backgroundColor: "black",
									textTransform: "none",
								}}
								component={Paper}
								elevation={12}
								onClick={() => navigate("/shop")}
							>
								Check our Store
							</Fab>
						</div>
					</div>
				</div>
				<div className={classes.right__div}>
					<img
						className={classes.hero__image}
						src={heroImage}
						alt={hero[0].title}
					/>
				</div>
			</div>
		)
	);
};

export default Hero;
