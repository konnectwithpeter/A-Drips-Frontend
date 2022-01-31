import { Box, Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect } from "react";
import { useCart } from "react-use-cart";
import Footer from "../homepage/Footer";
import CheckoutCart from "./CheckoutCart";
import EmptyCart from "./EmptyCart";

const useStyles = makeStyles((theme) => ({
	container: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		maxWidth: "100vw",
		margin: "0 auto",
		},
	cart__container: {
		margin: "auto",
		[theme.breakpoints.up("md")]: {
			maxHeight: "fit-content",
			padding: "2px",
			paddingTop: "2em",
			maxWidth: "40rem",
			width: "40rem"
		},
		[theme.breakpoints.down("md")]: {
			maxWidth: "95%",
		},
	},
}));

const ShoppingCart = () => {
	const classes = useStyles();
	const { isEmpty } = useCart();
	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	useEffect(() => {
		scrollToTop();
		document.title = `A+ Drips - Shopping Cart`;
	}, []);

	return (
		<>
			<div className={classes.container}>
				{isEmpty === true ? (
					<EmptyCart />
				) : (
					<Box elevation={1} className={classes.cart__container}>
						<CheckoutCart />
					</Box>
				)}
			</div>
			<Footer />
		</>
	);
};

export default ShoppingCart;
