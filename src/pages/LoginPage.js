import { useEffect } from "react";
import LoginForm from "../components/auth/LoginForm";

const LoginPage = () => {
	useEffect(() => {
		// This will run when the page first loads and whenever the title changes
		document.title = `A+ Drips - Log in to my account `;
	}, []);

	return (
		<>
			<LoginForm />
		</>
	);
};

export default LoginPage;
