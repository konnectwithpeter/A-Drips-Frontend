import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import APIContext from "./APIContext";

const ProductsContext = createContext();

export default ProductsContext;

export const ProductsProvider = ({ children }) => {
	let { API_URL } = useContext(APIContext);
	let [products, setProducts] = useState([]);
	let [categories, setCategories] = useState([]);
	let [rating, setRating] = useState([]);
	let [loading, setLoading] = useState(true);
	let [reviews, setReviews] = useState([]);
	let [deals, setDeals] = useState([]);
	let [hero, setHero] = useState([]);

	let getProducts = async () => {
		let response = await axios.get(`${API_URL}api/shop/products/?all`);
		let allProducts = await response.data;
		setProducts(allProducts);
		setLoading(false);
	};
	let getCategories = async () => {
		let response = await axios.get(`${API_URL}api/shop/categories/`);
		setCategories(response.data);
	};

	let getReviews = async () => {
		const response = await axios.get(`${API_URL}api/service-reviews/`);
		setReviews(response.data);
	};

	let getHero = async () => {
		try {
			let res = await axios.get(`${API_URL}api/shop/landing_text/`);
			setHero([res.data]);
		} catch (e) {
			setHero([]);
		}
	};

	let getBanners = async () => {
		try {
			let res = await axios.get(`${API_URL}api/shop/deals/`);
			setDeals([res.data]);
		} catch (e) {
			setDeals([]);
		}
	};

	//console.log(`${API_URL}${banner.image.slice(1)}`)

	useEffect(() => {
		getHero();
		getBanners();
	}, []);

	useEffect(() => {
		getCategories();
		getProducts();
	}, []);

	useEffect(() => {
		getReviews();
	}, []);

	let getRating = async () => {
		let response = await axios.get(`${API_URL}api/shop/reviews/`);
		setRating(response.data);
	};

	useEffect(() => {
		getRating();
	}, []);

	let contextData = {
		hero: hero,
		products: products,
		rating: rating,
		loading: loading,
		categories: categories,
		reviews: reviews,
		deals: deals,

		getProducts: getProducts,
	};

	return (
		<ProductsContext.Provider value={contextData}>
			{children}
		</ProductsContext.Provider>
	);
};
