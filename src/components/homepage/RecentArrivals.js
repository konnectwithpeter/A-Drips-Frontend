import { ArrowBackRounded, ArrowForwardRounded } from "@mui/icons-material";
import { Box, Grid, IconButton, Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useContext } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ProductsContext from "../../context/ProductsContext";
import Custom from "../../reusable/Custom";

const responsive = {
	desktop: {
		breakpoint: { max: 3000, min: 1024 },
		items: 3.5,
		slidesToSlide: 3, // optional, default to 1.
		partialVisibilityGutter: 40,
	},
	tablet: {
		breakpoint: { max: 1024, min: 464 },
		items: 2.5,
		slidesToSlide: 1, // optional, default to 1.
		partialVisibilityGutter: 20,
	},
	mobile: {
		breakpoint: { max: 464, min: 0 },
		items: 1.5,
		slidesToSlide: 1, // optional, default to 1.
		partialVisibilityGutter: 15,
	},
};

const useStyles = makeStyles((theme) => ({
	container: {
		position: "relative",
		[theme.breakpoints.up("sm")]: {
			padding: "0 2rem",
			marginTop: "3rem",
		},
		//:"1px solid black",
		backgroundColor: "transparent",
	},
	buttons: {
		position: "absolute",
		top: 2,
		[theme.breakpoints.down("md")]: {
			display: "none",
		},
		right: "5%",
		display: "flex",
		gap: ".5rem",
	},
}));

const RecentArrivals = () => {
	let classes = useStyles();
	let { products, loading } = useContext(ProductsContext);
	let newArrivals = products
		.filter((item) => item.isFeatured === false && item.quantity > 0)
		.slice(0, 12);

	const ButtonGroup = ({ next, previous, goToSlide, ...rest }) => {
		const {
			carouselState: { currentSlide },
		} = rest;
		return (
			<div className={classes.buttons} style={{}}>
				<IconButton
				aria-label="previous"
					size="large"
					disabled={currentSlide === 0 ? true : false}
					onClick={() => previous()}
				>
					<ArrowBackRounded font="inherit" />
				</IconButton>
				<IconButton size="large" onClick={() => next()} aria-label="next">
					<ArrowForwardRounded font="inherit" />
				</IconButton>
			</div>
		);
	};

	return (
		newArrivals.length > 0 && (
			<Paper elevation={0} className={classes.container}>
				<Custom.TextPriStyle
					component="h4"
					sx={{
						fontSize: "25px",
						fontWeight: "light-bold",
						paddingLeft: "1rem",
					}}
					variant="subtitle1"
					text="Recent Arrivals"
				/>

				<Box sx={{ borderRadius: "0px" }} elevation={0}>
					{loading ? (
						<Grid
							container
							spacing={3}
							sx={{ marginTop: "1em", flexDirection: "row" }}
						>
							<Custom.ProductCardSkeleton loops={4} />
						</Grid>
					) : (
						<>
							<Carousel
								arrows={false}
								responsive={responsive}
								autoPlay={false}
								//infinite={true}
								//autoPlay={isMobile === true ? true : false}
								removeArrowOnDeviceType={["mobile"]}
								//autoPlaySpeed={5000}
								keyBoardControl={true}
								showDots={false}
								//partialVisible={true}
								renderButtonGroupOutside={true}
								customButtonGroup={<ButtonGroup />}
							>
								{newArrivals.map((product, index) => (
									<Custom.ProductContainer
										key={index}
										style={{
											margin: "1em",
											marginBottom: "3em",
										}}
										id={product.slug}
										discounted={product.discounted}
										discount={product.discount}
										item={product}
										image={product.image1}
										image1={product.image2}
										name={product.name}
										description={product.short_description}
										linkto={`/product/${product.slug}`}
										price={product.price}
									/>
								))}
							</Carousel>
						</>
					)}
				</Box>
			</Paper>
		)
	);
};

export default RecentArrivals;
