import { Box, Link, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import parse from "html-react-parser";
import React, { useContext } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useNavigate } from "react-router-dom";
import APIContext from "../../context/APIContext";
import ProductsContext from "../../context/ProductsContext";
import SearchContext from "../../context/SearchContext";
import Custom from "../../reusable/Custom";

const responsive = {
	desktop: {
		breakpoint: { max: 3000, min: 1024 },
		items: 1,
		slidesToSlide: 1, // optional, default to 1.
		partialVisibilityGutter: 0,
	},
	tablet: {
		breakpoint: { max: 1024, min: 464 },
		items: 1,
		slidesToSlide: 1, // optional, default to 1.
		partialVisibilityGutter: 0,
	},
	mobile: {
		breakpoint: { max: 464, min: 0 },
		items: 1,
		slidesToSlide: 1, // optional, default to 1.
		partialVisibilityGutter: 0,
	},
};

let useStyles = makeStyles((theme) => ({
	container: {
		marginTop: "3rem",
	},
	category: {
		display: "flex",
		minHeight: "300px",
		padding: "1rem",
		margin: "0 auto",
		maxWidth: "50rem",
		maxHeight: "fit-content",
	},
	image__div: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		width: "50%",
	},
	text__div: {
		display: "flex",
		flexDirection: "column",
		paddingTop: "2rem",
		width: "50%",
	},
}));
export default function CategoriesSection() {
	let { categories } = useContext(ProductsContext);
	let { setParam } = useContext(SearchContext);
	const navigate = useNavigate();
	let classes = useStyles();
	let { API_URL } = useContext(APIContext);

	let handleOnClick = (category) => {
		navigate("/shop");
		setParam(category);
	};
	return (
		categories.length > 0 && (
			<div className={classes.container}>
				<Custom.TextPriStyle
					component="h4"
					sx={{
						fontSize: "25px",
						textAlign: "center",
						fontWeight: "light-bold",
						padding: "1rem",
					}}
					variant="subtitle1"
					text="Available Categories"
				/>

				<Box sx={{ borderRadius: "0px" }} elevation={0}>
					<Carousel
						responsive={responsive}
						autoPlay={false}
						//infinite={true}
						//autoPlay={isMobile === true ? true : false}
						removeArrowOnDeviceType={["mobile"]}
						//autoPlaySpeed={5000}
						keyBoardControl={true}
						showDots={true}
						partialVisible={true}
					>
						{categories.map((category, index) => (
							<Box className={classes.category} key={index}>
								<div className={classes.image__div}>
									<img
										src={
											category.image.slice(0, 4) ===
											"http"
												? `${category.image}`
												: `${API_URL}${category.image.slice(
														1
												  )}`
										}
										alt={category.category}
										style={{
											width: "250px",
											height: "250px",
										}}
									/>
								</div>
								<div className={classes.text__div}>
									<Typography
										style={{
											fontWeight: "light-bold",
											fontSize: "20px",
											textTransform: "underline",
											color: "black",
											cursor: "pointer",
										}}
										component={Link}
										onClick={() =>
											handleOnClick(category.category)
										}
									>
										{category.category}
									</Typography>
									<br />

									{category.description !== null && (
										<Typography
											component="div"
											variant="body2"
										>
											{parse(category.description)}
										</Typography>
									)}
								</div>
							</Box>
						))}
					</Carousel>
				</Box>
			</div>
		)
	);
}
