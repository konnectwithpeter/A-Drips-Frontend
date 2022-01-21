import { Button, Paper, Typography } from "@mui/material";
import React, { useContext } from "react";
import SearchContext from "../../context/SearchContext";

const ZeroResults = () => {

	let {handleOnClear} = useContext(SearchContext);
	return (
		<div
			style={{
				display: "flex",
				position: "relative",
				top: 0,
				left: 0,
				minHeight: "80vh",
				alignItems: "center",
				width: "100%",
			}}
		>
			<Paper
				style={{ margin: "0px auto", maxWidth: "20em", padding: "1em" }}
			>
				<Typography>
					No results for your search, click here to {" "}
					<Button onClick={()=>handleOnClear()}>clear search</Button>
				</Typography>
			</Paper>
		</div>
	);
};

export default ZeroResults;
