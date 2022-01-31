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
	Tab,
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
import AccountInfo from "../components/profile/AccountInfo";
import AuthContext from "../context/AuthContext";

let useStyles = makeStyles((theme) => ({
	container: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		minHeight: "70vh",
		flexDirection: "column",
		[theme.breakpoints.up("md")]: {
			paddingTop: "1rem",
		},
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
		//minHeight: "80vh",

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
	greeting: {
		textAlign: "right",
		padding: ".25em",
		fontSize: "25px",
		[theme.breakpoints.down("md")]: {
			display: "none",
		},
	},
	small__greeting: {
		padding: "1rem .5rem",
		display: "flex",
		flexDirection: "column",
		gap: ".8rem",
		borderRadius: "10px",
		[theme.breakpoints.up("md")]: {
			width: "100%",
			minWidth: "59vw",
			maxWidth: "59vw",
		},
		[theme.breakpoints.down("md")]: {
			width: "90vw",
			margin: "1rem",

			flexDirection: "column",
		},
	},
}));

const ProfilePage = () => {
	let [domComponent, setDomComponent] = useState("Dashboard");
	let classes = useStyles();
	let { API_URL } = useContext(APIContext);
	let { user } = useContext(AuthContext);
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
		document.title = `A+ Drips - My account `;
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
		user,
	};

	return loading === true ? (
		<PageLoadingBuffer />
	) : (
		<div className={classes.container}>
			{domComponent === "Dashboard" && (
				<Paper elevation={1} className={classes.small__greeting}>
					<Typography sx={{ paddingLeft: "1rem", fontSize: "18px" }}>
						Hi, {user.username}
					</Typography>
					<AccountInfo {...props} />
				</Paper>
			)}

			<Paper className={classes.glassy} elevation={1}>
				<Box className={classes.toolbar}>
					{domComponent !== "Dashboard" && (
						<Tooltip title="Dashboard">
							<IconButton
								onClick={() => setDomComponent("Dashboard")}
							>
								<Dashboard className={classes.icon__btn} />
							</IconButton>
						</Tooltip>
					)}
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
					{domComponent === "Dashboard" && (
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
					)}

					<Paper elevation={0} className={classes.dom__component}>
						{domComponent === "Pending" ? (
							<WaitingOrders {...props} />
						) : domComponent === "Delivered" ? (
							<DoneOrders {...props} />
						) : domComponent === "Favorites" ? (
							<WishList {...props} />
						) : domComponent === "Cancelled" ? (
							<CancelledOrders {...props} />
						) : null}
					</Paper>
				</Box>
			</Paper>
			<Footer />
		</div>
	);
};

export default ProfilePage;
