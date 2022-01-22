import React, { useContext } from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import SearchContext from "../../context/SearchContext";

const SearchForm = () => {
	let {
		string,
		items,
		handleOnSelect,
		handleOnSearch,
		handleOnHover,
		handleOnFocus,
		formatResult,
		handleOnClear,
	} = useContext(SearchContext);

	return (
		<div
			style={{
				width: "100%",
				maxWidth: "500px",
				zIndex: 5,
				alignItems: "center",
			}}
		>
			<ReactSearchAutocomplete
				styling={{
					height: "30px",
					boxShadow: "rgb(0,0,0, .2) 0px 1px 6px 0px",
					borderRadius: "15px",
					placeholderColor: "gray",
					fontFamily: "Quicksand",
				}}
				fuseOptions={{ keys: ["name", "summary"] }}
				items={string.length < 2 ? [] : items}
				onSearch={handleOnSearch}
				onHover={handleOnHover}
				onSelect={handleOnSelect}
				inputSearchString={string}
				onClear={handleOnClear}
				autoFocus={string.length<2?false:true}
				onFocus={handleOnFocus}
				resultStringKeyName="name"
				formatResult={formatResult}
				placeholder="search for a product..."
				maxResults={12}
			/>
		</div>
	);
};

export default SearchForm;
