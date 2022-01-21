import {
	ExpandMore,
	KeyboardArrowDown,
	KeyboardArrowUp,
	LocalShippingRounded
} from "@mui/icons-material";
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Alert,
	AlertTitle,
	Box,
	Button,
	CardMedia,
	Chip,
	CircularProgress,
	Collapse,
	IconButton,
	Modal,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField
} from "@mui/material";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TimeStamp from "react-timestamp";
import APIContext from "../../context/APIContext";
import AuthContext from "../../context/AuthContext";
import OrdersContext from "../../context/OrdersContext";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	boxShadow: 24,
	p: 4,
};

let useStyles = makeStyles((theme) => ({
	card: {
		borderRadius: "10px",
		border: "0px solid black",
	},
}));
function Row(props) {
	let classes = useStyles();
	let { API_URL } = useContext(APIContext);
	const { order, orderItems, locations } = props;
	let { user, authTokens } = useContext(AuthContext);
	let { getOrders, getOrderItems } = useContext(OrdersContext);
	const [open, setOpen] = useState(false);
	const [openModal, setOpenModal] = useState(false);
	const handleCloseModal = () => setOpenModal(false);
	let endTime = new Date();
	let [clickedOrder, setClickedOrder] = useState();
	let [cancelConfirmed, setCancelConfirmed] = useState(false);
	const [values, setValues] = useState({ reason: "" });
	let [disable, setDisable] = useState(true);

	const handleChange = (prop) => (event) => {
		setValues({ ...values, [prop]: event.target.value });
		if (values.reason.length > 5) {
			setDisable(false);
		} else {
			setDisable(true);
		}
	};

	let handleCancelOrder = async () => {
		if (cancelConfirmed === true) {
			try {
				await fetch(`${API_URL}api/orders/`, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + String(authTokens.access),
					},
					body: JSON.stringify({
						order: clickedOrder.id,
						user: user,
						reason: values.reason,
					}),
				});
			} catch (err) {
				console.log(err);
			}
		}
		setCancelConfirmed(false);
	};

	let handleSubmit = () => {
		setCancelConfirmed(true);
		setOpenModal(false);
	};

	let handleTimeSpinner = (item) => {
		let start = new Date();
		let another = new Date();

		//number of days required to ship this order. Fetched from shipping locations
		let end = locations.filter((loc) => loc.location === item.location)[0]
			.days;

		//one day in minutes
		let oneDay = 1000 * 60 * 60;
		let created = new Date(item.createdAt);
		let toBeDeliveredAt = new Date(
			another.setDate(created.getDate() + end)
		);
		endTime = toBeDeliveredAt;
		let diff = toBeDeliveredAt.getTime() - start.getTime();

		let totalHours = Math.round(
			(toBeDeliveredAt.getTime() - created.getTime()) / oneDay
		);
		let remainingHours = Math.round(diff / oneDay);

		//calculate the progress in %
		let progress = Math.round(
			((totalHours - remainingHours) / totalHours) * 100
		);

		if (progress < 2) {
			return 2;
		}
		if (progress > 100) {
			return 100;
		} else {
			return progress;
		}
	};

	useEffect(() => {
		handleCancelOrder();
		getOrders();
		getOrderItems();
	}, [cancelConfirmed]);

	useEffect(() => {
		getOrders();
		getOrderItems();
	}, []);
	return (
		<React.Fragment>
			<Paper
				component="tr"
				elevation={5}
				sx={{ "& > *": { borderBottom: "unset" } }}
				style={{
					borderRadius: "10px",
					padding: "2em",
					backgroundColor: "transparent",
				}}
			>
				<TableCell>
					<IconButton
						aria-label="expand row"
						size="small"
						onClick={() => setOpen(!open)}
					>
						{open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
					</IconButton>
				</TableCell>
				<TableCell component="th" scope="row">
					{order.id}
				</TableCell>
				<TableCell align="center">
					<TimeStamp relative date={order.createdAt} />
				</TableCell>
				<TableCell align="center">
					<Box
						sx={{
							position: "relative",
							display: "inline-flex",
						}}
					>
						<CircularProgress
							variant="determinate"
							value={handleTimeSpinner(order)}
						/>

						<Box
							sx={{
								top: 0,
								left: 0,
								bottom: 0,
								right: 0,
								position: "absolute",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
							}}
						>
							<Typography
								variant="caption"
								component="div"
								color="text.secondary"
							>
								<LocalShippingRounded color="primary" />
							</Typography>
						</Box>
					</Box>
				</TableCell>
				<Modal open={openModal} onClose={handleCloseModal}>
					<Paper
						sx={{
							...style,
							borderRadius: "10px",
							//backgroundColor: "#ffb74d",
						}}
					>
						<Alert severity="warning">
							<AlertTitle>Alert</AlertTitle>
							You are about to cancel this order!
						</Alert>
						<form onSubmit={handleSubmit}>
							<TextField
								style={{
									marginTop: "1em",
									marginBottom: "1em",
									width: "100%",
								}}
								multiline
								rows={4}
								label="Reason for cancelling"
								value={values.reason}
								onChange={handleChange("reason")}
								helperText="*We would appreciate if you coul let us know the reason for cancelling this order.[Atleast one sentence]"
								required
							/>

							<div
								justify="space-between"
								style={{
									display: "flex",
									justifyContent: "space-between",
									marginTop: "1em",
								}}
							>
								<Button type="submit" disabled={disable}>
									Cancel Order
								</Button>

								<Button onClick={() => setOpenModal(false)}>
									close
								</Button>
							</div>
						</form>
					</Paper>
				</Modal>
			</Paper>

			<tr>
				<td style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
					<Collapse in={open} timeout="auto" unmountOnExit>
						<Box sx={{ margin: 1 }}>
							<Accordion sx={{ marginBottom: "1em" }}>
								<AccordionSummary expandIcon={<ExpandMore />}>
									<Box
										sx={{
											display: "flex",
											alignItems: "center",
											justifyContent: "space-between",
											padding: "2px",
											width: "80%",
										}}
									>
										<Typography
											variant="h6"
											gutterBottom
											component="div"
										>
											More Details
										</Typography>
										<Chip
											size="small"
											color="error"
											variant="outlined"
											onClick={() => {
												setOpenModal(true);
												setClickedOrder(order);
											}}
											label="Cancel Order"
										/>
									</Box>
								</AccordionSummary>
								<AccordionDetails>
									<Table>
										<TableBody>
											<TableRow>
												<TableCell
													component="th"
													scope="row"
												>
													Expect to Arrive
												</TableCell>

												<TableCell align="right">
													<TimeStamp
														relative
														date={endTime}
													/>
												</TableCell>
											</TableRow>
											<TableRow>
												<TableCell
													component="th"
													scope="row"
												>
													To Pay
												</TableCell>

												<TableCell align="right">
													Ksh{" "}
													{order.totalPrice.toLocaleString()}
												</TableCell>
											</TableRow>
											<TableRow>
												<TableCell
													component="th"
													scope="row"
												>
													Location
												</TableCell>

												<TableCell align="right">
													{order.location}
												</TableCell>
											</TableRow>
											<TableRow>
												<TableCell
													component="th"
													scope="row"
												>
													Area
												</TableCell>

												<TableCell align="right">
													{order.area}
												</TableCell>
											</TableRow>
										</TableBody>
									</Table>
								</AccordionDetails>
							</Accordion>
							<Table size="small" component={Accordion}>
								<AccordionSummary expandIcon={<ExpandMore />}>
									<Typography
										variant="h6"
										gutterBottom
										component="div"
									>
										Order Items
									</Typography>
								</AccordionSummary>
								<TableHead>
									<TableRow>
										<TableCell></TableCell>
										<TableCell>Item</TableCell>
										<TableCell align="center">
											price
										</TableCell>
										<TableCell align="center">
											Qty
										</TableCell>
										<TableCell align="center">
											Total price (Ksh)
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody component={AccordionDetails}>
									{orderItems
										.filter(
											(item) => item.order === order.id
										)
										.map((orderItem, index) => (
											<Paper
												component={TableRow}
												className={classes.card}
												key={index}
											>
												<TableCell
													component="th"
													scope="row"
												>
													<CardMedia
														component="img"
														image={
															orderItem.image.slice(
																0,
																4
															) === "http"
																? `${orderItem.image}`
																: `${API_URL}${orderItem.image.slice(
																		1
																  )}`
														}
														alt={orderItem.name}
														style={{
															width: "auto",
															objectFit: "cover",
															margin: "auto",
															borderRadius:
																"15px",
															padding: 0,
															// backgroundColor: "rgb(192,174,165)"
														}}
														height="100"
														loading="lazy"
													/>
												</TableCell>
												<TableCell>
													<Link
														to={`/product/${orderItem.item_slug}`}
														underline="hover"
													>
														{orderItem.name}
													</Link>
												</TableCell>
												<TableCell align="center">
													{orderItem.price}
												</TableCell>
												<TableCell align="center">
													{orderItem.qty}
												</TableCell>
												<TableCell align="center">
													{orderItem.price *
														orderItem.qty}
												</TableCell>
											</Paper>
										))}
								</TableBody>
							</Table>
						</Box>
					</Collapse>
				</td>
			</tr>
			<Paper
				elevation={0}
				component={TableRow}
				style={{ backgroundColor: "transparent" }}
			>
				<td>
					<br />
				</td>
			</Paper>
		</React.Fragment>
	);
}

export default function WaitingOrders({ pendingOrders, locations }) {
	let { orderItems, orders, getOrders, getOrderItems } =
		useContext(OrdersContext);
	useEffect(() => {
		getOrders();
		getOrderItems();
	}, []);

	const navigate = useNavigate();

	return (
		<Paper elevation={0} sx={{ width: "100%", paddingTop: "1em" }}>
			<Typography
				variant="h6"
				sx={{ textAlign: "center", fontWeight: "bold" }}
			>
				Pending Orders
			</Typography>
			{pendingOrders === undefined ? null : pendingOrders.length === 0 ? (
				<Typography component="div" align="center" sx={{ p: 3 }}>
					You dont have any pending orders.
					<br />
					<br />
					<Button
						variant="contained"
						onClick={() => navigate("/shop")}
					>
						click to shop
					</Button>
				</Typography>
			) : (
				<TableContainer sx={{ maxWidth: "100%" }}>
					<Table
						aria-label="collapsible table"
						sx={{ maxWidth: "90%", margin: "1em" }}
					>
						<TableHead>
							<TableRow>
								<TableCell />
								<TableCell>Id</TableCell>
								<TableCell align="center">Created</TableCell>
								<TableCell align="center">Progress</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							<tr>
								<td>
									<br />
								</td>
							</tr>
							{pendingOrders.map((order) => (
								<Row
									key={order.id}
									order={order}
									orderItems={orderItems}
									locations={locations}
								/>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			)}
		</Paper>
	);
}
