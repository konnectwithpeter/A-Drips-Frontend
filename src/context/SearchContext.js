import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Custom from "../reusable/Custom";
import ProductsContext from "./ProductsContext";

const SearchContext = createContext();

export default SearchContext;

export const SearchProvider = ({ children }) => {
	let [items, setItems] = useState();
	let [results, setResults] = useState("");
	let [string, setString] = useState("");
	let [loading, setLoading] = useState(true);
	let [allItems, setAllItems] = useState([]);
	let [param, setParam] = useState();
	const navigate = useNavigate();

	let { products } = useContext(ProductsContext);

	let getItems = () => {
		setItems(products);
		setAllItems(products);
		setLoading(false);
	};

	let location = useLocation();

	useEffect(() => {
		getItems();
	}, [products]);

	const [searchString, setSearchString] = useState("");

	const handleSearch = (prop) => (event) => {
		const newSearchString = event.target.value;
		setSearchString(newSearchString);
		if (newSearchString.length > 1 && location.pathname === "/") {
			navigate("/store");
		}
		window.scroll(0, 0);
		setResults(
			items
				.filter(
					(r) =>
						r.name
							.toLowerCase()
							.match(newSearchString.toLocaleLowerCase()) ||
						r.category
							.toLowerCase()
							.match(newSearchString.toLocaleLowerCase()) ||
						r.subcategory
							.toLowerCase()
							.match(newSearchString.toLocaleLowerCase()) ||
						r.short_description
							.toLowerCase()
							.match(newSearchString.toLocaleLowerCase()) ||
						r.summary
							.toLowerCase()
							.match(newSearchString.toLocaleLowerCase())
				)
				.slice(0, 48)
		);
	};

	const handleCancelSearch = () => {
		setSearchString("");
	};

	let contextData = {
		items: items,
		results: results,
		string: string,
		allItems: allItems,
		param: param,

		searchString: searchString,
		handleSearch: handleSearch,
		handleCancelSearch: handleCancelSearch,

		setParam: setParam,
		setString: setString,
		setResults: setResults,
		setItems: setItems,
		getItems: getItems,
	};

	return (
		<SearchContext.Provider value={contextData}>
			{loading ? <Custom.PageLoadingBuffer /> : children}
		</SearchContext.Provider>
	);
};
