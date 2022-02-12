import { ArrowBackRounded, ArrowForwardRounded } from "@mui/icons-material";
import { Box, Fab, IconButton, Typography, useMediaQuery } from "@mui/material";
import { makeStyles, useTheme } from "@mui/styles";
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
		breakpoint: { max: 3000, min: 900 },
		items: 1,
		slidesToSlide: 1, // optional, default to 1.
		partialVisibilityGutter: 0,
	},
	tablet: {
		breakpoint: { max: 900, min: 600 },
		items: 1,
		slidesToSlide: 1, // optional, default to 1.
		partialVisibilityGutter: 0,
	},
	mobile: {
		breakpoint: { max: 600, min: 15 },
		items: 1,
		slidesToSlide: 1, // optional, default to 1.
		partialVisibilityGutter: 0,
	},
};

let useStyles = makeStyles((theme) => ({
	container: {
		marginTop: "2rem",
	},
	category: {
		display: "flex",
		margin: "0 auto",
		maxWidth: "50rem",
		height: "fit-content",
		border: "1px solid rgb(0,0,0, 0.05555)",
		padding: "0.5rem 0",
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
		justifyContent: "center",
		width: "50%",
		gap: ".7rem",
	},
	image: {
		[theme.breakpoints.down("md")]: {
			height: "auto",
			width: "180px",
			objectFit:"cover",
		},
		[theme.breakpoints.up("md")]: {
			height: "auto",
			width: "250px",
			objectFit:"cover",
		},
	},
	description:{
		[theme.breakpoints.down("md")]:{
			fontSize: "12px",
		}
	},
	carousel: {
		[theme.breakpoints.down("md")]: {
			position: "relative",
		},
	},
	buttons: {
		position: "absolute",
		top: 0,
		right: "5%",
		display: "flex",
		gap: ".5rem",
	},
}));
export default function CategoriesSection() {
	let { categories } = useContext(ProductsContext);
	let { setParam } = useContext(SearchContext);
	const navigate = useNavigate();
	let classes = useStyles();
	let { API_URL } = useContext(APIContext);

	let handleOnClick = (category) => {
		navigate("/store");
		setParam(category);
	};

	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down("md"));

	const ButtonGroup = ({ next, previous, goToSlide, ...rest }) => {
		const {
			carouselState: { currentSlide },
		} = rest;
		return (
			<div className={classes.buttons} style={{}}>
				<IconButton
					aria-label="previous"
					size="small"
					disabled={currentSlide === 0 ? true : false}
					onClick={() => previous()}
				>
					<ArrowBackRounded font="inherit" />
				</IconButton>
				<IconButton
					size="small"
					onClick={() => next()}
					aria-label="next"
				>
					<ArrowForwardRounded font="inherit" />
				</IconButton>
			</div>
		);
	};

	return (
		categories.length > 0 && (
			<div className={classes.container}>
				<Custom.TextPriStyle
					component="h3"
					sx={{
						fontSize: "25px",
						textAlign: "center",
						fontWeight: "light-bold",
						padding: "1rem",
					}}
					variant="subtitle1"
					text="Available Categories"
				/>

				<Box
					sx={{ borderRadius: "0px" }}
					elevation={0}
					className={classes.carousel}
				>
					<Carousel
					//style={{overflow: "hidden"}}
						responsive={responsive}
						autoPlay={false}
						infinite={true}
						autoPlay={true}
						removeArrowOnDeviceType={["mobile", "tablet"]}
						autoPlaySpeed={5000}
						keyBoardControl={true}
						showDots={false}
						partialVisible={false}
						customButtonGroup={matches && <ButtonGroup />}
					>
						{categories.map((category, index) => (
							<Box className={classes.category} key={index}  aria-hidden="false" >
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
										className={classes.image}
									/>
								</div>
								<div className={classes.text__div}>
									<Typography
										style={{
											fontWeight: "light-bold",
											fontSize: "20px",
											color: "black",
										}}
									>
										{category.category}
									</Typography>

									{category.description !== null && (
										<Typography
											component="div"
											variant="body2"
											className={classes.description}
										>
											{parse(category.description)}
										</Typography>
									)}

									<Fab
										variant="extended"
										color="primary"
										size="small"
										sx={{
											
											textTransform: "none",
											width: "fit-content",
										}}
										elevation={12}
										onClick={() =>
											handleOnClick(category.category)
										}
									>
										Browse Collection
									</Fab>
								</div>
							</Box>
						))}
					</Carousel>
				</Box>
			</div>
		)
	);
}
