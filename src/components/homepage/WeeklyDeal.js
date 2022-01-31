import { Box, Fab, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import TimeStamp from "react-timestamp";
import ProductsContext from "../../context/ProductsContext";

let useStyles = makeStyles((theme) => ({
	container: {
		color: "black",
		maxWidth: "50rem",
		[theme.breakpoints.up("md")]: {
			backgroundColor: "transparent",
			margin: "0 auto",
		},
		[theme.breakpoints.down("md")]: {
			marginTop: "1rem",
			maxWidth: "100%",
		},
		padding: "1rem",
		display: "flex",
		maxHeight: "fit-content",
	},

	text__box: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
		width: "50%",
	},

	image__box: {
		width: "50%",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		position: "relative",
	},

	text__1: {
		fontSize: "20px",
		fontWeight: "light-bold",
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
					<Typography style={{ fontStyle: "italic" }}>
						Expiring <TimeStamp relative date={deals[0].expire} />
					</Typography>
					<Fab
						//className="wobble-hor-top"
						variant="extended"
						//color="primary"
						size="medium"
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
						Shop Now
					</Fab>
				</Box>
				<Box className={classes.image__box}>
					<img
						src={dealProduct.image1}
						alt={dealProduct.name}
						style={{
							width: "200px",
							height: "200px",
						}}
					/>
					{dealProduct.discount > 0 && (
						<>
							<Typography
								component="div"
								className={classes.discount}
							>
								{dealProduct.discount}% OFF
							</Typography>
							<div
								style={{
									display: "flex",
									alignItems: "center",
								}}
							>
								<Typography style={{ fontSize: "12px", marginRight: "10px"}}>
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
