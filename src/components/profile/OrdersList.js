import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import {
	Alert, Box, CardMedia, Collapse,
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
import * as React from "react";
import TimeStamp from "react-timestamp";
import APIContext from "../../context/APIContext";
import OrdersContext from "../../context/OrdersContext";

function Row(props) {
	let { API_URL } = React.useContext(APIContext);
	const { order, orderItems } = props;
	const [open, setOpen] = React.useState(false);
	return (
		<React.Fragment>
			<TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
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
					<Typography
						
						sx={
							order.isDelivered === true
								? {color:"rgb(46,125,50)"}
								: order.isCancelled === true
								? {color:"rgb(211,47,47)"}
								: {color:"rgb(25,118,210)"}
						}
					>
						{order.isDelivered === true
							? "delivered"
							: order.isCancelled === true
							? "cancelled"
							: "pending"}
					</Typography>
				</TableCell>
			</TableRow>
			<TableRow>
				<TableCell
					style={{ paddingBottom: 0, paddingTop: 0 }}
					colSpan={6}
				>
					<Collapse in={open} timeout="auto" unmountOnExit>
						<Box sx={{ margin: 1 }}>
							<Typography
								variant="h6"
								gutterBottom
								component="div"
							>
								Order Items
							</Typography>
							<Table size="small" aria-label="purchases">
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
								<TableBody>
									{orderItems
										.filter(
											(item) => item.order === order.id
										)
										.map((orderItem, index) => (
											<TableRow key={index}>
												<TableCell
													component="th"
													scope="row"
												>
													<CardMedia
														component="img"
														image={orderItem.image.slice(
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
															// backgroundColor: "rgb(192,174,165)"
														}}
														height="150"
														loading="lazy"
													/>
												</TableCell>
												<TableCell>
													{orderItem.name}
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
											</TableRow>
										))}
								</TableBody>
							</Table>
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
		</React.Fragment>
	);
}


export default function OrdersList() {
	let { orderItems, orders, getOrders, getOrderItems } =
		React.useContext(OrdersContext);
	React.useEffect(() => {
		getOrders();
		getOrderItems();
	}, []);

	return (
		<Paper sx={{ width: "100%" }}>
			<TableContainer>
				<Table aria-label="collapsible table">
					<TableHead>
						<TableRow>
							<TableCell />
							<TableCell>ID</TableCell>
							<TableCell align="center">Created</TableCell>
							<TableCell align="center">Status</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{orders.map((order) => (
							<Row
								key={order.id}
								order={order}
								orderItems={orderItems}
							/>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Paper>
	);
}
