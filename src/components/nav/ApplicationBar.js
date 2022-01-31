import { ShoppingCart } from "@mui/icons-material";
import {
	AppBar,
	Badge,
	Grid,
	Hidden,
	IconButton,
	Toolbar,
	Tooltip,
	Typography,
	useScrollTrigger,
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
		textDecoration: "none",
		textDecorationLine: "none",
		fontSize: "25px",
		fontWeight: "light-bold",
		color: "black",
		[theme.breakpoints.down("md")]: {
			fontSize: "20px",
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
			gap: ".8rem",
		},
		alignItems: "center",
		justifyContent: "flex-end",
		[theme.breakpoints.up("md")]: {
			gap: "4rem",
		},
		maxWidth: "fit-content",
		maxHeight: "fit-content",
	},
	search: {
		maxWidth: "400px",
		maxHeight: "2em",
	},
	cart: {
		justifyContent: "left",
	},

	container: {
		width: "100%",
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
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
				? { backgroundColor: "rgb(245,245,245, .96)" }
				: {
						backgroundColor: "rgb(245,245,245, .0)",
						borderBottom: "1px solid rgb(0,0,0, .05)",
				  },
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
			<AppBar
				position="sticky"
				sx={{ zIndex: 2, maxHeight: "fit-content", padding: 0 }}
			>
				<Toolbar
					style={{
						backgroundColor: "transparent",
						maxHeight: "fit-content",
					}}
				>
					<div className={classes.container}>
						<Typography
							component={Link}
							to="/"
							className={classes.brand}
						>
							A<sup>+</sup> Drips
						</Typography>

						{location.pathname === "/" ||
						location.pathname === "/store" ? (
							<Hidden mdDown>
								<div
									style={{
										display: "flex",
										flex: 1,
										alignItems: "center",
										justifyContent: "flex-end",
									}}
								>
									<SearchForm />
								</div>
							</Hidden>
						) : null}
						<div className={classes.icons__grid}>
							<AccountMenu sx={{ mr: 20 }} />
							{location.pathname === "/signup" ||
							location.pathname === "/checkout" ? null : (
								<Tooltip title="Cart">
									<IconButton
										size="medium"
										onClick={() => navigate("/cart")}
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
						</div>
					</div>
				</Toolbar>
			</AppBar>
		</ElevationScroll>
	);
};

export default ApplicationBar;
