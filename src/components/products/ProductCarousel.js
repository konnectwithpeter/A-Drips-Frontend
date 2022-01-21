import { Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useContext } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import APIContext from "../../context/APIContext";
import AddtoWish from "../../reusable/AddtoWish";

let useStyles = makeStyles({
	carousel: {
		width: "100%",
		minHeight: "50vh",
	},
});

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

const ProductCarousel = ({ product, hght, wth }) => {
	let { API_URL } = useContext(APIContext);
	let classes = useStyles();
	let images = [
		product.image1 === null ? null : product.image1,
		product.image2 === null ? null : product.image2,
		product.image3 === null ? null : product.image3,
		product.image4 === null ? null : product.image4,
		product.image5 === null ? null : product.image5,
	];
	return (
		<div
			style={{
				width: "100%",
				height: "100%",
			}}
		>
			<Carousel
				className={classes.carousel}
				component={Paper}
				responsive={responsive}
				autoPlay={true}
				infinite={true}
				//autoPlay={isMobile === true ? true : false}
				removeArrowOnDeviceType={["mobile"]}
				autoPlaySpeed={5000}
				keyBoardControl={true}
				showDots={true}
				partialVisible={true}
			>
				{images
					.filter((image) => image !== null)
					.map((image, index) =>
						image === null ? null : (
							<React.Fragment key={index}>
								<AddtoWish slug={product.slug} />
								<img
									key={index}
									style={{
										height:hght || "auto",
										maxHeight: "60vh",
										width: wth||"60%",
										objectFit: "",
										display: "flex",
										margin: "0 auto",
									}}
									src={
										image.slice(0, 4) === "http"
											? `${image}`
											: `${API_URL}${image.slice(1)}`
									}
									alt={product.name}
									//loading="lazy"
								/>
							</React.Fragment>
						)
					)}
			</Carousel>
		</div>
	);
};

export default ProductCarousel;
