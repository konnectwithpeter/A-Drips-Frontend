import { CloseRounded, SearchRounded } from "@mui/icons-material";
import { IconButton, InputAdornment, OutlinedInput, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/styles";
import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import SearchContext from "../../context/SearchContext";

const SearchForm = () => {
	let { searchString, handleSearch, handleCancelSearch } =
		useContext(SearchContext);

		const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'))

	const location = useLocation();

	return (
		<div
			style={{
				width: "100%",
				maxWidth: "500px",
				zIndex: 5,
				alignItems: "center",
			}}
		>
			<OutlinedInput
				style={{ height: "2rem" }}
				autoFocus={
					location.pathname !== "/" && searchString.length > 0 && true
				}
				value={searchString}
				size="small"
				onChange={handleSearch("search")}
				placeholder="search for a product..."
				startAdornment={
					searchString.length === 0 && (
						<InputAdornment position="start">
							<SearchRounded />
						</InputAdornment>
					)
				}
				fullWidth={
					location.pathname !== "/" && matches && true
				}
				endAdornment={
					searchString.length > 0 && (
						<InputAdornment position="end">
							<IconButton
								aria-label="clear-search"
								onClick={handleCancelSearch}
							>
								<CloseRounded />
							</IconButton>
						</InputAdornment>
					)
				}
			/>
		</div>
	);
};

export default SearchForm;
