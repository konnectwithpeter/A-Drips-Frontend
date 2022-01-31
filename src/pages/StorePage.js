import { Box, Hidden } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Footer from "../components/homepage/Footer";
import AllProducts from "../components/store/AllProducts";
import SearchedResults from "../components/store/SearchedResults";
import SearchForm from "../components/store/SearchForm";
import ZeroResults from "../components/store/ZeroResults";
import SearchContext from "../context/SearchContext";

const Root = styled("div")(({ theme }) => ({
	padding: theme.spacing(1),
	minHeight: "85vh",
}));

const StorePage = () => {
	let location = useLocation();
	let { results, searchString } = useContext(SearchContext);
	useEffect(() => {
		window.scroll(0, 0);
		document.title = `Store - Browse all products available in store`;
	}, []);
	return (
		<>
			<Root align="center">
				<Hidden mdUp>
					<Box item style={{ minWidth: "90%" }}>
						<div
							style={{
								display: "flex",
							}}
						>
							<SearchForm />
						</div>
					</Box>
				</Hidden>
				{searchString.length < 2 && location.pathname === "/store" ? (
					<AllProducts />
				) : searchString.length > 0 &&
				  results.length < 1 &&
				  location.pathname === "/store" ? (
					<ZeroResults />
				) : (
					<SearchedResults />
				)}
			</Root>
			<Footer />
		</>
	);
};

export default StorePage;
