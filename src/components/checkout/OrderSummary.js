import {
	ArrowBackRounded,
	Edit,
	LocationOn,
	PersonPin,
	Phone,
	Receipt,
} from "@mui/icons-material";
import {
	Alert,
	Box,
	CardContent,
	CardMedia,
	Chip,
	Divider,
	Grid,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Paper,
	Snackbar,
	Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useCart } from "react-use-cart";
import APIContext from "../../context/APIContext";
import AuthContext from "../../context/AuthContext";
import Custom from "../../reusable/Custom";

let useStyles = makeStyles((theme) => ({
	form__data: {
		[theme.breakpoints.down("md")]: {
			display: "flex",
			flexDirection: "column",
		},
	},
}));

const OrderSummary = ({ navigation, formData, locations }) => {
	let { API_URL } = useContext(APIContext);
	let { user, authTokens } = useContext(AuthContext);
	const [open, setOpen] = React.useState(false);
	const [disabled, setDisabled] = React.useState(false);
	let { items, cartTotal, emptyCart, totalUniqueItems } = useCart();
	let classes = useStyles();

	let shippingPlace = locations.filter(
		(location) => location.location === formData.location
	);
	let shippingPrice = shippingPlace[0].shippingPrice;

	let grandTotal = cartTotal + shippingPrice;

	let order = {
		user: user,
		email: user.email,
		phone: formData.telephone,
		location: formData.location,
		area: formData.area,
		totalUniqueItems: totalUniqueItems,
		shippingPrice: shippingPrice,
		totalPrice: grandTotal,
		paymentMethod: formData.billingInfo,
	};

	let newOrderItems = [];

	items.forEach((item) => {
		newOrderItems.push({
			slug: item.slug,
			quantity: item.quantity,
			price: item.price,
			image: `${item.image1}`,
			name: item.name,
			url: `${API_URL}product/${item.slug}`,
		});
	});

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		setOpen(false);
	};

	let handleCreateOrder = async () => {
		setDisabled(true);
		try {
			await fetch(`${API_URL}api/create-order/`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + String(authTokens.access),
				},
				body: JSON.stringify({
					orderItems: newOrderItems,
					orderTotal: grandTotal,
					orderDetails: order,
					user: user,
				}),
			});
			emptyCart();
			navigation.next();
		} catch (err) {
			setOpen(true);
		}
	};

	return (
		<div style={{ padding: "1em" }}>
			<Paper
				elevation={0}
				align="center"
				style={{
					margin: "auto",
					maxWidth: "45em",
					paddingBottom: "2em",
					backgroundColor: "transparent",
				}}
			>
				<Box sx={{ margin: "0px auto" }}>
					<Snackbar
						open={open}
						autoHideDuration={6000}
						onClose={handleClose}
					>
						<Alert
							onClose={handleClose}
							severity="success"
							sx={{ width: "100%" }}
						>
							Something went wrong while placing your order.
							Please try again.
						</Alert>
					</Snackbar>
					<Paper
						elevation={0}
						sx={{
							maxWidth: "45em",
							backgroundColor: "transparent",
							marginBottom: "1em",
							width: "100%",
						}}
					>
						<div
							style={{
								padding: "1em",
								display: "flex",
								justifyContent: "space-between",
							}}
						>
							<Typography variant="h6">Cart Summary</Typography>
							<Typography
								variant="h6"
								component={Link}
								sx={{ color: "black" }}
								to="/cart"
							>
								Back to Cart
							</Typography>
						</div>
						<Divider sx={{ marginBottom: ".5em" }} />
						<Box
							style={{ padding: 3, width: "98%", margin: "auto" }}
						>
							{items.map((item, index) => (
								<Paper
									key={index}
									sx={{
										display: "flex",
										maxHeight: 150,
										flexShrink: 3,
										width: "100%",
										marginBottom: "3rem",
									}}
									elevation={1}
								>
									<Box
										sx={{
											borderRadius: "5px 20px 5px",
											objectFit: "fill",
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
												item.image1.slice(0, 4) ===
												"http"
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
											borderRadius: "5px 20px 5px",
										}}
									>
										<CardContent sx={{ paddingTop: 0 }}>
											<Grid
												container
												sx={{
													display: "flex",
													alignItems: "center",
													justifyContent:
														"space-between",
												}}
											>
												<Grid item xs={8} sm={8} md={8}>
													<Typography
														style={{
															fontSize: "18px",
															color: "black",
														}}
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
											</Grid>

											<div style={{ display: "flex" }}>
												{/* <Typography
												variant="h6"
												component="div"
												style={{ flex: 1 }}
											>
												{(
													item.price *
													item.quantity
												).toLocaleString()}
												<sup
													style={{
														fontSize: "10px",
													}}
												>
													Ksh
												</sup>
											</Typography> */}
												{item.size !== null ? (
													<Typography
														variant="h6"
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
											<Typography variant="h6">
												{item.quantity} * {item.price} ={" "}
												<u>
													{item.quantity * item.price}
												</u>
												<sup
													style={{
														fontSize: "10px",
													}}
												>
													Ksh
												</sup>
											</Typography>
											<br />
										</Box>
									</Box>
								</Paper>
							))}
							<Grid container>
								<Grid item xs={12} sm={12} md={8}>
									<Divider sx={{ marginBottom: "1em" }} />
									<div
										style={{
											display: "flex",
											justifyContent: "space-between",
										}}
									>
										<Typography
											variant="subtitle1"
											sx={{ paddingLeft: "5px" }}
										>
											Cart Total(sub-total)
										</Typography>
										<Typography
											variant="h6"
											sx={{ paddingRight: "5px" }}
										>
											{cartTotal.toLocaleString()}
										</Typography>
									</div>
									<Divider sx={{ marginBottom: "1em" }} />
									<div
										style={{
											display: "flex",
											justifyContent: "space-between",
										}}
									>
										<Typography
											variant="subtitle1"
											sx={{ paddingLeft: "5px" }}
										>
											Carriage Cost
										</Typography>
										<Typography
											variant="h6"
											sx={{ paddingRight: "5px" }}
										>
											{shippingPrice === 0
												? "Free"
												: shippingPrice}
										</Typography>
									</div>
									<Divider sx={{ marginBottom: "1em" }} />
									<div
										style={{
											display: "flex",
											justifyContent: "space-between",
										}}
									>
										<Typography
											variant="h6"
											sx={{ paddingLeft: "5px" }}
										>
											Grand Total
										</Typography>
										<Typography
											variant="h6"
											sx={{ paddingRight: "5px" }}
										>
											Ksh {grandTotal.toLocaleString()}
										</Typography>
									</div>
									<Divider />
									<Divider sx={{ marginBottom: "1em" }} />
								</Grid>
								<Grid
									item
									xs={12}
									sm={12}
									md={4}
									align="right"
									sx={{
										paddingRight: "5px",
										display: "flex",
										flexDirection: "column",
										gap: ".5rem",
									}}
								>
									<div
										style={{
											display: "flex",
											justifyContent: "flex-end",
											alignItems: "center",
											gap: ".5rem",
										}}
									>
										<Typography variant="subtitle1">
											Billing Method{" "}
										</Typography>
										<Receipt color="black" />
									</div>
									<div
										style={{
											display: "flex",
											justifyContent: "flex-end",
										}}
									>
										<Typography variant="subtitle1">
											{formData.billingInfo}
										</Typography>
									</div>

									<div
										style={{
											display: "flex",
											justifyContent: "flex-end",
										}}
									>
										<Custom.FloatingFab
											onClick={() => {
												navigation.go(1);
											}}
										>
											<Edit size={20} color="primary" />
										</Custom.FloatingFab>
									</div>
								</Grid>
							</Grid>
						</Box>
					</Paper>
					<Paper
						elevation={0}
						style={{
							backgroundColor: "transparent",
							maxWidth: "45em",
							overflow: "hidden",
						}}
					>
						<Typography
							component="div"
							sx={{ padding: 2 }}
							variant="h6"
						>
							Shipping Address
						</Typography>
						<Divider />
						<Grid container className={classes.form__data}>
							<Grid item xs={4} sm={4} md={3}>
								<ListItem>
									<ListItemAvatar>
										<Phone color="black" />
									</ListItemAvatar>
									<ListItemText
										primary="Phone"
										secondary={formData.telephone}
									/>
								</ListItem>
							</Grid>
							<Grid item xs={4} sm={4} md={3}>
								<ListItem>
									<ListItemAvatar>
										<LocationOn color="black" />
									</ListItemAvatar>
									<ListItemText
										primary="Location"
										secondary={formData.location}
									/>
								</ListItem>
							</Grid>
							<Grid item xs={4} sm={4} md={3}>
								<ListItem>
									<ListItemAvatar>
										<PersonPin color="black" />
									</ListItemAvatar>
									<ListItemText
										primary="Area"
										secondary={formData.area}
									/>
								</ListItem>
							</Grid>

							<Grid item xs={12} sm={12} md={3}>
								<ListItem>
									<ListItemAvatar>
										<Custom.FloatingFab
											onClick={() => {
												navigation.go(0);
											}}
										>
											<Edit size={25} color="primary" />
										</Custom.FloatingFab>
									</ListItemAvatar>
								</ListItem>
							</Grid>
						</Grid>
					</Paper>

					<Box
						style={{
							width: "100%",
							display: "flex",
							marginTop: "2em",
							justifyContent: "space-around",
							alignItems: "center",
							paddingTop: "10px",
							paddingBottom: "10px",
						}}
					>
						<Chip
							icon={<ArrowBackRounded />}
							variant="outlined"
							onClick={() => navigation.previous()}
							label="back"
						/>
						<Custom.ButtonPry
							disabled={disabled}
							sx={{ width: "40%" }}
							text="Place Order"
							onClick={() => handleCreateOrder()}
						/>
					</Box>
				</Box>
			</Paper>
		</div>
	);
};

export default OrderSummary;
