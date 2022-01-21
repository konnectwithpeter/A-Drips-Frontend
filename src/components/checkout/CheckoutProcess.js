import React from "react";
import { useForm } from "react-hooks-helper";
import BillingForm from "./BillingForm";
import Confirmation from "./Confirmation";
import OrderSummary from "./OrderSummary";
import ShippingAddressForm from "./ShippingAddressForm";

const defaultData = {
	telephone: "",
	location: "",
	area: "",
	billingInfo: "",
};

const CheckoutProcess = ({ step, navigation, locations }) => {
	const [formData, setForm] = useForm(defaultData);
	let stepsProps = { formData, setForm, navigation, locations };

	switch (step.id) {
		case "ShippingAddressForm":
			return <ShippingAddressForm {...stepsProps} />;
		case "BillingForm":
			return <BillingForm {...stepsProps} />;
		case "OrderSummary":
			return <OrderSummary {...stepsProps} />;
		case "Confirmation":
			return <Confirmation {...stepsProps} />;
	}
	return <></>;
};

export default CheckoutProcess;
