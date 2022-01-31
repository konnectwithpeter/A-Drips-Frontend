import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useStep } from "react-hooks-helper";
import CheckoutProcess from "../components/checkout/CheckoutProcess";
import CheckoutStepper from "../components/checkout/CheckoutStepper";
import Footer from "../components/homepage/Footer";
import APIContext from "../context/APIContext";

const CheckoutPage = () => {
	let { API_URL } = useContext(APIContext);
	let [locations, setLocations] = useState([]);
	let [loading, setLoading] = useState(true);

	let getLocations = async () => {
		let response = await axios.get(
			`${API_URL}api/shop/shipping-locations/`
		);
		setLocations(response.data);

		setLoading(false);
	};

	useEffect(() => {
		getLocations();
		document.title = `A+ Drips - Checkout and place order`;
	}, []);

	const steps = [
		{ id: "ShippingAddressForm", i: 0 },
		{ id: "BillingForm", i: 1 },
		{ id: "OrderSummary", i: 2 },
		{ id: "Confirmation", i: 3 },
	];
	const { step, navigation } = useStep({
		steps,
		initialStep: 0,
	});

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

    useEffect(()=>{
        scrollToTop()
    },[step])

	const props = { step, navigation, locations };
	return (
		<>
			<div style={{minHeight:"62vh"}}>
				<div style={{ paddingBottom: "20px" }}>
					<CheckoutStepper {...props} />
				</div>
				{loading ? null : (
					<div style={{ paddingBottom: "20px", paddingTop: "20px", maxWidth:"97%" }}>
						<CheckoutProcess {...props} />
					</div>
				)}
			</div>
			<Footer />
		</>
	);
};

export default CheckoutPage;
