import { Typography } from "@mui/material";
import React from "react";

const TextPriStyle = (props) => {
	let { variant, text, color, component, ...others } = props;
	return (
		<Typography
			component={component}
			variant={variant || "subtitle1"}
			color={color || "black"}
			style={{ color: "black", textTransform: "none" }}
			{...others}
		>
			{text}
		</Typography>
	);
};

export default TextPriStyle;
