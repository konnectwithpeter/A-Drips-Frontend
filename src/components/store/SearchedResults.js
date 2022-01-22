import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useContext } from "react";
import SearchContext from "../../context/SearchContext";
import Custom from "../../reusable/Custom";

let useStyles = makeStyles((theme) => ({
	container: {
		[theme.breakpoints.up("lg")]: {
			flexDirection: "row",
			maxWidth: "80rem",
			padding: "0 auto",
			margin: "0 auto",
			marginBottom: "3rem",
		},
		maxWidth: "100%",
	},
}));

const SearchedResults = () => {
	let { results } = useContext(SearchContext);
	let classes = useStyles();

	return (
		<div style={{ marginTop: "20px", zIndex: 1, minHeight: "90vh" }}>
			<Grid container spacing={3} className={classes.container}>
				{results.map((product, index) => (
					<Grid
						item
						xs={6}
						sm={4}
						md={4}
						lg={3}
						align="left"
						key={index}
					>
						<Custom.ProductContainer
							key={index}
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
					</Grid>
				))}
			</Grid>
		</div>
	);
};

export default SearchedResults;
