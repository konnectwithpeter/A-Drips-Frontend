import { Paper } from "@mui/material";
import React, { useEffect } from "react";
import { useCart } from "react-use-cart";
import Footer from "../homepage/Footer";
import CheckoutCart from "./CheckoutCart";
import EmptyCart from "./EmptyCart";

const ShoppingCart = () => {
	const { isEmpty } = useCart();
	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

    useEffect(()=>{
        scrollToTop()
    },[])

	return (
		<>
			<div style={{ padding: "2px", maxWidth: "95%", margin: "auto" }}>
				{isEmpty === true ? (
					<EmptyCart />
				) : (
					<div
						style={{
							paddingTop: "1em",
							width: "100%",
							paddingBottom: "2em",
						}}
					>
						<Paper
							elevation={5}
							style={{
								maxWidth: "44em",
								margin: "auto",
								maxHeight: "fit-content",
								padding: "2px",
								paddingTop: "2em",
							}}
						>
							<CheckoutCart />
						</Paper>
					</div>
				)}
			</div>
			<Footer />
		</>
	);
};

export default ShoppingCart;
