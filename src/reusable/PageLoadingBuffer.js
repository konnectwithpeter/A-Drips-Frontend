import React from 'react';
import { CircularProgress } from "@mui/material";

let PageLoadingBuffer=()=> {
	
	return (
		<div
			style={{
				display: "flex",
				padding: "2px",
				margin: "0 auto",
				width: "95%",
				minHeight: "80vh",
				alignItems: "center",
				backgroundColor: "transparent",
			}}
		>
			<CircularProgress
				sx={{
					backgroundColor: "transparent",
					margin: "auto",
					width: "fit-content",
				}}
				color="primary"
			/>
		</div>
	);
}
export default PageLoadingBuffer
