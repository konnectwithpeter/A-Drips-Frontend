import {
	Avatar,
	Box,
	Grid,
	Pagination,
	Paper,
	Tab,
	Tabs,
	Typography
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import APIContext from "../../context/APIContext";
import ProductsContext from "../../context/ProductsContext";
import SearchContext from "../../context/SearchContext";
import Custom from "../../reusable/Custom";
import ProductCardSkeleton from "../../reusable/ProductCardSkeleton";

let useStyles = makeStyles((theme) => ({
	container: {
		[theme.breakpoints.up("lg")]: {
			flexDirection: "row",
			maxWidth: "80rem",
			padding: "0 auto",
			margin: "0 auto",
		},
		maxWidth:"100%"
	},
}));

const AllProducts = () => {
	let { API_URL } = useContext(APIContext);
	let { categories } = useContext(ProductsContext);
	const [value, setValue] = useState(0);
	let { allItems, setItems, param, setParam } = useContext(SearchContext);

	let [loading, setLoading] = useState(true);
	let [pageProducts, setPageProducts] = useState();
	let [pageCount, setPageCount] = useState(1);
	let classes = useStyles();

	//fetch all product from the API
	let getAllProducts = async (pagenumber) => {
		setLoading(true);
		if (param === "all-categories" || param === undefined) {
			let response = await axios.get(
				`${API_URL}api/shop/products/?page=${
					pagenumber === undefined ? 1 : pagenumber
				}`
			);
			let allPagesSum = Number(await response.data.total_pages);
			setPageCount(allPagesSum);
			let pageItems = await response.data.results;
			setPageProducts(pageItems);

			setItems(allItems);
		} else {
			let response = await axios.get(
				`${API_URL}api/shop/products/?category=${param}&page=${
					pagenumber === undefined ? 1 : pagenumber
				}`
			);
			let allPagesSum = Number(await response.data.total_pages);
			setPageCount(allPagesSum);
			let pageItems = await response.data.results;
			setPageProducts(pageItems);
			let filteredItems = allItems.filter(
				(item) => item.category === param
			);
			setItems(filteredItems);
		}
		setLoading(false);
	};

	let handleChange = (event, value) => {
		getAllProducts(value);
		window.scroll(0, 0);
	};

	useEffect(() => {
		handleChangeCategory();
		getAllProducts(1);
	}, [param]);

	let handleCatClick = (categoryParam) => {
		if (param === categoryParam) {
			getAllProducts(1);
		} else {
			setLoading(true);
			setParam(categoryParam);
		}
	};

	const handleChangeCategory = (event, newValue) => {
		if (param === "all-categories") {
			setValue(0);
		} else {
			let id = categories.findIndex((cat) => cat.category === param);
			setValue(id + 1);
		}
	};

	return (
		<div style={{ paddingBottom: "3em" }}>
			<div style={{ marginBottom: "2em" }}>
				<Box sx={{ width: "100%" }}>
					<Tabs
						value={value}
						onChange={handleChangeCategory}
						variant="scrollable"
						scrollButtons
						allowScrollButtonsMobile
						selectionFollowsFocus
						sx={{ color: "black" }}
					>
						<Tab
							label="All"
							icon={
								<Avatar
									sx={{
										width: 80,
										height: 80,
										backgroundColor: "transparent",
									}}
								>
									<img
										style={{
											width: "50px",
											height: "50px",
											objectFit: "fill",
										}}
										src={`${API_URL}static/logo.svg`}
										alt="All Products"
									/>
									{/* <img
										style={{
											height: "1em",
											width: "1em",
										}}
										src={`${API_URL}products/Smart%20Watch/laptop_600.png`}
										alt="all"
									/> */}
								</Avatar>
							}
							iconPosition="top"
							onClick={() => handleCatClick("all-categories")}
						/>
						{categories.map((category, index) => (
							<Tab
								label={category.category}
								key={index}
								sx={{ marginLeft: "1em" }}
								icon={
									<Avatar
										sx={{
											width: 80,
											height: 80,
											backgroundColor: "transparent",
										}}
									>
										<img
											style={{
												width: "80px",
												height: "80px",
												objectFit: "fill",
											}}
											src={
												category.image.slice(0, 4) ===
												"http"
													? `${category.image}`
													: `${API_URL}${category.image.slice(
															1
													  )}`
											}
											alt={category.category}
										/>
									</Avatar>
								}
								iconPosition="top"
								onClick={() =>
									handleCatClick(category.category)
								}
							/>
						))}
					</Tabs>
				</Box>
			</div>
			<div>
				{loading === true ? (
					<Grid container spacing={3} sx={{ flexDirection: "row" }}>
						<ProductCardSkeleton loops={24} />
					</Grid>
				) : pageProducts.length > 0 ? (
					<Grid container spacing={3} className={classes.container}>
						{pageProducts.map((product, index) => (
							<Grid
								item
								xs={6}
								sm={4}
								md={4}
								lg={3}
								key={index}
							>
								<Custom.ProductContainer
								align="left"
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
				) : (
					<Paper sx={{ maxWidth: "30em" }}>
						<Typography variant="h6">
							No available products in this category yet.
							<br />
							Click another category to check out some other
							products available in store.
						</Typography>
					</Paper>
				)}
			</div>
			{pageCount < 2 ? null : (
				<Box style={{ width: "100%", marginTop: "5em" }}>
					<div>
						<Pagination
							variant="outlined"
							shape="rounded"
							onChange={handleChange}
							style={{
								display: "flex",
								justifyContent: "space-around",
							}}
							count={pageCount}
						/>
					</div>
				</Box>
			)}
		</div>
	);
};

export default AllProducts;
