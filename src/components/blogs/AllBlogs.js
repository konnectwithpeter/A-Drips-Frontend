import { Close, Comment } from "@mui/icons-material";
import {
	AppBar,
	Button,
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Dialog,
	DialogActions,
	DialogContent,
	Grid,
	IconButton,
	Slide,
	TextField,
	Toolbar,
	Typography,
	Zoom
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import parse from "html-react-parser";
import React, { useContext, useState } from "react";
import TimeStamp from "react-timestamp";
import APIContext from "../../context/APIContext";
import BlogPage from "./CommentsList";

let useStyles = makeStyles((theme) => ({
	container: {
		display: "flex",
		flex: 1,
		maxWidth: "50em",

		margin: "auto",
		marginBottom: "1em",
	},
	image: {
		// width: "100px",
		maxHeight: "180px",
		objectFit: "cover",
		// margin:"10px",
		// borderRadius: "10px",
		height: "100%",
		width: "auto",
		borderRadius: "10px",
		margin: "auto",
	},
	title: {},
	text: {},
}));

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const AllBlogs = ({ allPosts }) => {
	let { API_URL } = useContext(APIContext);
	let classes = useStyles();
	let [disabled, setDisabled] = useState(false);
	let [realSlug, setRealSlug] = useState("");
	let [realTitle, setRealTitle] = useState("");
	let [realPost, setRealPost] = useState("");
	let [reload, setReload] = useState(false);
	let [values, setValues] = useState({
		name: "",
		comment: "",
	});

	const handleChange = (prop) => (event) => {
		setValues({ ...values, [prop]: event.target.value });
	};

	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
		setDisabled(false);
	};

	const handleClose = () => {
		setOpen(false);
		setReload(false);
	};

	let handleClickModalOpen = (slug, title, post) => {
		setRealSlug(slug);
		setRealTitle(title);
		setRealPost(post);
		handleClickOpen();
	};

	let handleOnComment = async (e) => {
		e.preventDefault();
		try {
			let res = await axios.post(`${API_URL}api/post-comment/`, {
				name: values.name,
				comment: values.comment,
				slug: realSlug,
			});
			if (res.status === 201) {
				setReload(true);
				setDisabled(true);
			}
		} catch (err) {
			setOpen(false);
		}
	};

	let CommentsList = () => {
		return (
			<BlogPage slug={realSlug} reload={reload} setReload={setReload} />
		);
	};

	const checked = true;

	return (
		<>
			<Grid container spacing={2}>
				{allPosts.map((post, index) => (
					<Grid item key={post.slug} xs={12} sm={6} md={4} lg={4}>
						<Zoom
							in={checked}
							style={{
								transitionDelay: checked
									? `${index * 50}ms`
									: "0ms",
							}}
						>
							<Card
								//	className={classes.container}
								elevation={0}
								sx={{
									padding: 0,
									//border: "1px solid gray",
									maxWidth: "350px",
									margin: "auto",
								}}
							>
								<CardMedia
									component="img"
									src={post.image}
									className={classes.image}
									alt={post.title}
								/>
								<CardContent
									sx={{
										paddingTop: "0px",
										paddingBottom: "0px",
									}}
								>
									<div>
										<Typography variant="subtitle1">
											{post.title.slice(0, 70)}
										</Typography>{" "}
									</div>

									<Typography sx={{ fontSize: "10px" }}>
										<i>
											posted{" "}
											<TimeStamp
												relative
												date={post.timestamp}
											/>
										</i>
									</Typography>
								</CardContent>
								<CardActions
									sx={{
										display: "flex",
										flex: 1,
										justifyContent: "space-between",
										paddingTop: "0px",
									}}
								>
									<Button
										onClick={() =>
											handleClickModalOpen(
												post.slug,
												post.title,
												post.post
											)
										}
									>
										Learn More
									</Button>
									<IconButton
										onClick={() =>
											handleClickModalOpen(
												post.slug,
												post.title,
												post.post
											)
										}
									>
										<Comment color="primary" />
									</IconButton>
								</CardActions>
							</Card>
						</Zoom>
					</Grid>
				))}
			</Grid>
			<div>
				<Dialog
					open={open}
					onClose={handleClose}
					TransitionComponent={Transition}
				>
					<AppBar sx={{ position: "relative" }}>
						<Toolbar>
							<IconButton
								edge="start"
								color="inherit"
								onClick={handleClose}
								aria-label="close"
							>
								<Close />
							</IconButton>
							<Typography
								sx={{ ml: 2, flex: 1 }}
								variant="h6"
								component="div"
							>
								{realTitle}
							</Typography>
						</Toolbar>
					</AppBar>
					<DialogContent>
						<Typography component="div" variant="body2">
							{parse(realPost)}
						</Typography>

						{CommentsList()}
						<form
							component="div"
							style={{
								width: "90%",

								padding: 2,
								margin: "auto",
							}}
							onSubmit={handleOnComment}
						>
							<TextField
								autoFocus
								name="name"
								onChange={handleChange("name")}
								value={values.name}
								margin="dense"
								id="name"
								label="Name"
								type="text"
								fullWidth
								variant="standard"
								required
							/>

							<TextField
								sx={{ marginTop: "2em" }}
								fullWidth
								name="comment"
								onChange={handleChange("comment")}
								value={values.comment}
								label="Type your comment here .."
								multiline
								rows={4}
								required
							/>

							<DialogActions>
								<Button onClick={() => handleClose()}>
									Close
								</Button>
								<Button disabled={disabled} type="submit">
									Add a comment
								</Button>
							</DialogActions>
						</form>
					</DialogContent>
				</Dialog>
			</div>
		</>
	);
};

export default AllBlogs;
