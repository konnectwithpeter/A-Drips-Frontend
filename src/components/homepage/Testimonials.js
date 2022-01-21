import { Avatar, Box, Paper, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useContext } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import TimeStamp from "react-timestamp";
import APIContext from "../../context/APIContext";
import ProductsContext from "../../context/ProductsContext";

const responsive = {
	desktop: {
		breakpoint: { max: 3000, min: 1024 },
		items: 2,
		slidesToSlide: 3, // optional, default to 1.
		partialVisibilityGutter: 40,
	},
	tablet: {
		breakpoint: { max: 1024, min: 464 },
		items: 1,
		slidesToSlide: 2, // optional, default to 1.
		partialVisibilityGutter: 20,
	},
	mobile: {
		breakpoint: { max: 464, min: 0 },
		items: 1,
		slidesToSlide: 1, // optional, default to 1.
		partialVisibilityGutter: 50,
	},
};

let useStyles = makeStyles((theme) => ({
	body: {
		[theme.breakpoints.down("sm")]: {
			fontSize: 11,
		},
	},
	carousel: {
		backgroundColor: "",
		padding: 2,
	},
	label: {
		borderTopRightRadius: "25px",
		borderBottomRightRadius: "25px",
		padding: 5,
		backgroundColor: "rgb(96,97,115)",
		display: "flex",
		justifyContent: "center",
		width: "40%",
		marginBottom: "1em",
		marginTop: "1em",
	},
}));

const Testimonials = () => {
	let { API_URL } = useContext(APIContext);
	let classes = useStyles();
	let {reviews} = useContext(ProductsContext);
	
	return (
		<div>
			{reviews.length < 1 ? null : (
				<Box sx={{ marginTop: "4em" }}>
					<Typography
						component="h4"
						variant="h6"
						sx={{
							textAlign: "center",
							fontSize: "25px",
							fontWeight: "light-bold",
							color: "black",
						}}
					>
						Our recent reviews
					</Typography>
					<Carousel
						responsive={responsive}
						className={classes.carousel}
						autoPlay={false}
						infinite={false}
						//autoPlay={isMobile === true ? true : false}
						removeArrowOnDeviceType={[
							"mobile",
							"tablet",
							"desktop",
						]}
						autoPlaySpeed={20000}
						keyBoardControl={true}
						showDots={true}
						partialVisible={true}
					>
						{reviews.slice(0, 4).map((review) => (
							<Paper
								elevation={0}
								key={review.id}
								sx={{
									backgroundColor: "",
									padding: 2,
									margin: 2,
								}}
								align="center"
							>
								<Avatar
									sx={{
										height: "5em",
										width: "5em",

										backgroundColor: "#D9D9D9",
									}}
								>
									<img
										style={{
											height: "5em",
											width: "5em",
											objectFit: "cover",
										}}
										src={
											review.photo.slice(0, 4) === "http"
												? `${review.photo}`
												: `${API_URL}${review.photo.slice(
														1
												  )}`
										}
										alt={review.name}
									/>
								</Avatar>
								<Typography component="h5" variant="h6">
									{review.name}
								</Typography>
								<Typography>{review.whois}</Typography>

								<div>
									<Typography
										className={classes.body}
										sx={{ textAlign: "center" }}
									>
										{review.review}
									</Typography>
								</div>
								<div
									style={{
										display: "flex",
										justifyContent: "end",
									}}
								>
									<Typography>
										{" "}
										~
										<TimeStamp
											relative
											date={review.timestamp}
										/>
									</Typography>
								</div>
							</Paper>
						))}
					</Carousel>
				</Box>
			)}
		</div>
	);
};

export default Testimonials;
