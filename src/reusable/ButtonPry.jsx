import { Fab } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";

let useStyles = makeStyles({
	btn: {
		color: "white",
		textTransform: "none",
		backgroundColor: "black",
		"&:hover": {
			backgroundColor: "#EDEDED",
			color: "black",
		},
		"&:focus": {
			outline: "none",
		},
	},
});

const ButtonPry = (props) => {
	let classes = useStyles();
	const { text, variant, fronticon, backicon, onClick, size, ...others } =
		props;
	return (
		<Fab
			aria-label="add"
			className={classes.btn}
			text={text}
			variant={variant || "extended"}
			size={size || "medium"}
			onClick={onClick}
			{...others}
			fronticon={fronticon}
			backicon={backicon}
		>
			{fronticon}
			<b>{text}</b>
			{backicon}
		</Fab>
	);
};

export default ButtonPry;
