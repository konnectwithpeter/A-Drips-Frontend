import { Box, Grid } from "@mui/material";
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
		items: 2,
		slidesToSlide: 2, // optional, default to 1.
		partialVisibilityGutter: 20,
	},
	mobile: {
		breakpoint: { max: 464, min: 0 },
		items: 2,
		slidesToSlide: 1, // optional, default to 1.
		partialVisibilityGutter: 15,
	},
};

const useStyles = makeStyles((theme) => ({
	container: {
		marginTop:"3rem"
	},
	carousel: {
		border:"1px solid black"
	}


}))


const FeaturedProducts = () => {
	let classes = useStyles();
	let { products, loading } = useContext(ProductsContext);
	let featuredProducts = products
		.filter((item) => item.isFeatured === true && item.quantity > 0)
		.slice(0, 12);
	return (
		featuredProducts.length > 0 && <div className={classes.container}>
								<Custom.TextPriStyle
				component="h4"
				sx={{
					fontSize: "25px",
					textAlign: "center",
					fontWeight: "light-bold",
					padding: "1rem",
				}}
				variant="subtitle1"
				text="Featured Products"
			/>
					
			<Box sx={{borderRadius: "0px"}} elevation={0}>
				{loading ? (
					<Grid container spacing={3} sx={{ marginTop: "1em", flexDirection: "row" }}>
						<Custom.ProductCardSkeleton loops={4} />
					</Grid>
				) : (
					<>
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
							{featuredProducts.map((product, index) => (
								<Custom.ProductContainer
									key={index}
									style={{ margin: "1em", marginBottom: "3em" }}
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
		</div>
	);
};

export default FeaturedProducts;