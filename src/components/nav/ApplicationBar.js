import {
	ShoppingCart
} from "@mui/icons-material";
import {
	AppBar,
	Badge,
	Grid,
	Hidden,
	IconButton,
	Toolbar,
	Tooltip,
	Typography,
	useScrollTrigger
} from "@mui/material";
import { makeStyles, styled } from "@mui/styles";
import PropTypes from "prop-types";
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "react-use-cart";
import SearchForm from "../store/SearchForm";
import AccountMenu from "./AccountMenu";
import DropdownMenu from "./Dropdown";

let useStyles = makeStyles((theme) => ({
	nav: {},
	brand: {
		display: "flex",
		marginRight: "4px",
		minWidth: "20%",
		maxWidth: "30%",
		alignItems: "center",
		justifyContent: "left",
	},
	small__brand: {
		textDecoration: "none",
		color: "black",
		textUnderlineOffset: "none",
		"&:hover": {
			transform: "translateY(-5%)",
		},
	},
	hum: {
		border: "0px",
		float: "right",
		"&:focus": {
			outline: "none",
		},
	},
	toolbar: {
		justifyContent: "space-between",
		alignItems: "center",
	},

	icons: {
		display: "flex",
		flex: 1,
		justifyContent: "space-evenly",
		alignItems: "center",
	},
	icons__grid: {
		display: "flex",
		[theme.breakpoints.down("md")]: {
			width: "60%",
			gap:"2rem"
		},
		[theme.breakpoints.up("sm")]: {
			width: "40%",
		},
		alignItems: "center",
		justifyContent: "flex-end",
		[theme.breakpoints.up("md")]:{
			gap:"4rem"
		}
		
	},
	search: {
		maxWidth: "400px",
		maxHeight: "2em",
	},
	cart: {
		justifyContent: "left",
	},
}));

const ApplicationBar = () => {
	let location = useLocation();
	let classes = useStyles();
	let { totalUniqueItems } = useCart();
	const navigate = useNavigate();

	function ElevationScroll(props) {
		const { children, window } = props;

		const trigger = useScrollTrigger({
			disableHysteresis: true,
			threshold: 0,
			target: window ? window() : undefined,
		});
		return React.cloneElement(children, {
			elevation: trigger ? 3 : 0,
			sx: trigger
				? { backgroundColor: "rgb(255,255,255, .94)" }
				: { backgroundColor: "rgb(255,255,255, .0)" },
		});
	}

	ElevationScroll.propTypes = {
		children: PropTypes.element.isRequired,
		/**
		 * Injected by the documentation to work in an iframe.
		 * You won't need it on your project.
		 */
		window: PropTypes.func,
	};

	const StyledBadge = styled(Badge)(({ theme }) => ({
		"& .MuiBadge-badge": {
			right: -3,
			top: 10,
			border: `2px solid ${theme.palette.background.paper}`,
			padding: "0 4px",
		},
	}));

	return (
		<ElevationScroll>
			<AppBar position="sticky" sx={{ zIndex: 2 }}>
				<Toolbar style={{ backgroundColor: "transparent" }}>
					<Grid
						container
						sx={{ width: "100%" }}
						justifyContent="space-between"
					>
						<Grid
							item
							align="center"
							style={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<Typography
								component={Link}
								to="/"
								sx={{
									textDecoration: "none",
									textDecorationLine: "none",
									fontSize: "25px",
									fontWeight: "light-bold",
									color: "black",
								}}
							>
								A<sup>+</sup> Drips
							</Typography>
						</Grid>

						{location.pathname === "/" ||
						location.pathname === "/shop" ? (
							<Hidden mdDown>
								<Grid
									item
									style={{
										minWidth: "37.5%",
										alignItems: "center",
										display: "flex",
									}}
								>
									<div
										style={{
											display: "flex",
											flex: 1,
											paddingTop: "5px",
										}}
									>
										<SearchForm />
									</div>
								</Grid>
							</Hidden>
						) : (
							""
						)}

						<Grid item className={classes.icons__grid}>
							<AccountMenu sx={{ mr: 20 }} />
							{location.pathname === "/signup" ||
							location.pathname === "/checkout" ? null : (
								<Tooltip title="Cart">
									<IconButton
										size="medium"
										onClick={() => navigate("/cart")}
										sx={
											location.pathname === "/cart"
												? { transform: "scale(.6)" }
												: {}
										}
									>
										<StyledBadge
											className={classes.cart}
											color="primary"
											size="small"
											badgeContent={totalUniqueItems}
										>
											<ShoppingCart
												sx={{ fontSize: 20 }}
											/>
										</StyledBadge>
									</IconButton>
								</Tooltip>
							)}
							<DropdownMenu />
						</Grid>
					</Grid>
				</Toolbar>
			</AppBar>
		</ElevationScroll>
	);
};

export default ApplicationBar;
