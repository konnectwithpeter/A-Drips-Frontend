import { Box, Hidden, Typography } from "@mui/material";
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
	let { results, string } = useContext(SearchContext);
	useEffect(() => {
		window.scroll(0, 0);
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
				{string.length < 2 && location.pathname === "/shop" ? (
					<AllProducts />
				) : string.length > 5 &&
				  results.length < 1 &&
				  location.pathname === "/shop" ? (
					<ZeroResults />
				) : string.length < 5 &&
				  results.length < 1 &&
				  location.pathname === "/shop" ? (
					<Typography component="div" style={{ marginTop: "2em", color:"black" }}>
						Improve your search results by typing more characters
					</Typography>
				) : (
					<SearchedResults />
				)}
			</Root>
			<Footer />
		</>
	);
};

export default StorePage;
