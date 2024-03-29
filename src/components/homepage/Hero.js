import { Fab, Paper, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import parse from "html-react-parser";
import React, { useContext, useEffect } from "react";
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
			//flexDirection: "column",
			justifyContent: "space-between",
			//border: "1px solid black"
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
			//border: "1px solid red",
		},
	},

	left__container: {
		display: "flex",
		flexDirection: "column",
		[theme.breakpoints.up("md")]: {
			width: "fit-content",
			maxWidth: "30rem",
			justifyContent: "space-around",
			gap: "2.5rem",
			//border: "1px solid black",
			// paddingLeft: "3rem",
			// paddingTop: "3rem",
		},
		[theme.breakpoints.down("md")]: {
			top: "8%",
			gap: ".5rem",
			alignItems: "left",
			padding: "0rem .5rem",
			paddingTop: "1rem",
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
			display: "none",
			alignItems: "center",
			maxWidth: "35%",
			width: "35%",
			maxHeight: "fit-content",
			justifyContent: "right",
		},
	},

	title: {
		fontSize: "25px",
		[theme.breakpoints.down("md")]: {
			fontSize: "18px",
			textAlign: "left",
			fontWeight: "light-bold",
		},
	},
	more__text: {
		fontSize: "15px !important",
		[theme.breakpoints.down("md")]: {
			
			textAlign: "left",
			fontSize: "12px !important",
		},
	},

	hero__image: {
		//position: "absolute",

		[theme.breakpoints.down("md")]: {
			height: "150px",
			width: "130px",
			//objectFit: "fill",	
			//border: "1px solid black"
		},
		[theme.breakpoints.up("md")]: {
			height: "350px",
			objectFit: "fill",
			width: "350px",
			//paddingTop: "8%",
			margin: ".5rem",
		
		},
	},
}));

const Hero = ({ setLandScreenLoaded }) => {
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

	useEffect(() => {
		if (hero[0] !== undefined) {
			setLandScreenLoaded(true);
		}
	}, [heroImage]);

	return (
		hero[0] !== undefined && (
			<div className={classes.container}>
				<div className={classes.left__div}>
					<div className={classes.left__container}>
						<Typography
							className={classes.title}
							component="h1"
							variant="h1"
						>
							{hero[0].title}
						</Typography>
						<Typography
							className={classes.more__text}
							component="h2"
							variant="h2"
						>
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
								onClick={() => navigate("/store")}
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
