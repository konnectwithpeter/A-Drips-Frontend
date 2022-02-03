import {
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Chip,
	Hidden,
	Paper,
	Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import AddtoWish from "./AddtoWish";
import Custom from "./Custom";

let useStyles = makeStyles((theme) => ({
	product__container: {
		backgroundColor: "",
		borderRadius: "10px",
		position: "relative",
		"& #image1": {
			display: "bock",
		},
		"& #image2": {
			display: "none",
		},
		// borderRadius: "15px",
		"&:hover": {
			"& #image1": {
				display: "none",
			},
			"& #image2": {
				display: "block",
			},
			"& .MuiPaper-elevation": {
				elevation: 8,
			},
		},
		border: "1px solid rgb(247,247,247)",
	},
	images: {
		height: "auto",
		width: "auto",
		margin: "auto",
		height: "auto",
		objectFit: "cover",
		maxWidth: "100%",
		[theme.breakpoints.down("md")]: {
			height: "150px",
		},
		[theme.breakpoints.up("md")]: {
			height: "180px",
			width: "250px",
		},
	},
	product__card: {
		borderRadius: "15px",
		padding: "10px",
		backgroundColor: "transparent",
		height: "294px",
	},
	price: {
		fontSize: "20px",
		[theme.breakpoints.down("sm")]: {
			fontSize: "15px",
			fontWeight: "bold",
		},
		// fontWeight: "light-bold",
	},
	discount: {
		fontSize: "12px",
		[theme.breakpoints.down("sm")]: {
			fontSize: "10px",
		},
		// fontWeight: "light-bold",
	},
	new: {
		marginTop: 4,
		zIndex: 2,
		position: "absolute",
		//transform: "rotate(-4deg)",
		backgroundColor: "white",
		color: "black",
		fontSize: "10px",
		fontWeight: "bold",

		//transform: "scale(-4)"
	},
}));

const ProductContainer = (props) => {
	let classes = useStyles();
	let location = useLocation();
	let {
		id,
		item,
		alt,
		image,
		image1,
		discount,
		price,
		name,
		description,
		discounted,
		...others
	} = props;

	return (
		<>
			<Card
				component={Paper}
				elevation={0}
				sx={{ maxWidth: 250 }}
				{...others}
				className={classes.product__container}
			>
				<AddtoWish slug={item.slug} />
				{!item.isBrandNew && (
					<Chip
						label="Mtumba"
						style={{ right: 2 }}
						size="small"
						className={classes.new}
					/>
				)}
				<Link to={`/product/${id}`}>
					<CardMedia
						style={{ zIndex: 1 }}
						id="image1"
						component="img"
						alt={name}
						className={classes.images}
						loading="lazy"
						image={image}
					/>
					<CardMedia
						style={{ zIndex: 1 }}
						id="image2"
						component="img"
						alt={name}
						loading={
							location.pathname === "/" &&
							item.isFeatured === true
								? null
								: "lazy"
						}
						className={classes.images}
						image={image1}
					/>
				</Link>
				<CardContent
					style={{ margin: 0, paddingTop: 0, paddingBottom: 0 }}
					disablespacing="true"
				>
					<Hidden smDown>
						<Typography
							gutterBottom
							component="div"
							style={{ fontSize: "20px", textAlign: "center" }}
						>
							{name.length > 15 ? name.slice(0, 15) + ".." : name}
						</Typography>
					</Hidden>
					<Hidden smUp>
						<Typography
							gutterBottom
							component="div"
							style={{
								fontSize: "15px",
								textAlign: "center",
								fontWeight: "light-bold",
							}}
						>
							{name.length > 12 ? name.slice(0, 12) + ".." : name}
						</Typography>
					</Hidden>
					<>
						<Hidden mdDown>
							<Typography
								style={{
									textAlign: "justify",
									hyphens: "auto",
									fontSize: "12px",
								}}
							>
								{description.slice(0, 65) + "..."}
							</Typography>
						</Hidden>
						<Hidden mdUp>
							<Typography
								style={{
									textAlign: "left",
									hyphens: "auto",
									fontSize: "12px",
									fontWeight: "light-bold",
								}}
							>
								{description.slice(0, 35) + ".."}
							</Typography>
						</Hidden>
					</>
				</CardContent>
				<CardActions
					align="center"
					sx={{
						justifyContent: "space-between",
						paddingLeft: "1em",
						paddingRight: 1,
						paddingTop: 0,
						paddingBottom: 1,
					}}
				>
					{discounted === true && discount > 0 ? (
						<div style={{ display: "flex", alignItems: "center" }}>
							<Typography className={classes.discount}>
								<strike>
									{Math.round(
										price / (1 - discount / 100)
									).toLocaleString()}
								</strike>
							</Typography>
							<Typography className={classes.price}>
								{price.toLocaleString()}
								<sup style={{ fontSize: "10px" }}>Ksh</sup>
							</Typography>
						</div>
					) : (
						<Typography
							variant="h6"
							className={classes.price}
							component="div"
						>
							{price.toLocaleString()}
							<sup style={{ fontSize: "10px" }}>Ksh</sup>
						</Typography>
					)}

					{location.pathname === "/" ? null : (
						<div>
							<Custom.AddtoCart item={item} />
						</div>
					)}
				</CardActions>
			</Card>
		</>
	);
};

export default ProductContainer;
