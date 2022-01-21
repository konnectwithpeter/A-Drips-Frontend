import {
	AccountBoxOutlined,
	AccountBoxRounded,
	AccountCircleRounded,
	Login,
	Logout,
	ManageAccounts
} from "@mui/icons-material";
import {
	Chip,
	Hidden,
	IconButton,
	ListItemIcon,
	ListItemText,
	Menu,
	MenuItem,
	Tooltip
} from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

export default function AccountMenu() {
	let { user, logoutUser } = React.useContext(AuthContext);

	const navigate = useNavigate();
	//let classes = useStyles();
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	return (
		<React.Fragment>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					textAlign: "center",
				}}
			>
				<Tooltip title="Account">
					{user.username === "guest" ? (
						<Chip
							sx={{ ml: 0, flexShrink: 3 }}
							size="small"
							color="primary"
							variant="contained"
							icon={<AccountCircleRounded font="inherit" />}
							// aria-haspopup="true"
							// aria-expanded={open ? "true" : undefined}
							onClick={handleClick}
						/>
					) : (
						<>
							<Hidden mdDown>
								<Chip
									onClick={handleClick}
									size="small"
									sx={{ ml: 0, flexShrink: 3 }}
									color="primary"
									icon={<AccountCircleRounded />}
									variant="outlined"
									label={`Hello, ${
										user.username !== null ||
										user.username !== undefined
											? user.username.slice(0, 6)
											: null
									}`}
								/>
							</Hidden>
							<Hidden mdUp>
								<Tooltip title="Account">
									<IconButton onClick={handleClick}>
										<AccountBoxRounded />
									</IconButton>
								</Tooltip>
							</Hidden>
						</>
					)}
				</Tooltip>
			</Box>
			<Menu
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				onClick={handleClose}
				PaperProps={{
					elevation: 0,
					sx: {
						overflow: "visible",
						filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
						mt: 1.5,
						"& .MuiAvatar-root": {
							width: 32,
							height: 32,
							ml: -0.5,
							mr: 1,
						},
						"&:before": {
							content: '""',
							display: "block",
							position: "absolute",
							top: 0,
							right: 14,
							width: 10,
							height: 10,
							bgcolor: "background.paper",
							transform: "translateY(-50%) rotate(45deg)",
							zIndex: 0,
						},
					},
				}}
				transformOrigin={{ horizontal: "right", vertical: "top" }}
				anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
			>
				{user.username === "guest" ? (
					<div>
						<MenuItem onClick={() => navigate("/login")}>
							<ListItemIcon>
								<Login fontSize="small" />
							</ListItemIcon>
							<ListItemText>Login</ListItemText>
						</MenuItem>
						<MenuItem
							onClick={() => navigate("/create-account")}
						>
							<ListItemIcon>
								<ManageAccounts fontSize="small" />
							</ListItemIcon>
							<ListItemText>Create</ListItemText>
						</MenuItem>
					</div>
				) : (
					<div>
						<MenuItem onClick={() => navigate("/profile")}>
							<ListItemIcon>
								<AccountBoxOutlined
									color="primary"
									fontSize="small"
								/>
							</ListItemIcon>
							Account
						</MenuItem>

						<Divider />
						<MenuItem
							onClick={() => {
								setAnchorEl(null);
								logoutUser();
								window.location.reload();
							}}
						>
							<ListItemIcon>
								<Logout fontSize="small" />
							</ListItemIcon>
							Logout
						</MenuItem>
					</div>
				)}
			</Menu>
		</React.Fragment>
	);
}
