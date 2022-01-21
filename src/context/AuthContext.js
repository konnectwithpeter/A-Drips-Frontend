import axios from "axios";
import jwt_decode from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Custom from "../reusable/Custom";
import APIContext from "./APIContext";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
	let { API_URL } = useContext(APIContext);
	let location = useLocation();
	let [loading, setLoading] = useState(true);
	let [loginError, setLoginError] = useState(false);
	let [loggedIn, setLoggedIn] = useState(false);
	let [processingLogin, setProcessingLogin] = useState(false);

	//Fetch authTokens from local Storage if available else set them to empty string
	let [authTokens, setAuthTokens] = useState(() =>
		localStorage.getItem("authTokens")
			? JSON.parse(localStorage.getItem("authTokens"))
			: ""
	);

	//decode authTokens from localStorage if available else set default usernamt to guest
	let [user, setUser] = useState(() =>
		localStorage.getItem("authTokens")
			? jwt_decode(localStorage.getItem("authTokens"))
			: { username: "guest" }
	);

	const navigate = useNavigate();

	let loginUser = async (values) => {
		//perform a post request
		try {
			let response = await axios.post(`${API_URL}api/token/`, {
				email: values.email,
				password: values.password,
			});
			let data = await response.data;
			//if successfully fetched token ...
			if (response.status === 200) {
				//initiate the login process
				setProcessingLogin(true);
				setAuthTokens(data);
				setUser(jwt_decode(data.access));
				localStorage.setItem("authTokens", JSON.stringify(data));
				setLoggedIn(true);
				//redirect user to home page
			}
		} catch (err) {
			//terminate the login process
			setLoginError(true);
			setProcessingLogin(false);
		}
	};

	//clear auth localstorage
	let logoutUser = () => {
		setAuthTokens("");
		setUser({ username: "guest" });
		localStorage.removeItem("authTokens");
		setLoggedIn(false);
	};

	let updateToken = async () => {
		if (authTokens.refresh !== undefined) {
			let response = await fetch(`${API_URL}api/token/refresh/`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					refresh: authTokens?.refresh,
				}),
			});

			let data = await response.json();

			if (response.status === 200) {
				setAuthTokens(data);
				setUser(jwt_decode(data.access));
				localStorage.setItem("authTokens", JSON.stringify(data));
			} else {
				logoutUser();
			}
		}
		if (loading) {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (loading) {
			updateToken();
		}

		let fourMinutes = 1000 * 60 * 4;

		let interval = setInterval(() => {
			if (authTokens) {
				updateToken();
			}
		}, fourMinutes);

		return () => clearInterval(interval);
	}, [authTokens, loading]);

	let contextData = {
		authTokens: authTokens,
		user: user,
		loginError: loginError,
		loggedIn: loggedIn,
		processingLogin: processingLogin,

		loginUser: loginUser,
		setLoginError: setLoginError,
		logoutUser: logoutUser,
	};
	return (
		<AuthContext.Provider value={contextData}>
			{loading ? <Custom.PageLoadingBuffer /> : children}
		</AuthContext.Provider>
	);
};
