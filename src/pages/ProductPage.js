import {
	Button, Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle, Slide
} from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../components/homepage/Footer";
import ProductItem from "../components/products/ProductItem";
import ProductReviews from "../components/products/ProductReviews";
import ProductSkeleton from "../components/products/ProductSkeleton";
import RelatedProducts from "../components/products/RelatedProducts";
import APIContext from "../context/APIContext";
import ProductsContext from "../context/ProductsContext";

const ProductPage = () => {
	const params = useParams()
	let { API_URL } = useContext(APIContext);
	let [product, setProduct] = useState([]);
	let [imageLoading, setImageLoading] = useState(true);
	let [reviews, setReviews] = useState([]);
	let [relatedProducts, setRelatedProducts] = useState([]);
	let { getProducts, products } = useContext(ProductsContext);
	const [open, setOpen] = useState(false);
	let navigate = useNavigate()

	const handleClickOpen = () => {
		setOpen(true);
	};

	// const handleClose = () => {
	// 	setOpen(false);
	// };

	let getProduct = async () => {
		try {
			let response = await axios.get(
				`${API_URL}api/shop/product/${params.id}`
			);
			setProduct(response.data);
			await getProducts();
			let related = await products.filter(
				(product) => product.subcategory === response.data.subcategory
			);
			setRelatedProducts(related);
			getReviews();
			setImageLoading(false);
		} catch (err) {
			handleClickOpen();
		}
	};

	let getReviews = async () => {
		let ratings = await axios.get(`${API_URL}api/shop/reviews/`);
		let allRatings = ratings.data;
		//;
		setReviews(
			allRatings.filter((review) => review.product === params.id)
		);
	};

	useEffect(() => {
		getProduct();
		window.scroll(0, 0);
	}, [imageLoading, params.id]);

	let props = {
		product,
		imageLoading,
		reviews,
		getReviews,
		setImageLoading,
		relatedProducts,
		getProduct,
	};

	const Transition = React.forwardRef(function Transition(props, ref) {
		return <Slide direction="up" ref={ref} {...props} />;
	});

	return (
		<>
			<div>
				{imageLoading === true ? (
					<ProductSkeleton />
				) : (
					<>
						<div>
							<ProductItem {...props} />
						</div>
						<div style={{ maxWidth: "100%", marginTop: "2em" }}>
							<RelatedProducts {...props} />
						</div>
						<div style={{ marginTop: "2em" }}>
							<ProductReviews {...props} />
						</div>
					</>
				)}
			</div>

			<Dialog
				open={open}
				TransitionComponent={Transition}
				keepMounted
				aria-describedby="alert-dialog-slide-description"
			>
				<DialogTitle>{"Product Unavailable"}</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-slide-description">
						The product you are looking for is not available in our
						store. Check out some of our amazing products in our
						store.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => navigate('/', {replace: true})}>Home</Button>
					<Button onClick={() => navigate('/shop', {replace: true})}>
						Store
					</Button>
				</DialogActions>
			</Dialog>

			<Footer />
		</>
	);
};

export default ProductPage;
