import { FavoriteBorderRounded, FavoriteRounded } from "@mui/icons-material";
import { Alert, IconButton, Modal, Snackbar, Tooltip } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useContext, useState } from "react";
import LoginForm from "../components/auth/LoginForm";
import AuthContext from "../context/AuthContext";
import WishesContext from "../context/WishListContext";

let useStyles = makeStyles({
	wish: {
		zIndex: 2,
		position: "absolute",
		"&:hover": {
			backgroundColor: "#EDEDED",
			color: "black",
		},
		"&:focus": {
			outline: "none",
		},
	},
});

const AddtoWish = ({ slug }) => {
	let classes = useStyles([]);
	const [open, setOpen] = useState(false);
	let { user } = useContext(AuthContext);
	let { handleAddToWish, severity, message, wishes } =
		useContext(WishesContext);

	const [modalOpen, setModalOpen] = useState(false);
	const handleModalClose = () => setModalOpen(false);

	const handleSnackBar = () => {
		let bool = true;
		setOpen(bool);
	};

	const addToWish = () => {
		if (user.username === "guest") {
			setModalOpen(true);
		} else {
			handleAddToWish(slug);
			handleSnackBar();
		}
	};

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		setOpen(false);
	};

	return (
		<>
			<Tooltip title="Add to wish list">
				<IconButton
					className={classes.wish}
					size="small"
					onClick={() => addToWish()}
				>
					{wishes.some((wish) => wish.product === slug) ? (
						<FavoriteRounded color="error" />
					) : (
						<FavoriteBorderRounded />
					)}
				</IconButton>
			</Tooltip>
			<Snackbar
				open={open}
				autoHideDuration={3000}
				onClose={handleClose}
				style={{ textTransform: "none" }}
			>
				<Alert
					severity={severity}
					sx={{ width: "100%", fontWeight: "bold" }}
				>
					{message}
				</Alert>
			</Snackbar>
			<Modal open={modalOpen} onClose={handleModalClose}>
				<div
					style={{
						maxWidth: "fit-content",
						maxHeight: "fit-content",
						margin: "auto",
					}}
				>
					<LoginForm onClickProp={() => setModalOpen(false)} />
				</div>
			</Modal>
		</>
	);
};

export default AddtoWish;
