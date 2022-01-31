import { AddShoppingCartRounded } from "@mui/icons-material";
import {
	Alert, IconButton,
	Snackbar,
	Tooltip
} from "@mui/material";
import React, { useState } from "react";
import { useCart } from "react-use-cart";

const AddtoCart = (props) => {
	let { addItem, items } = useCart();
	let { item } = props;
	let [severity, setSeverity] = useState("success");
	let [message, setMessage] = useState("Added to Cart");

	const [open, setOpen] = useState(false);

	const handleClick = () => {
		if (items.some((itemInCart) => itemInCart.id === item.id)) {
			setSeverity("info");
			setMessage("Already in cart");
		} else {
			addItem(item);
			setSeverity("success");
			setMessage(item.name + " added to cart");
		}
		let bool = true;
		setOpen(bool);
	};

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		setOpen(false);
	};

	return (
		<>
			<Tooltip title={`Add ${item.name} to Cart`}>
				<IconButton onClick={() => handleClick()}>
					<AddShoppingCartRounded fontSize="inherit" color="primary" />
				</IconButton>
			</Tooltip>

			<Snackbar
				open={open}
				autoHideDuration={2000}
				onClose={handleClose}
				style={{ textTransform: "none" }}
				variant="filled"
			>
				<Alert
					severity={severity}
					variant="filled"
					sx={
						severity === "success"
							? { width: "100%", fontWeight: "bold" }
							: { backgroundColor: "#42a5f5" }
					}
				>
					{message}
				</Alert>
			</Snackbar>
		</>
	);
};

export default AddtoCart;
