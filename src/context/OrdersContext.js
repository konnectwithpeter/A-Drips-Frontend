import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import APIContext from "./APIContext";
import AuthContext from "./AuthContext";

const OrdersContext = createContext();

export default OrdersContext;

export const OrdersProvider = ({ children }) => {
	let { API_URL } = useContext(APIContext);
	let { authTokens, logoutUser, user } = useContext(AuthContext);
	let [orders, setOrders] = useState([]);

	let [orderItems, setOrderItems] = useState([]);

	let getOrders = async () => {
		if (user.username !== "guest") {
			try {
				let response = await axios.get(
					`${API_URL}api/orders/`,
					{
						headers: {
							"Content-Type": "application/json",
							Authorization:
								"Bearer " + String(authTokens.access),
						},
					}
				);
				let data = await response.data;
				setOrders(data);
			} catch (err) {
				console.log(err);
				if (err.response.status === 401) {
					logoutUser();
				} else {
					setOrders("");
				}
			}
		}
	};
	let getOrderItems = async () => {
		if (user.username !== "guest") {
			try {
				let response = await axios.get(`${API_URL}api/order-items/`, {
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + String(authTokens.access),
					},
				});
				setOrderItems(response.data);
			} catch (err) {
				setOrderItems("");
			}
		}
	};

	useEffect(() => {
		getOrders();
		getOrderItems();
	}, []);

	//console.log("fetching order items...",loading);

	let contextData = {
		orders: orders,
		orderItems: orderItems,

		getOrders: getOrders,
		getOrderItems: getOrderItems,
	};

	return (
		<OrdersContext.Provider value={contextData}>
			{children}
		</OrdersContext.Provider>
	);
};
