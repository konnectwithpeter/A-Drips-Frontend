import { Box, Fab, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import TimeStamp from "react-timestamp";
import ProductsContext from "../../context/ProductsContext";
import "./styles.css";

let useStyles = makeStyles((theme) => ({
	container: {
		color: "black",
		maxWidth: "50rem",
		display: "flex",
		[theme.breakpoints.up("md")]: {
			backgroundColor: "transparent",
			margin: "0 auto",
			marginTop: "5rem",
		},
		[theme.breakpoints.down("md")]: {
			border: "2px solid rgb(0,0,0, 0.05555)",
			marginTop: "1rem",
			maxWidth: "100%",
			flexDirection: "column",
			backgroundColor: "transparent",
		},
		padding: "1rem",
		maxHeight: "fit-content",
	},

	text__box: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
		width: "50%",
		[theme.breakpoints.down("md")]: {
			width: "100%",
			//border: "1px solid black",
			justifyContent: "center",
			textAlign: "center",
			alignItems: "center",
			gap: ".5rem",
		},
		[theme.breakpoints.up("md")]: {
			//gap: "1.5rem",
			justifyContent: "space-around",
		},
	},

	image__box: {
		width: "50%",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		position: "relative",
		[theme.breakpoints.down("md")]: {
			width: "0%",
			display: "none",
		},
	},
	image: {
		[theme.breakpoints.down("md")]: {
			height: "auto",
			width: "180px",
			objectFit: "cover",
		},
		[theme.breakpoints.up("md")]: {
			height: "auto",
			width: "250px",
			objectFit: "cover",
		},
	},
	image__small: {
		width: "100%",
		maxWidth: "200px",
		height: "auto",
		maxHeight: "200px",
		objectFit: "cover",
		display: "flex",
		margin: "0 auto",
	},
	container__small__image: {
		[theme.breakpoints.up("md")]: {
			display: "none",
		},
	},
	text__1: {
		fontSize: "20px",
		fontWeight: "light-bold",
		[theme.breakpoints.down("md")]: {
			display: "none",
		},
	},
	text__3: {
		fontSize: "20px",
		fontWeight: "light-bold",
		[theme.breakpoints.up("md")]: {
			display: "none",
		},
	},
	text__2: { fontSize: "13px", fontWeight: "light-bold" },
	timer: {
		color: "black",
		border: "1px solid black",
	},
	discount: {
		top: 0,
		position: "absolute",
		margin: "0 auto",
		fontSize: "25px",
		fontStyle: "italic",
		//backgroundColor: "rgb(251,251,251,.4)",
	},
}));

const WeeklyDeal = () => {
	const { deals, products } = useContext(ProductsContext);
	let classes = useStyles();
	//console.log(deals[0].Product)
	let dealProduct = {};
	if (deals[0] !== undefined) {
		dealProduct = products.filter(
			(item) => item.slug === deals[0].Product
		)[0];
	}

	return (
		deals[0] !== undefined &&
		dealProduct !== undefined && (
			<Box className={classes.container}>
				<Typography className={classes.text__3}>
					{deals[0].title}
				</Typography>
				<Box
					className={classes.container__small__image}
					style={{ position: "relative" }}
				>
					<img
						src={dealProduct.image1}
						alt={dealProduct.name}
						className={classes.image__small}
					/>
					{dealProduct.discount > 0 && (
						<>
							<Typography
								component="div"
								style={{
									display: "flex",
									alignItems: "center",
									fontSize: "20px",
								}}
								className={classes.discount}
							>
								<Typography
									style={{
										fontSize: "14px !important",
										marginRight: "6px",
									}}
								>
									<strike>
										{Math.round(
											dealProduct.price /
												(1 - dealProduct.discount / 100)
										).toLocaleString()}
									</strike>
								</Typography>
								<Typography
									style={{
										fontSize: "20px",
										fontWeight: "light-bold",
									}}
								>
									{dealProduct.price.toLocaleString()}
									<sup style={{ fontSize: "12px" }}>Ksh</sup>
								</Typography>
								({Math.round(dealProduct.discount)}% OFF)
							</Typography>
						</>
					)}
				</Box>
				<Box className={classes.text__box}>
					<Typography className={classes.text__1}>
						{deals[0].title}
					</Typography>
					<Typography
						className={classes.text__2}
						style={{ fontSize: "15px" }}
					>
						{deals[0].content}
					</Typography>
					<Typography style={{ fontStyle: "italic bold" }}>
						Expiring <TimeStamp relative date={deals[0].expire} />
					</Typography>
					<Fab
						//className="wobble-hor-top"
						variant="extended"
						//color="primary"
						size="medium"
						id="pulsate-bck"
						sx={{
							backgroundColor: "transparent",
							border: "1px solid black",
							textTransform: "none",
							maxWidth: "10rem",
							color: "black",
						}}
						component={Link}
						to={`/product/${dealProduct.slug}`}

						//onClick={() => handleOnClick()}
					>
						Grab it today
					</Fab>
				</Box>
				<Box className={classes.image__box}>
					<img
						src={dealProduct.image1}
						alt={dealProduct.name}
						className={classes.image}
					/>
					{dealProduct.discount > 0 && (
						<>
							<Typography
								component="div"
								className={classes.discount}
							>
								{Math.round(dealProduct.discount)}% OFF
							</Typography>
							<div
								style={{
									display: "flex",
									alignItems: "center",
								}}
							>
								<Typography
									style={{
										fontSize: "12px",
										marginRight: "10px",
									}}
								>
									<strike>
										{Math.round(
											dealProduct.price /
												(1 - dealProduct.discount / 100)
										).toLocaleString()}
									</strike>
								</Typography>
								<Typography>
									{dealProduct.price.toLocaleString()}
									<sup style={{ fontSize: "10px" }}>Ksh</sup>
								</Typography>
							</div>
						</>
					)}
				</Box>
			</Box>
		)
	);
};

export default WeeklyDeal;
