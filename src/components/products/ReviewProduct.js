import { ThumbsUpDown, TouchAppRounded } from "@mui/icons-material";
import { Box, Button, Rating, TextField } from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect } from "react";
import APIContext from "../../context/APIContext";
import AuthContext from "../../context/AuthContext";

const ReviewProduct = ({ product, getReviews }) => {
	let { API_URL } = useContext(APIContext);
	let { user } = useContext(AuthContext);
	const [values, setValues] = React.useState(
		user.username === "guest"
			? {
					name: "",
					user: null,
					rating: 3,
					comment: "",
					product: product.slug,
			  }
			: {
					name: null,
					user: user.username,
					rating: 3,
					comment: "",
					product: product.slug,
			  }
	);
	let [reviewed, setReviewed] = React.useState(false);

	const handleChange = (prop) => (event) => {
		setValues({ ...values, [prop]: event.target.value });
	};

	const handleRating = async () => {
		await axios.post(`${API_URL}api/shop/reviews/`, {
			name: values.name,
			rating: values.rating,
			comment: values.comment,
			product: product.slug,
			user: values.user,
		});
		setReviewed(true);
		getReviews();
	};

	let onSubmit = async (e) => {
		e.preventDefault();
		handleRating();
	};
	useEffect(() => {
		getReviews();
	}, []);
	return (
		<Box style={{ padding: "2em", maxWidth: "56em" }}>
			<form onSubmit={onSubmit} >
				<div
					style={{
						width: "100%",
						marginBottom: "0.5em",
						justifyContent: "space-between",
					}}
				>
				
					<Rating
						name="simple-controlled"
						value={Number(values.rating)}
						onChange={handleChange("rating")}
						size="large"
						required
						disabled={reviewed}
					/>	<TouchAppRounded
						color={reviewed === false ? "primary" : "disabled"}
						size="large"
					/>
				</div>
				{user.username === "guest" ? (
					<div style={{ width: "100%", marginBottom: "0.5em" }}>
						<TextField
							label="Name"
							placeholder="name"
							onChange={handleChange("name")}
							rows={3}
							required
						/>
					</div>
				) : (
					""
				)}
				<div style={{ width: "100%", marginBottom: "0.5em" }}>
					<TextField
						sx={{ width: "100%", maxWidth: "25em" }}
						label="Type your rate review here"
						onChange={handleChange("comment")}
						multiline
						rows={3}
						disabled={reviewed}
						required
					/>
				</div>
				<Button
					type="submit"
					startIcon={<ThumbsUpDown />}
					variant="contained"
					disabled={reviewed}
				>
					Rate
				</Button>
			</form>
		</Box>
	);
};

export default ReviewProduct;
