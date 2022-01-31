import { Chip, Divider, Paper } from "@mui/material";
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Custom from "../../reusable/Custom";

const RelatedProducts = ({ product, relatedProducts }) => {
	const responsive = {
		desktop: {
			breakpoint: { max: 3000, min: 1024 },
			items: 4,
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
			items: 1.5,
			slidesToSlide: 1, // optional, default to 1.
			partialVisibilityGutter: 5,
		},
	};
	// let handleToProduct = async (slug) => {
	// 	navigate(`/product/${slug}`);
	// 	setImageLoading(true);
	// 	getProduct();
	// };

	//let classes = useStyles();
	const item = product;
	return (
		<>
			{relatedProducts.length < 2 ||
			relatedProducts.length === undefined ? null : (
				<Divider>
					<Chip label="Related Products" />
				</Divider>
			)}
			<Paper
				elevation={0}
				style={{
					width: "100%",
					marginTop: "2em",
					p: 2,
					backgroundColor: "transparent",
				}}
			>
				<Carousel
					responsive={responsive}
					autoPlay={true}
					infinite={true}
					//autoPlay={isMobile === true ? true : false}
					removeArrowOnDeviceType={["mobile"]}
					autoPlaySpeed={10000}
					keyBoardControl={true}
					showDots={false}
					partialVisible={true}
				>
					{relatedProducts.map((product, index) =>
						product.id !== item.id ? (
							<Custom.ProductContainer
								key={index}
								style={{ margin: "1em" }}
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
						) : null
					)}
				</Carousel>
			</Paper>
		</>
	);
};

export default RelatedProducts;
