import { ExpandMore } from "@mui/icons-material";
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Typography,
} from "@mui/material";
import React from "react";

const AccountInfo = ({ user }) => {
	return (
		<Accordion style={{ backgroundColor: "white" }} elevation={0}>
			<AccordionSummary expandIcon={<ExpandMore />}>
				<Typography>Account Details</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<Typography>Name: {user.username}</Typography>
				<br />
				<Typography>Email: {user.email}</Typography>
				<Typography></Typography>
				<Typography></Typography>
			</AccordionDetails>
		</Accordion>
	);
};

export default AccountInfo;
