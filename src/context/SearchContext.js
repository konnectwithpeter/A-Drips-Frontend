import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Custom from "../reusable/Custom";
import ProductsContext from "./ProductsContext";

const SearchContext = createContext();

export default SearchContext;

export const SearchProvider = ({ children }) => {
	let [stringLength, setStringLength] = useState(0);
	let [items, setItems] = useState();
	let [results, setResults] = useState("");
	let [string, setString] = useState("");
	let [loading, setLoading] = useState(true);
	let [allItems, setAllItems] = useState([]);
	let [focused, setFocused] = useState(false)
	let [searchKeys, setSearchKeys] = useState(["name", "description"]);
	let [param, setParam] = useState();
	const navigate = useNavigate();
	
	let {products} = useContext(ProductsContext)

	let getItems = () => {
		setItems(products);
		setAllItems(products);
		setLoading(false);
	};

	let location = useLocation();

	useEffect(() => {
		getItems()
	}, [products]);

	const handleOnFocus = () => {
		setFocused(true)
		//console.log("focued");
	};

	const handleOnSearch = (string, results) => {
		setString(string);
		setStringLength(string.length);
		setResults(results);
		if (string.length > 2 && location.pathname === "/" && focused) {
			navigate("/shop");
		}
		window.scroll(0, 0);
	};

	const handleOnHover = (result) => {
		// the item hovered
		//console.log(result);
	};

	const handleOnClear = () => {
		// the item hovered
		setResults([]);
		setString("");
	};

	// useEffect(() => {
	// 	if (string.length === 0) {
	// 		handleOnClear();
	// 		window.scroll(0, 0);
	// 	}
	// }, [string, results]);

	const handleOnSelect = (item) => {
		//navigate(`/product/${item.id}`);

		setResults([item]);
	};

	const formatResult = (item) => {
		return item;
	};

	let contextData = {
		items: items,
		results: results,
		string: string,
		searchKeys: searchKeys,
		allItems: allItems,
		stringLength: stringLength,
		param: param,

		setParam: setParam,
		setSearchKeys: setSearchKeys,
		formatResult: formatResult,
		handleOnFocus: handleOnFocus,
		handleOnHover: handleOnHover,
		handleOnSelect: handleOnSelect,
		handleOnSearch: handleOnSearch,
		//handleHomeSearch: handleHomeSearch,
		handleOnClear: handleOnClear,
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
