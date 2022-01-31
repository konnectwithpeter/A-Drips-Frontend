import {
	Add,
	ArrowBackRounded,
	ArrowForwardRounded,
	CancelPresentation,
	CloseRounded,
	RemoveCircleOutline,
} from "@mui/icons-material";
import {
	Alert,
	AlertTitle,
	Badge,
	Box,
	Button,
	CardContent,
	CardMedia,
	Chip,
	Divider,
	Grid,
	IconButton,
	List,
	ListItem,
	Modal,
	Paper,
	Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "react-use-cart";
import APIContext from "../../context/APIContext";
import AuthContext from "../../context/AuthContext";
import ProductsContext from "../../context/ProductsContext";
import Custom from "../../reusable/Custom";
import LoginForm from "../auth/LoginForm";

let useStyles = makeStyles((theme) => ({
	icon__btn: {
		"&:focus": {
			outline: "none",
		},
	},
	name: {
		fontSize: "18px",
		color: "black",
		[theme.breakpoints.down("sm")]: {
			fontSize: "13px",
		},
		textDecoration: "underline",
	},
	container: {
		width: "100%",
		[theme.breakpoints.down("md")]: {
			maxWidth: "100%",
			marginTop:"2rem",
		},
		[theme.breakpoints.up("md")]: {
			width: "100%",
		},
	},
}));

const CheckoutCart = () => {
	let { API_URL } = useContext(APIContext);
	let classes = useStyles();
	const { updateItemQuantity, removeItem, items, cartTotal } = useCart();
	let { products, getProducts } = useContext(ProductsContext);
	let [loading, setLoading] = useState(true);
	//let [updatedItems, updatedItems] =

	let handleToCart = async () => {
		for (var index = 0; index < items.length; index++) {
			try {
				let product = await axios.get(
					`${API_URL}api/shop/product/${items[index].slug}`
				);

				if (product.data.quantity === 0) {
					removeItem(items[index].id);
				}
			} catch (err) {
				removeItem(items[index].id);
			}
		}
		setLoading(false);
	};

	useEffect(() => {
		handleToCart();
	}, []);

	const navigate = useNavigate();

	let { user } = useContext(AuthContext);

	const [open, setOpen] = useState(false);
	const handleClose = () => setOpen(false);

	let handleNext = () => {
		if (user.username === "guest") {
			setOpen(true);
		} else {
			navigate("/checkout");
		}
	};

	let reduce = (item) => {
		getProducts();
		updateItemQuantity(item.id, item.quantity - 1);
	};

	let addItem = async (item) => {
		updateItemQuantity(item.id, item.quantity + 1);
	};

	return loading === true ? (
		<Custom.PageLoadingBuffer />
	) : (
		<>
			<Box className={classes.container}>
				<Box>
					<div
						style={{
							width: "100%",
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
							marginBottom: "1.5rem",
						}}
					>
						<Typography variant="h6">Cart</Typography>
						<Typography
							variant="subtitle1"
							style={{
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								color: "black",
								gap: "1rem",
								//textDecoration:"none",
							}}
							component={Link}
							to={"/store"}
						>
							<ArrowBackRounded fontSize="inherit"/>
							Continue Shopping
						</Typography>
					</div>

					{items.map((item, index) =>
						item.quantity === undefined ||
						item.quantity === null ? null : (
							<Paper
								key={index}
								sx={{
									display: "flex",
									maxHeight: 150,
									flexShrink: 3,
									width: "100%",
									marginBottom: "2rem",
								}}
								elevation={1}
							>
								<Box
									sx={{
										backgroundColor: "",

										//borderBottom:'1px solid gray',
										objectFit: "cover",
										width: "35%",
									}}
								>
									<CardMedia
										component="img"
										sx={{
											width: "auto",
											height: 150,
											
										}}
										src={
											item.image1.slice(0, 4) === "http"
												? `${item.image1}`
												: `${API_URL}${item.image1.slice(
														1
												  )}`
										}
										alt={item.name}
									/>
								</Box>
								<Box
									sx={{
										display: "flex",
										flexDirection: "column",
										flex: 1,
										//borderBottom: "1px solid gray",
										//borderRight: "1px solid gray",
										borderRadius: "5px 20px 5px",
									}}
								>
									<CardContent sx={{ paddingTop: 0 }}>
										<Grid
											container
											sx={{
												display: "flex",
												alignItems: "center",
												justifyContent: "space-between",
											}}
										>
											<Grid item xs={6} sm={6} md={6}>
												<Typography
													component={Link}
													to={`/product/${item.slug}`}
													className={classes.name}
												>
													{item.name}
												</Typography>
											</Grid>
											<Grid item xs={4} sm={4} md={4}>
												<Chip
													sx={{
														backgroundColor:
															"#F7F7F7",
													}}
													size="small"
													label={
														<Typography variant="subtitle2">
															@
															{item.price.toLocaleString()}
															<sup
																style={{
																	fontSize:
																		"10px",
																}}
															>
																Ksh
															</sup>
														</Typography>
													}
												/>
											</Grid>
											<Grid item xs={2} sm={2} md={2}>
												<IconButton
													size="large"
													onClick={() =>
														removeItem(item.id)
													}
												>
													<CancelPresentation
														fontSize="inherit"
														color="error"
													/>
												</IconButton>
											</Grid>
										</Grid>

										<div style={{ display: "flex" }}>
											<Typography
												variant="h6"
												component="div"
												style={{ flex: 1 }}
											>
												{(
													item.price * item.quantity
												).toLocaleString()}
												<sup
													style={{
														fontSize: "10px",
													}}
												>
													Ksh
												</sup>
											</Typography>
											{item.size !== null ? (
												<Typography
													variant="subtitle1"
													color="text.secondary"
													component="div"
													style={{
														paddingRight: "30%",
													}}
												>
													Size - {item.size}
												</Typography>
											) : null}
										</div>
									</CardContent>
									<Box
										sx={{
											display: "flex",
											alignItems: "center",
											pl: 1,
											pb: 1,
										}}
									>
										<IconButton
											onClick={() => reduce(item)}
										>
											<RemoveCircleOutline
												style={{
													color: "black",
												}}
												size={25}
											/>
										</IconButton>
										<Typography variant="h6">
											{item.quantity !== undefined
												? item.quantity
												: 1}
										</Typography>
										<Button
											className={classes.icon__btn}
											disabled={
												products.find(
													(obj) => obj.id === item.id
												) !== undefined
													? products.find(
															(obj) =>
																obj.id ===
																item.id
													  ).quantity <
													  item.quantity + 1
													: false
											}
											onClick={() => addItem(item)}
											variant="outlined"
											sx={{ marginLeft: 2 }}
										>
											<Add
												style={{
													color: "black",
												}}
												size={25}
											/>
										</Button>
									</Box>
								</Box>
							</Paper>
						)
					)}
				</Box>
				<Box sx={{ width: "100%" }}>
					<List
						component={Paper}
						sx={{
							maxWidth: "30em",
							borderBottom: "1px solid rgb(247,247,247)",
							borderRight: "1px solid rgb(247,247,247)",
							borderRadius: "5px 20px 5px",
						}}
					>
						<ListItem
							component="div"
							style={{ justifyContent: "space-between" }}
						>
							<Typography variant="subtitle1">
								Carriage cost
							</Typography>
							<Typography variant="body1">
								Not yet included
							</Typography>
						</ListItem>
						<Divider />
						<ListItem
							component="div"
							style={{ justifyContent: "space-between" }}
						>
							<Typography variant="subtitle1">
								Cart Total
							</Typography>
							<Typography variant="body1">
								{cartTotal.toLocaleString()}
								<sup>Ksh</sup>
							</Typography>
						</ListItem>
						<Divider />
						<ListItem
							component="div"
							style={{ justifyContent: "space-between" }}
						>
							<Alert variant="filled" severity="info">
								<AlertTitle>NB</AlertTitle>
								Please note that the carriage is not yet
								included. It will be added after the shipping
								location is selected.
							</Alert>
						</ListItem>
					</List>
				</Box>
				<Box
					sx={{
						display: "flex",
						justifyContent: "flex-end",
						margin: "auto",
						marginTop: "2em",
						paddingBottom: "2em",
						maxWidth: "42em",
					}}
				>
					<Custom.ButtonPry
						onClick={() => handleNext()}
						text="Proceed to Checkout"
						backicon={
							<ArrowForwardRounded color="black" size={10} />
						}
					/>
				</Box>
			</Box>

			<Modal
				component={Badge}
				badgeContent={<CloseRounded />}
				open={open}
				onClose={handleClose}
			>
				<div
					style={{
						maxWidth: "fit-content",
						maxHeight: "fit-content",
						margin: "auto",
					}}
				>
					<LoginForm onClickProp={() => setOpen(false)} />
				</div>
			</Modal>
		</>
	);
};

export default CheckoutCart;
