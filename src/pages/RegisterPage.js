import { useEffect } from "react";
import CreateAccount from "../components/auth/CreateAccount";
const RegisterPage = () => {
	useEffect(() => {
		// This will run when the page first loads and whenever the title changes
		document.title = `A+ Drips - Create Account`;
	}, []);

	return (
		<div style={{ minHeight: "90vh" }}>
			<CreateAccount />
		</div>
	);
};

export default RegisterPage;
