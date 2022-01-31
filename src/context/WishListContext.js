import React from 'react';
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import APIContext from "./APIContext";
import AuthContext from "./AuthContext";

const WishesContext = createContext();

export default WishesContext;

export const WishesProvider = ({ children }) => {
	let { API_URL } = useContext(APIContext);
	const [wishes, setWishes] = useState([]);
	let [loading, setLoading] = useState(true);

	let { authTokens, user, loggedIn } = useContext(AuthContext);

	//fetch wishlist items from the database when the user is logged in
	let getWishes = async () => {
		if (user.username !== "guest") {
			try {
				let response = await axios.get(`${API_URL}api/wishlist/`, {
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + String(authTokens.access),
					},
				});
				setWishes(response.data);
			} catch (err) {
				console.log(err);
			}
		}
		setLoading(false);
	};

	useEffect(() => {
		getWishes();
	}, [loggedIn]);

	let [severity, setSeverity] = useState("info");
	let [message, setMessage] = useState("");

	//Add to wish when fav icon is clicked
	let handleAddToWish = async (slug) => {
		await getWishes();
		if (wishes.some((wish) => wish.product === slug)) {
			setMessage("Already in your wishlist");
			setSeverity("info");
		} else {
			try {
				await fetch(`${API_URL}api/wishlist/`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + String(authTokens.access),
					},
					body: JSON.stringify({
						user: user.username,
						product: slug,
					}),
				});
				setMessage("Wishlist updated successfully.");
				setSeverity("success");
				getWishes();
			} catch (err) {
				console.log(err.status);
			}
		}
	};

	let contextData = {
		wishes: wishes,
		severity: severity,
		message: message,

		getWishes: getWishes,
		setMessage: setMessage,
		handleAddToWish: handleAddToWish,
	};

	return (
		<WishesContext.Provider value={contextData}>
			{loading === true ? null : children}
		</WishesContext.Provider>
	);
};
