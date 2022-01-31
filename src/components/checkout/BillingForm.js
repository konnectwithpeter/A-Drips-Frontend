import { ArrowBackRounded, ArrowForwardRounded } from "@mui/icons-material";
import {
	Chip,
	Divider,
	FormControl,
	FormControlLabel,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Paper,
	Radio,
	RadioGroup,
	Typography
} from "@mui/material";
import React from "react";
import Custom from "../../reusable/Custom";

const BillingForm = ({ formData, setForm, navigation }) => {
	let { billingInfo } = formData;

	return (
		<div
			style={{
				width: "95%",
				height: "100%",
				padding: "1em",
				paddingTop: "0px",
				margin: "auto",
			}}
		>
			<Paper
				elevation={1}
				sx={{
					maxWidth: "95%",
					margin: "auto",
					width: "fit-content",
					//backgroundColor:"transparent"
				}}
				align="center"
			>
				<form onSubmit={() => navigation.next()}>
					<FormControl required>
						<Typography variant="h6">
							Billing Information
						</Typography>
						<RadioGroup
							name="billingInfo"
							value={billingInfo}
							onChange={setForm}
						>
							<List
								sx={{
									width: "100%",
								}}
							>
								<ListItem alignItems="flex-start">
									<ListItemAvatar>
										<FormControlLabel
											value="M-Pesa"
											control={<Radio required={true} />}
											label=""
										/>
									</ListItemAvatar>
									<ListItemText
										primary="Lipa na M-Pesa on Delivery"
										secondary={
											<React.Fragment>
												<Typography
													sx={{ display: "inline" }}
													component="span"
													variant="body2"
													color="text.primary"
												>
													Via M-Pesa
												</Typography>
												{
													" — pay using M-Pesa after delivery."
												}
											</React.Fragment>
										}
									/>
								</ListItem>
								<Divider variant="inset" component="li" />
								<ListItem alignItems="flex-start">
									<ListItemAvatar>
										<FormControlLabel
											value="PayPal"
											control={<Radio required={true} />}
											label=""
											disabled
										/>
									</ListItemAvatar>
									<ListItemText
										primary="Use PayPal"
										secondary={
											<React.Fragment>
												<Typography
													sx={{ display: "inline" }}
													component="span"
													variant="body2"
													color="text.primary"
												>
													PayPal
												</Typography>
												{
													" — Option not available, will be implemented soon"
												}
											</React.Fragment>
										}
									/>
								</ListItem>
								<Divider variant="inset" component="li" />
								<ListItem alignItems="flex-start">
									<ListItemAvatar>
										<FormControlLabel
											value="Banking Card"
											control={<Radio />}
											label=""
											disabled
										/>
									</ListItemAvatar>
									<ListItemText
										primary="Use Banking Card"
										secondary={
											<React.Fragment>
												<Typography
													sx={{ display: "inline" }}
													component="span"
													variant="body2"
													color="text.primary"
												>
													Credit Card
												</Typography>
												{
													" — Option not available, will be implemented soon"
												}
											</React.Fragment>
										}
									/>
								</ListItem>
								<ListItem
									style={{ justifyContent: "space-between" }}
								>
									<Chip
										icon={<ArrowBackRounded />}
										variant="outlined"
										sx={{ width: "30%" }}
										onClick={() => navigation.previous()}
										label="back"
									/>

									<Custom.ButtonPry
										style={{
											width: "40%",
										}}
										backicon={
											<ArrowForwardRounded
												color="black"
												size={10}
											/>
										}
										text="Next"
										type="submit"
									/>
								</ListItem>
							</List>
						</RadioGroup>
					</FormControl>
				</form>
			</Paper>
		</div>
	);
};

export default BillingForm;
