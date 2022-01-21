import { Button, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
	return (
		<div
			style={{
				width: "95%",
				margin: "auto",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				height: "70vh",
			}}
		>
			<div style={{justifyContent: "center", color:"black"}}>
				<Typography variant="h3" sx={{textAlign: "center"}}>404</Typography>
				<Typography variant="h6" sx={{textAlign: "center"}}>PAGE NOT FOUND</Typography>
				<Button sx={{left: "25%"}} variant="outlined" component={Link} to="/">
					home
				</Button>
			</div>
		</div>
	);
};

export default NotFound;
