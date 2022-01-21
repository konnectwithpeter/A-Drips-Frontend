import {
	Cancel,
	CheckCircleRounded,
	Dashboard,
	Favorite,
	FavoriteRounded,
	Pending,
	PendingRounded,
} from "@mui/icons-material";
import {
	Box,
	IconButton,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Paper,
	Tooltip,
	Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Footer from "../components/homepage/Footer";
import CancelledOrders from "../components/profile/CancelledOrders";
import CollapsibleTable from "../components/profile/OrdersList";
import DoneOrders from "../components/profile/CompleterOrders";
import WaitingOrders from "../components/profile/PendingOrders";
import WishList from "../components/profile/WishList";
import APIContext from "../context/APIContext";
import OrdersContext from "../context/OrdersContext";
import WishesContext from "../context/WishListContext";
import PageLoadingBuffer from "../reusable/PageLoadingBuffer";

let useStyles = makeStyles((theme) => ({
	container: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		minHeight: "70vh",
		flexDirection: "column",
		// backgroundImage:
		// 	"linear-gradient(to top left, rgb(40,49,59) ,rgb(72,84,97))",

		//backgroundColor: "red",
	},
	glassy: {
		width: "100%",
		minWidth: "60vw",
		display: "flex",
		[theme.breakpoints.up("md")]: {
			maxWidth: "60vw",
			marginBottom: "3rem",
			marginTop: "2rem",
		},
		overflow: "auto",
		minHeight: "80vh",

		[theme.breakpoints.down("md")]: {
			width: "95vw",
			marginBottom: "1rem",
			marginTop: "1rem",
			flexDirection: "column",
		},
		backgroundColor: "",
		borderRadius: "10px",
	},
	quickrecap: {
		display: "flex",
		maxWidth: "100%",
		backgroundColor: "white",
		borderTopRightRadius: "10px",
	},
	toolbar: {
		display: "flex",
		borderRadius: "10px",
		alignItems: "center",
		backgroundColor: "white",
		flexDirection: "column",
		[theme.breakpoints.down("md")]: {
			flexDirection: "row",
			width: "100%",
			justifyContent: "space-around",
			paddingBottom: "1em",
		},
		[theme.breakpoints.up("md")]: {
			gap: "2em",
		},
		width: "10%",
	},
	icon__btn: {
		[theme.breakpoints.down("md")]: {
			fontSize: "30px",
		},
		[theme.breakpoints.up("md")]: {
			fontSize: "40px",
		},
	},
	right__div: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		width: "50%",
		gap: "2em",
		paddingRight: "1em",
	},
	left__div: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		width: "50%",
		gap: "2em",
		padding: "1em",
	},
	dom__component: {
		border: "0px",
		borderBottomRightRadius: "10px",
	},
}));

const ProfilePage = () => {
	let [domComponent, setDomComponent] = useState("Dashboard");
	let classes = useStyles();
	let { API_URL } = useContext(APIContext);
	let [locations, setLocations] = useState([]);
	let [loading, setLoading] = useState(true);

	const responsiveOrders = {
		desktop: {
			breakpoint: { max: 3000, min: 1024 },
			items: 3,
			slidesToSlide: 3, // optional, default to 1.
			partialVisibilityGutter: 40,
		},
		tablet: {
			breakpoint: { max: 1024, min: 464 },
			items: 2,
			slidesToSlide: 1, // optional, default to 1.
			partialVisibilityGutter: 20,
		},
		mobile: {
			breakpoint: { max: 464, min: 0 },
			items: 1,
			slidesToSlide: 1, // optional, default to 1.
			partialVisibilityGutter: 40,
		},
	};

	const responsiveItems = {
		desktop: {
			breakpoint: { max: 3000, min: 1024 },
			items: 4,
			slidesToSlide: 3, // optional, default to 1.
			partialVisibilityGutter: 40,
		},
		tablet: {
			breakpoint: { max: 1024, min: 464 },
			items: 3,
			slidesToSlide: 1, // optional, default to 1.
			partialVisibilityGutter: 20,
		},
		mobile: {
			breakpoint: { max: 464, min: 0 },
			items: 2,
			slidesToSlide: 1, // optional, default to 1.
			partialVisibilityGutter: 40,
		},
	};

	let { orders, getOrders, getOrderItems } = useContext(OrdersContext);
	let { wishes } = useContext(WishesContext);

	let getLocations = async () => {
		try {
			let res = await axios.get(`${API_URL}api/shop/shipping-locations/`);
			setLocations(res.data);
		} catch (err) {
			console.log(err);
		}
		await getOrders();
		await getOrderItems();
		setLoading(false);
	};

	useEffect(() => {
		getLocations();
	}, []);

	let pendingOrders = orders.filter(
		(order) => order.isCancelled === false && order.isDelivered === false
	);
	let completeOrders = orders.filter(
		(order) => order.isDelivered === true && order.isCancelled === false
	);
	let cancelledOrders = orders.filter((order) => order.isCancelled === true);
	let props = {
		locations,
		responsiveOrders,
		responsiveItems,
		pendingOrders,
		completeOrders,
		cancelledOrders,
	};
	return loading === true ? (
		<PageLoadingBuffer />
	) : (
		<div className={classes.container}>
			<Paper className={classes.glassy} elevation={5}>
				<Box className={classes.toolbar}>
					<Tooltip title="Dashboard">
						<IconButton
							onClick={() => setDomComponent("Dashboard")}
						>
							<Dashboard className={classes.icon__btn} />
						</IconButton>
					</Tooltip>
					<Tooltip title="Pending">
						<IconButton onClick={() => setDomComponent("Pending")}>
							<Pending className={classes.icon__btn} />
						</IconButton>
					</Tooltip>
					<Tooltip title="Delivered">
						<IconButton
							onClick={() => setDomComponent("Delivered")}
						>
							<CheckCircleRounded className={classes.icon__btn} />
						</IconButton>
					</Tooltip>
					<Tooltip title="Favorites">
						<IconButton
							onClick={() => setDomComponent("Favorites")}
						>
							<Favorite className={classes.icon__btn} />
						</IconButton>
					</Tooltip>
					<Tooltip title="Cancelled">
						<IconButton
							onClick={() => setDomComponent("Cancelled")}
						>
							<Cancel className={classes.icon__btn} />
						</IconButton>
					</Tooltip>
				</Box>
				<Box sx={{ flex: 1 }}>
					{domComponent === "Dashboard" ? (
						<Box className={classes.quickrecap}>
							<div component={List} className={classes.left__div}>
								<ListItem
									component={Paper}
									sx={{
										borderRadius: "1rem",
										maxWidth: "fit-content",
										justifyContent: "space-between",
									}}
									elevation={5}
								>
									<ListItemAvatar>
										<PendingRounded
											color="primary"
											fontSize="large"
										/>
									</ListItemAvatar>
									<ListItemText
										primary={
											<Typography variant="h4">
												<strong>
													{pendingOrders.length}
												</strong>
											</Typography>
										}
										secondary="Pending Orders"
									/>
								</ListItem>
								<ListItem
									component={Paper}
									sx={{
										borderRadius: "1rem",
										maxWidth: "fit-content",
										justifyContent: "space-between",
									}}
									elevation={5}
								>
									<ListItemAvatar>
										<FavoriteRounded
											style={{ color: "#ab47bc" }}
											fontSize="large"
										/>
									</ListItemAvatar>
									<ListItemText
										primary={
											<Typography variant="h4">
												<strong>{wishes.length}</strong>
											</Typography>
										}
										secondary="Wish list Items"
									/>
								</ListItem>
							</div>
							<div
								component={List}
								className={classes.right__div}
							>
								<ListItem
									component={Paper}
									sx={{
										borderRadius: "1rem",
										maxWidth: "fit-content",
										justifyContent: "space-between",
									}}
									elevation={5}
								>
									<ListItemAvatar>
										<CheckCircleRounded
											color="success"
											fontSize="large"
										/>
									</ListItemAvatar>
									<ListItemText
										primary={
											<Typography variant="h4">
												<strong>
													{completeOrders.length}
												</strong>
											</Typography>
										}
										secondary="Complete Orders"
									/>
								</ListItem>
								<ListItem
									component={Paper}
									sx={{
										borderRadius: "1rem",
										maxWidth: "fit-content",
										justifyContent: "space-between",
									}}
									elevation={5}
								>
									<ListItemAvatar>
										<Cancel
											color="error"
											fontSize="large"
										/>
									</ListItemAvatar>
									<ListItemText
										primary={
											<Typography variant="h4">
												<strong>
													{cancelledOrders.length}
												</strong>
											</Typography>
										}
										secondary="Cancelled Orders"
									/>
								</ListItem>
							</div>
						</Box>
					) : null}

					<Paper elevation={0} className={classes.dom__component}>
						{domComponent === "Dashboard" ? (
							<CollapsibleTable {...props} />
						) : domComponent === "Pending" ? (
							<WaitingOrders {...props} />
						) : domComponent === "Delivered" ? (
							<DoneOrders {...props} />
						) : domComponent === "Favorites" ? (
							<WishList {...props} />
						) : domComponent === "Cancelled" ? (
							<CancelledOrders {...props} />
						) : (
							<CollapsibleTable {...props} />
						)}
					</Paper>
				</Box>
			</Paper>
			<Footer />
			{/* <div
				style={{
					width: "100%",
					paddingBottom: "3em",
					paddingTop: "1em",
				}}
			>
				<Paper elevation={0}>
					<Grid
						container
						spacing={2}
						sx={{
							margin: "auto",
							marginBottom: "2em",
							width: "95%",
						}}
					>
						<Grid xs={6} sm={6} md={3} lg={3} item elevation={5}>
							<ListItem
								component={Paper}
								sx={{ borderRadius: "1rem" }}
								elevation={5}
							>
								<ListItemAvatar>
									<PendingRounded
										color="primary"
										fontSize="large"
									/>
								</ListItemAvatar>
								<ListItemText
									primary={
										<Typography variant="h4">
											<strong>
												{pendingOrders.length}
											</strong>
										</Typography>
									}
									secondary="Pending Orders"
								/>
							</ListItem>
						</Grid>
						<Grid xs={6} sm={6} md={3} lg={3} item elevation={5}>
							<ListItem
								component={Paper}
								sx={{ borderRadius: "1rem" }}
								elevation={5}
							>
								<ListItemAvatar>
									<DoneAllRounded
										color="success"
										fontSize="large"
									/>
								</ListItemAvatar>
								<ListItemText
									primary={
										<Typography variant="h4">
											<strong>
												{completeOrders.length}
											</strong>
										</Typography>
									}
									secondary="Complete Orders"
								/>
							</ListItem>
						</Grid>
						<Grid xs={6} sm={6} md={3} lg={3} item elevation={5}>
							<ListItem
								component={Paper}
								sx={{ borderRadius: "1rem" }}
								elevation={5}
							>
								<ListItemAvatar>
									<FavoriteRounded
										style={{ color: "#ab47bc" }}
										fontSize="large"
									/>
								</ListItemAvatar>
								<ListItemText
									primary={
										<Typography variant="h4">
											<strong>{wishes.length}</strong>
										</Typography>
									}
									secondary="My Wish list Items"
								/>
							</ListItem>
						</Grid>
						<Grid xs={6} sm={6} md={3} lg={3} item elevation={5}>
							<ListItem
								component={Paper}
								sx={{ borderRadius: "1rem" }}
								elevation={5}
							>
								<ListItemAvatar>
									<ErrorOutlineRounded
										color="error"
										fontSize="large"
									/>
								</ListItemAvatar>
								<ListItemText
									primary={
										<Typography variant="h4">
											<strong>
												{cancelledOrders.length}
											</strong>
										</Typography>
									}
									secondary="Cancelled Orders"
								/>
							</ListItem>
						</Grid>
					</Grid>
				</Paper>
				<PendingOrders {...props} />
				<CompleteOrders {...props} />
				<WishList {...props} />
				<CancelledOrders {...props} />
			</div> */}
			{/* <Footer /> */}
		</div>
	);
};

export default ProfilePage;
