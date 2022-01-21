import { DoneAllRounded } from "@mui/icons-material";
import { Badge, Paper, Typography } from "@mui/material";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import TimeStamp from "react-timestamp";
import AuthContext from "../../context/AuthContext";
import Custom from "../../reusable/Custom";

const Confirmation = ({ formData, locations }) => {
	const navigate = useNavigate();
	let { user } = useContext(AuthContext);
	let checkDeliveryDate = () => {
		let time = locations.filter(
			(item) => item.location === formData.location
		)[0].days;
		let start = new Date();
		let end = new Date();
		let tommorrow = new Date(end.setDate(start.getDate() + time));
		return tommorrow;
	};
	return (
		<div style={{ height: "60vh", maxWidth: "100%" }}>
			<Paper
				align="center"
				style={{ display: "flex", justifyContent: "space-around", backgroundColor:"transparent" }}
				elevation={0}
			>
				<Badge
					sx={{
						width: "fit-content",maxWidth: "95%",
						borderBottom: "2px solid #388e3c",
						borderRight: "2px solid #388e3c",
						borderRadius: "5px 20px 5px",
					}}
					badgeContent={
						<DoneAllRounded fontSize="large" color="success" />
					}
				>
					<Paper
						style={{
							padding: "20px",
							backgroundColor: "white",
							borderRadius: "5px 20px 5px",
						}}
						elevation={6}
					>
						<Typography variant="h6">
							Hello , {user.username}
						</Typography>

						<Typography>
							<br />
							Congratulations, your order was placed{" "}
							<u>successfully</u>.
							<br />
							Estimated delivery time is{" "}
							<TimeStamp relative date={checkDeliveryDate()} />.
						</Typography>
						<br />
						<Custom.ButtonPry
							onClick={() => navigate('/', {replace: true})}
							text="Back to Shop"
						/>
					</Paper>
				</Badge>
			</Paper>
		</div>
	);
};

export default Confirmation;
