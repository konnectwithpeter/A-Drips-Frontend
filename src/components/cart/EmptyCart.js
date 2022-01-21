import { Paper, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const EmptyCart = () => {
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				width: "100%",
				minHeight: "80vh",
			}}
		>
			<Paper
				style={{
					padding: "20px",
					maxWidth: "500px",
					margin: "0 auto",
				}}
				elevation={6}
			>
				<Typography
					variant="h6"
					component="h3"
					style={{ textTransform: "none" }}
				>
					Your cart is empty,
					<u>
						<Link to="/shop">shop some items</Link>
					</u>
					.
				</Typography>
			</Paper>
		</div>
	);
};

export default EmptyCart;
