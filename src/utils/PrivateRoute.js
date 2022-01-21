import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const PrivateRoute = ({ children, ...rest }) => {
	let { user } = useContext(AuthContext);
	return user.username === "guest" ? (
		<Navigate to="/login" />
	) : (
		<Outlet {...rest} />
	);
};

export default PrivateRoute;
