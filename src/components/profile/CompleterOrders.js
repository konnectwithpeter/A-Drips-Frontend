import {
	ExpandMore,
	KeyboardArrowDown,
	KeyboardArrowUp, TaskRounded
} from "@mui/icons-material";
import {
	Accordion, AccordionDetails, AccordionSummary, Box, Button, CardMedia, Collapse,
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow
} from "@mui/material";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TimeStamp from "react-timestamp";
import APIContext from "../../context/APIContext";
import OrdersContext from "../../context/OrdersContext";

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
	const [open, setOpen] = useState(false);

	//
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
					<TaskRounded color="success" />
				</TableCell>
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
													Delivered
												</TableCell>

												<TableCell align="right">
													<TimeStamp
														relative
														date={order.deliveredAt}
													/>
												</TableCell>
											</TableRow>
											<TableRow>
												<TableCell
													component="th"
													scope="row"
												>
													Paid
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

export default function CompleteOrders({ completeOrders }) {
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
				color="success"
			>
				Complete Orders
			</Typography>
			{completeOrders === undefined ? null : completeOrders.length ===
			  0 ? (
				<Typography component="div" align="center" sx={{ p: 3 }}>
					You dont have any complete orders.
					<br />
					<br />
					<Button
						variant="contained"
						onClick={() => navigate("/store")}
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
								<TableCell align="center">status</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							<tr>
								<td>
									<br />
								</td>
							</tr>
							{completeOrders.map((order) => (
								<Row
									key={order.id}
									order={order}
									orderItems={orderItems}
								/>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			)}
		</Paper>
	);
}
