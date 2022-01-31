import {
	AccountBalanceWalletRounded,
	LocalOfferRounded,
	LocalShippingRounded,
	PolicyRounded
} from "@mui/icons-material";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Grid,
	Paper
} from "@mui/material";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import * as React from "react";
import Custom from "../../reusable/Custom";

let useStyles = makeStyles((theme) => ({
	body: {
		[theme.breakpoints.down("sm")]: {
			fontSize: 11,
			textAlign: "left",
		},
	},
	label: {
		padding: 5,
		marginBottom: "2em",
		marginTop: "2em",
		display: "flex",
		width: "98%",
		justifyContent: "center",
	},
}));

const RiskReducers = () => {
	let classes = useStyles();
	const [openPolicy, setOpenPolicy] = React.useState(false);

	const handleClose = () => {
		setOpenPolicy(false);
	};

	return (
		<div>
			<div style={{ display: "flex", flex: 1, justifyContent: "start" }}>
				<div className={classes.label}>
					<Custom.TextPriStyle
						component="h3"
						sx={{ fontSize: "25px", fontWeight: "light-bold" }}
						variant="subtitle1"
						text="Why Choose Us"
					/>
				</div>
			</div>
			<Paper
				elevation={0}
				sx={{ backgroundColor: "transparent", padding: 2 }}
			>
				<Grid container spacing={2}>
					<Grid item xs={6} sm={6} md={6} lg={6}>
						<Paper
							elevation={0}
							sx={{
								//backgroundColor: "rgb(247,247,247)",
								padding: 2,
								borderRadius: "10px",
								maxWidth: "30rem",
								margin: "0 auto",
							}}
						>
							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
								}}
							>
								<LocalOfferRounded color="primary" />
								<Typography
									sx={{ fontWeight: "bold" }}
									variant="subtitle1"
									component="h4"
								>
									Prices
								</Typography>
							</div>
							<Typography
								variant="body1"
								className={classes.body}
							>
								Get awesome clothing for pocket friendly prices.
								Place your order now and enjoy the cheapest
								prices in the market with quick deliveries.
							</Typography>
						</Paper>
					</Grid>
					<Grid item xs={6} sm={6} md={6} lg={6}>
						<Paper
							elevation={0}
							sx={{
								//backgroundColor: "rgb(247,247,247)",
								padding: 2,
								borderRadius: "10px",
								maxWidth: "30rem",
								margin: "0 auto",
							}}
						>
							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
								}}
							>
								<LocalShippingRounded color="primary" />
								<Typography
									sx={{ fontWeight: "bold" }}
									variant="subtitle1"
									component="h4"
								>
									Delivery
								</Typography>
							</div>
							<Typography
								variant="body1"
								className={classes.body}
							>
								Get your products delivered to you faster than
								usual. As soon as you place an order, our team
								will deliver within 48 hrs to your doorstep.
							</Typography>
						</Paper>
					</Grid>
					<Grid item xs={6} sm={6} md={6} lg={6}>
						<Paper
							elevation={0}
							sx={{
								//backgroundColor: "rgb(247,247,247)",
								padding: 2,
								borderRadius: "10px",
								maxWidth: "30rem",
								margin: "0 auto",
							}}
						>
							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
								}}
							>
								<AccountBalanceWalletRounded color="primary" />
								<Typography
									sx={{ fontWeight: "bold" }}
									variant="subtitle1"
									component="h4"
								>
									Ordering
								</Typography>
							</div>
							<Typography
								variant="body1"
								className={classes.body}
							>
								All you need to place an order is just your
								phone number.Also, don't worry about payment,
								you only pay when your order is delivered.
							</Typography>
						</Paper>
					</Grid>
					<Grid item xs={6} sm={6} md={6} lg={6}>
						<Paper
							elevation={0}
							sx={{
								//backgroundColor: "rgb(247,247,247)",
								padding: 2,
								borderRadius: "10px",
								maxWidth: "30rem",
								margin: "0 auto",
							}}
						>
							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
								}}
							>
								<PolicyRounded color="primary" />
								<Typography
									sx={{ fontWeight: "bold" }}
									variant="subtitle1"
									component="h4"
								>
									Policies
								</Typography>
							</div>
							<Typography
								variant="body1"
								className={classes.body}
							>
								We are so convinced that you will absolutely
								love our products. Need to return purchased
								items? Check our{" "}
								<span
									style={{
										textDecoration: "underline",
										cursor: "pointer",
									}}
									onClick={() => setOpenPolicy(true)}
								>
									return and refund
								</span>{" "}
								policies.
							</Typography>
						</Paper>
					</Grid>
				</Grid>
			</Paper>
			<Dialog open={openPolicy} onClose={handleClose} scroll="body">
				<DialogTitle id="scroll-dialog-title">
					Return & Refund Policy
				</DialogTitle>
				<DialogContent>
					<DialogContentText
						id="scroll-dialog-description"
						tabIndex={-1}
					>
						Thanks for purchasing our products. In order to be
						eligible for a refund, you have to return the product
						within 1 day of your purchase. The product must be in
						the same condition that you receive it and undamaged in
						any way. After we receive your item, our team of
						professionals will inspect it and process your refund
						within 6 hours. The money will be refunded via M-Pesa to
						the number used in placing the order. The buyer retains
						the right to change this number at any given time. If
						the product is damaged in any way, or you have initiated
						the return after 24 hours have passed, you will not be
						eligible for a refund. If anything is unclear or you
						have more questions feel free to contact our customer
						support team.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setOpenPolicy(false)}>Close</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default RiskReducers;
