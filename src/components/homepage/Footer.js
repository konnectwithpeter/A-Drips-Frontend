import { Call, Mail, WhatsApp } from "@mui/icons-material";
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Grid,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Typography
} from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import SubscribeForm from "../../reusable/SubscribeForm";

const Footer = () => {
	const navigate = useNavigate();
	const [openPolicy, setOpenPolicy] = React.useState(false);

	const handleClickOpen = () => () => {
		setOpenPolicy(true);
	};

	const handleClose = () => {
		setOpenPolicy(false);
	};

	return (
		<>
			<Box
				sx={{
					backgroundColor: "black",
					color: "white",
					bottom: 0,
					position: "relative",
				}}
			>
				<Grid container sx={{ justifyContent: "center" }}>
					<Grid
						item
						xs={6}
						sm={6}
						md={3}
						lg={3}
						sx={{
							paddingTop: "1em",
							display: "flex",
							justifyContent: "center",
						}}
					>
						<div style={{ width: "fit-content" }}>
							<Typography sx={{ textAlign: "center" }}>
								ABOUT
							</Typography>
							<br />
							<Typography sx={{ textAlign: "center" }}>
								Thanks for visiting A<sup>+</sup> Drips. We are
								an online clothing store selling resell and
								brand new products. For your convenience, we also
								deliver products to your doorstep.
							</Typography>
							<br />
							<List sx={{ width: "fit-content", margin: "auto" }}>
								<ListItem >
									<ListItemButton
										disablepadding="true"
										sx={{ padding: 0 }}
										onClick={handleClickOpen("open-policy")}
									>
										<ListItemText primary="Terms & Conditions" />
									</ListItemButton>
								</ListItem>
							</List>
						</div>

						<Dialog
							open={openPolicy}
							onClose={handleClose}
							scroll="body"
						>
							<DialogTitle id="scroll-dialog-title">
								Return & Refund Policy
							</DialogTitle>
							<DialogContent>
								<DialogContentText
									id="scroll-dialog-description"
									tabIndex={-1}
								>
									Thanks for purchasing our products. In order
									to be eligible for a refund, you have to
									return the product within 1 day of your
									purchase. The product must be in the same
									condition that you receive it and undamaged
									in any way. After we receive your item, our
									team of professionals will inspect it and
									process your refund within 6 hours. The
									money will be refunded via M-Pesa to the
									number used in placing the order. The buyer
									retains the right to change this number at
									any given time. If the product is damaged in
									any way, or you have initiated the return
									after 24 hours have passed, you will not be
									eligible for a refund. If anything is
									unclear or you have more questions feel free
									to contact our customer support team.
								</DialogContentText>
							</DialogContent>
							<DialogActions>
								<Button onClick={() => setOpenPolicy(false)}>
									Close
								</Button>
							</DialogActions>
						</Dialog>
					</Grid>
					<Grid item xs={12} sm={12} md={3} lg={3}>
						<div
							style={{
								margin: "auto",
								width: "fit-content",
								paddingTop: "1em",
							}}
						>
							<Typography sx={{ textAlign: "center" }}>
								IMPORTANT LINK
							</Typography>
							<br />
							<List
								sx={{
									maxWidth: "fit-content",
									margin: "auto",
								}}
							>
								<ListItem  sx={{ textAlign: "center", margin:0, padding: 0 }}>
									<ListItemButton
										disablepadding="true"
										sx={{ padding: 0 }}
										component={Link}
										to="/"
									>
										<ListItemText primary="Home" />
									</ListItemButton>
								</ListItem>
								<ListItem  sx={{ textAlign: "center", margin:0, padding: 0 }}>
									<ListItemButton
										disablepadding="true"
										sx={{ padding: 0 }}
										onClick={() => navigate("/shop")}
									>
										<ListItemText primary="Shop" />
									</ListItemButton>
								</ListItem>
								<ListItem sx={{ textAlign: "center", margin:0, padding: 0 }}>
									<ListItemButton
										disablepadding="true"
										sx={{ padding: 0 }}
										onClick={() => navigate("/news")}
									>
										<ListItemText primary="News/Blogs" />
									</ListItemButton>
								</ListItem>
							</List>
						</div>
					</Grid>
					<Grid
						item
						xs={12}
						sm={12}
						md={3}
						lg={3}
						sx={{
							justifyContent: "center",
							paddingTop: "1em",
						}}
					>
						<div
							style={{
								maxWidth: "fit-content",
								margin: "auto",
							}}
						>
							<Typography sx={{ textAlign: "center" }}>
								NEWSLETTER
							</Typography>
							<br />
							<br />
							<Typography sx={{ fontSize: 12 }}>
								Get notified when as soon as new deals are
								available.
							</Typography>
							<br />
							<SubscribeForm />
						</div>
					</Grid>
					<Grid
						item
						xs={12}
						sm={12}
						md={3}
						lg={3}
						sx={{
							justifyContent: "center",
							paddingTop: "1em",
						}}
					>
						<Typography sx={{ textAlign: "center" }}>
							CONTACT INFO
						</Typography>
						<br />

						<List
							sx={{
								maxWidth: "fit-content",
								margin: "auto",
							}}
						>
							<ListItem>
								<ListItemIcon>
									<Call color="primary" />
								</ListItemIcon>
								<ListItemText
									primary={
										<Typography>
											0707070707 <br /> 0707070077
										</Typography>
									}
								/>
							</ListItem>
							<ListItem>
								<ListItemIcon>
									<WhatsApp color="success" />
								</ListItemIcon>
								<ListItemText
									primary={
										<Typography>
											0707070707 <br /> 0707070077
										</Typography>
									}
								/>
							</ListItem>
							<ListItem>
								<ListItemIcon>
									<Mail color="primary" />
								</ListItemIcon>
								<ListItemText
									primary={
										<Typography>
											aplusdrips@gmail.com
										</Typography>
									}
								/>
							</ListItem>
						</List>
					</Grid>
				</Grid>
			</Box>
		</>
	);
};

export default Footer;
