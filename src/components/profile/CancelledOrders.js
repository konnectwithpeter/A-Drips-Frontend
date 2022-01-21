import {
	CancelRounded,
	ExpandMore,
	KeyboardArrowDown,
	KeyboardArrowUp
} from "@mui/icons-material";
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Box, CardMedia,
	Collapse,
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
					<CancelRounded color="error" />
				</TableCell>
			</Paper>

			<tr>
				<td style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
					<Collapse in={open} timeout="auto" unmountOnExit>
						<Box sx={{ margin: 1 }}>
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

export default function CancelledOrders({ cancelledOrders }) {
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
				Cancelled Orders
			</Typography>
			{cancelledOrders === undefined ||
			cancelledOrders.length === 0 ? null : (
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
							{cancelledOrders.map((order) => (
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
