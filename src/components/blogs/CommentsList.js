import {
	Avatar,
	Box,
	CircularProgress,
	Divider,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Typography
} from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import "react-multi-carousel/lib/styles.css";
import TimeStamp from "react-timestamp";
import APIContext from "../../context/APIContext";
import Custom from "../../reusable/Custom";

const CommentsList = ({ slug, reload, setReload }) => {
	let { API_URL } = useContext(APIContext);
	let [loading, setLoading] = useState(true);
	let [comments, setComments] = useState([]);

	let getAllComments = async () => {
		//console.log("fetching for", slug);

		let response = await axios.get(`${API_URL}api/comments/?blog=${slug}`);
		setComments(response.data);
		setLoading(false);
		//console.log("fetched:", response.data);
	};

	useEffect(() => {
		getAllComments();
	}, [reload]);

	useEffect(() => {
		getAllComments();
	}, []);

	//console.log(post);

	return loading === true ? (
		<CircularProgress />
	) : comments.length > 0 ? (
		<>
			<Divider>
				<Typography>Comments</Typography>
			</Divider>
			<List
				sx={{
					width: "100%",
					position: "relative",
					// overflow: "auto",
					// maxHeight: 500,

					"& ul": { padding: 0 },
				}}
			>
				{comments.length > 0
					? comments.map((comment, index) => (
							<ListItem alignItems="flex-start" key={index}>
								<ListItemAvatar>
									<Avatar>
										{comment.name.charAt(0).toUpperCase()}
									</Avatar>
								</ListItemAvatar>
								<ListItemText
									component={Box}
									sx={{
										border: "1px solid #BDBDBD",
										paddingLeft: 3,
										paddingBottom: 3,
										borderRadius: "5px 20px 5px",
									}}
									secondary={
										<React.Fragment>
											<Custom.TextPriStyle
												sx={{
													display: "inline",
												}}
												component="span"
												variant="body2"
												color="text.primary"
												text={comment.name}
											/>
											-{comment.text} <br /> ~
											<TimeStamp
												relative
												date={comment.timestamp}
											/>
										</React.Fragment>
									}
								/>
							</ListItem>
					  ))
					: ""}
			</List>
		</>
	) : null;
};

export default CommentsList;
