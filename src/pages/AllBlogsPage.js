import { Box, Pagination } from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import AllBlogs from "../components/blogs/AllBlogs";
import Footer from "../components/homepage/Footer";
import APIContext from "../context/APIContext";

const AllBlogsPage = () => {
	let { API_URL } = useContext(APIContext);
	let [loading, setLoading] = useState(true);
	let [allPosts, setAllPosts] = useState([]);
	let [page, setPage] = useState(1);
	let [pageCount, setPageCount] = useState(1);

	//fetch all the posts in setPage
	let getPosts = async () => {
		try {
			let response = await axios.get(`${API_URL}api/posts/?page=${page}`);
			setAllPosts(response.data.results);
			setPageCount(response.data.total_pages);
		} catch (err) {}
		setLoading(false);
	};

	//change the page content and scroll to the top
	let handleChangePage = (event, value) => {
		setPage(value);
		window.scroll(0, 0);
	};

	useEffect(() => {
		getPosts();
	}, [page]);

	useEffect(() => {
		document.title = `News/Blogs - Latest News/Blogs for A+ Drips Customers `;
	}, []);

	return (
		<>
			<div
				style={{
					backgroundColor: "",
					paddingTop: "2em",
					paddingBottom: "2em",
					minHeight: "60vh",
				}}
			>
				{loading === true ? null : <AllBlogs allPosts={allPosts} />}
				<Box style={{ width: "100%", marginTop: "20px" }}>
					<div>
						<Pagination
							variant="outlined"
							shape="rounded"
							size="large"
							onChange={handleChangePage}
							style={{
								display: "flex",
								justifyContent: "space-around",
							}}
							count={pageCount}
						/>
					</div>
				</Box>
			</div>
			<Footer />
		</>
	);
};

export default AllBlogsPage;
