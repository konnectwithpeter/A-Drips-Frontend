import { CloseRounded, SortRounded } from "@mui/icons-material";
import {
	Button,
	Dialog, DialogContent, FormControl,
	FormHelperText,
	Grid,
	IconButton,
	MenuItem,
	Select, Typography, useMediaQuery
} from "@mui/material";
import { makeStyles, useTheme } from "@mui/styles";
import React, { useContext } from "react";
import SearchContext from "../../context/SearchContext";
import Custom from "../../reusable/Custom";

let useStyles = makeStyles((theme) => ({
	container: {
		[theme.breakpoints.up("lg")]: {
			maxWidth: "80rem",
			padding: "0 auto",
			margin: "0 auto",
			marginBottom: "3rem",
		},
		maxWidth: "100%",
	},
}));

const SearchedResults = () => {
	let { results } = useContext(SearchContext);
	let classes = useStyles();
	const [sortParam, setSortParam] = React.useState("");

	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down("sm"));
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleChange = (event) => {
		var newValue = event.target.value;
		setSortParam(newValue);
		setOpen(false);
		results.sort(handleSort(newValue));
	};

	const handleSort = (property) => {
		var sortOrder = 1;
		if (property[0] === "-") {
			sortOrder = -1;
			property = property.substr(1);
		}
		return function (a, b) {
			var results =
				a[property] < b[property]
					? -1
					: a[property] > b[property]
					? 1
					: 0;
			return results * sortOrder;
		};
	};

	return (
		<div
			style={{
				margin: "1rem 0",
				zIndex: 1,
				minHeight: "90vh",
			}}
		>
			<Button startIcon={<SortRounded />} onClick={handleClickOpen}>
				Sort Results
			</Button>
			<Dialog
				sx={{ top: "-50%", position: "absolute", p: 0 }}
				disableEscapeKeyDown
				open={open}
				onClose={handleClose}
			>
				<DialogContent>
					<FormControl sx={{ m: 1, minWidth: 120 }}>
						<Select
							value={sortParam}
							onChange={handleChange}
							sx={{ border: "0px solid gray !important" }}
						>
							<Typography sx={{ fontWeight: "bold" }}>
								Price
							</Typography>

							<MenuItem value="price">least - most</MenuItem>
							<MenuItem value="-price">most - least</MenuItem>

							<Typography sx={{ fontWeight: "bold" }}>
								Size
							</Typography>

							<MenuItem value="size">small - large</MenuItem>
							<MenuItem value="-size">large - small</MenuItem>

							<Typography sx={{ fontWeight: "bold" }}>
								Discount
							</Typography>

							<MenuItem value="discount">least - most</MenuItem>
							<MenuItem value="-discount">most - least</MenuItem>
						</Select>
						<FormHelperText>sort by {sortParam}</FormHelperText>
					</FormControl>
				</DialogContent>

				<IconButton
					onClick={handleClose}
					sx={{ top: 0, right: 0, position: "absolute" }}
				>
					<CloseRounded size="small" />
				</IconButton>
			</Dialog>

			<Grid
				container
				align="center"
				spacing={matches ? 1 : 3}
				style={{ alignItems: "center" }}
				className={classes.container}
			>
				{results.map((product, index) => (
					<Grid
						item
						xs={6}
						sm={4}
						md={4}
						lg={3}
						align="left"
						key={index}
					>
						<Custom.ProductContainer
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
		</div>
	);
};

export default SearchedResults;
