import {
	ChatBubbleOutline,
	Close, Menu as MenuIcon,
	StoreRounded
} from "@mui/icons-material";
import {
	IconButton,
	ListItemIcon,
	ListItemText,
	Menu,
	MenuItem,
	Tooltip
} from "@mui/material";
import Box from "@mui/material/Box";
import * as React from "react";
import { useNavigate } from "react-router";

export default function DropdownMenu() {
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
				<Tooltip title="More">
					<IconButton
					aria-label="more options"
						size="small"
						color="primary"
						onClick={handleClick}
					>
						{!open ? (
							<MenuIcon font="inherit" sx={{ color: "black" }} />
						) : (
							<Close font="inherit" sx={{ color: "black" }} />
						)}
					</IconButton>
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
				<MenuItem onClick={() => navigate("/shop")}>
					<ListItemIcon>
						<StoreRounded fontSize="small" />
					</ListItemIcon>
					<ListItemText>Store</ListItemText>
				</MenuItem>
				<MenuItem onClick={() => navigate("/news")}>
					<ListItemIcon>
						<ChatBubbleOutline fontSize="small" />
					</ListItemIcon>
					<ListItemText>News</ListItemText>
				</MenuItem>
			</Menu>
		</React.Fragment>
	);
}