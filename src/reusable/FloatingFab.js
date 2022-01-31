import { Fab } from "@mui/material";
import { makeStyles } from "@mui/styles";

let useStyles = makeStyles({
	btn: {
		textTransform: "none!important",
		"&:hover": {
			backgroundColor: "transparent",
		},
		"&:focus": {
			outline: "none",
		},
	},
});

const FloatingFab = (props) => {
	let classes = useStyles();
	const { variant, onClick, size, ...others } = props;
	return (
		<Fab
			className={classes.btn}
			variant={variant}
			size={size || "small"}
			onClick={onClick}
			{...others}
		></Fab>
	);
};

export default FloatingFab;
