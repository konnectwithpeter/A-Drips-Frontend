import {
	AddShoppingCartTwoTone,
	SentimentDissatisfied,
	SentimentSatisfied,
	SentimentSatisfiedAlt,
	SentimentVeryDissatisfied,
	SentimentVerySatisfied,
} from "@mui/icons-material";
import {
	Alert,
	Box,
	Chip,
	Divider,
	List,
	ListItem,
	Paper,
	Rating,
	Snackbar,
	Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import parse from "html-react-parser";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useCart } from "react-use-cart";
import Custom from "../../reusable/Custom";
import ProductCarousel from "./ProductCarousel";

const customIcons = {
	1: {
		icon: <SentimentVeryDissatisfied sx={{ fontSize: 30 }} />,
		label: "Very Dissatisfied",
	},
	2: {
		icon: <SentimentDissatisfied sx={{ fontSize: 30 }} />,
		label: "Dissatisfied",
	},
	3: {
		icon: <SentimentSatisfied sx={{ fontSize: 30 }} />,
		label: "Neutral",
	},
	4: {
		icon: <SentimentSatisfiedAlt sx={{ fontSize: 30 }} />,
		label: "Satisfied",
	},
	5: {
		icon: <SentimentVerySatisfied sx={{ fontSize: 30 }} />,
		label: "Very Satisfied",
	},
};

IconContainer.propTypes = {
	value: PropTypes.number.isRequired,
};

function IconContainer(props) {
	const { value, ...other } = props;
	return <span {...other}>{customIcons[value].icon}</span>;
}

let useStyles = makeStyles((theme) => ({
	container: {
		display: "flex",
		maxWidth: "100%",
		[theme.breakpoints.up("md")]: {
			flexDirection: "row",
		},
		flexDirection: "column",
	},
	carousel: {
		flex: 1,
		[theme.breakpoints.up("md")]: {
			maxWidth: "50%",
		},
	},
	summary: {
		flex: 1,
	},
	new: {
		//transform: "rotate(-4deg)",
		fontSize: "10px",
		color: "white",
		backgroundColor: "rgb(250,175,0)",
		//transform: "scale(-4)"
	},
	price: {
		fontSize: "20px",
		[theme.breakpoints.down("sm")]: {
			fontSize: "18px",
		},
		// fontWeight: "light-bold",
	},
	discount: {
		fontSize: "12px",
		
		// fontWeight: "light-bold",
	},
}));

const ProductItem = ({ product, imageLoading, reviews }) => {
	let { addItem, items } = useCart();
	let [severity, setSeverity] = useState("success");
	let [message, setMessage] = useState("Added to Cart");
	const [open, setOpen] = useState(false);
	let classes = useStyles();

	let reviewTotal = 0;

	for (let i = 0; i < reviews.length; i++) {
		reviewTotal += reviews[i].rating;
	}
	let rating = reviewTotal / reviews.length;

	const handleClick = () => {
		if (items.some((itemInCart) => itemInCart.id === product.id)) {
			setSeverity("info");
			setMessage("Already in cart");
		} else {
			addItem(product);
			setSeverity("success");
			setMessage("Added to cart");
		}
		let bool = true;
		setOpen(bool);
	};

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		setOpen(false);
	};

	return (
		<Paper elevation={0} style={{ backgroundColor: "transparent" }}>
			<Box className={classes.container}>
				<div className={classes.carousel}>
					<ProductCarousel
						product={product}
						imageLoading={imageLoading}
					/>
				</div>

				<div className={classes.summary}>
					<List>
						<ListItem
							alignItems="flex-start"
							sx={{
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
							}}
						>
							<Custom.TextPriStyle
								variant="h5"
								text={product.name}
							/>
							{product.isBrandNew === true ? (
								<div
									style={{
										display: "flex",
										justifyContent: "end",
									}}
								>
									<Chip
										label="Brand New"
										size="small"
										className={classes.new}
									/>
								</div>
							) : null}
						</ListItem>
						<ListItem>
							<Rating
								readOnly
								name="highlight-selected-only"
								value={rating}
								IconContainerComponent={IconContainer}
								highlightSelectedOnly
							/>
							{reviews.length < 1 ? null : (
								<Custom.TextPriStyle
									text={` (${reviews.length} reviews)`}
								/>
							)}
						</ListItem>
						<ListItem alignItems="flex-start">
							<Chip
								sx={{
									color: "black",
									backgroundColor: "#F7F7F7",
								}}
								label={
									product.discounted === true &&
									product.discount > 0 ? (
										<div
											style={{
												display: "flex",
												alignItems: "center",
												gap: "1rem",
											}}
										>
											<div	style={{
												display: "flex",
												alignItems: "center",
												
											}}>
												<Typography
													className={classes.discount}
												>
													<strike>
														{Math.round(
															product.price /
																(1 -
																	product.discount /
																		100)
														).toLocaleString()}
													</strike>
												</Typography>
												<Typography
													className={classes.price}
												>
													{product.price.toLocaleString()}
													<sup
														style={{
															fontSize: "10px",
														}}
													>
														Ksh
													</sup>
												</Typography>
											</div>

											<Typography style={{}}>
												{product.discount}% OFF
											</Typography>
										</div>
									) : (
										<Typography variant="h6">
											{product.price.toLocaleString()}
											<sup style={{ fontSize: "10px" }}>
												Ksh
											</sup>
										</Typography>
									)
								}
							/>
						</ListItem>
						<Divider variant="middle" />
						{product.size === null ? null : (
							<>
								<ListItem>
									<Custom.TextPriStyle
										variant="subtitle2"
										text={` Size: ${product.size}`}
									/>
								</ListItem>
								<Divider variant="middle" />
							</>
						)}

						<ListItem alignItems="flex-start">
							<Typography component="div">
								{product.summary !== undefined
									? parse(product.summary)
									: ""}
							</Typography>
						</ListItem>
						<Divider variant="middle" />
						<ListItem alignItems="center">
							<Custom.ButtonPry
								text="Add to Cart"
								onClick={() => handleClick()}
								fronticon={
									<AddShoppingCartTwoTone sx={{ mr: 1 }} />
								}
							/>
						</ListItem>
					</List>
				</div>
			</Box>
			<Snackbar
				open={open}
				autoHideDuration={2000}
				onClose={handleClose}
				style={{ textTransform: "none" }}
			>
				<Alert
					severity={severity}
					sx={{ width: "100%", fontWeight: "bold" }}
				>
					{message}
				</Alert>
			</Snackbar>
		</Paper>
	);
};

export default ProductItem;
