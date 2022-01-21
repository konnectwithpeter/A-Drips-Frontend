import {
	Avatar, Box,
	Chip, Divider,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Rating
} from "@mui/material";
import React from "react";
import TimeStamp from "react-timestamp";
import Custom from "../../reusable/Custom";
import ReviewProduct from "./ReviewProduct";

const ProductReviews = ({ product, reviews, getReviews }) => {
	let props = { product, reviews, getReviews };

	return (
		<>
			{reviews.length < 1 ? null : (
				<Divider>
					<Chip label="Product Reviews" />
				</Divider>
			)}
			<Box align="left" sx={{ marginBottom: "2em" }}>
				<List
					sx={{
						width: "100%",
						position: "relative",
						overflow: "auto",
						maxHeight: 500,

						"& ul": { padding: 0 },
					}}
				>
					{reviews.length > 0
						? reviews.map((filteredReview, index) => (
								<ListItem alignItems="flex-start" key={index}>
									<ListItemAvatar>
										{filteredReview.name === null ? (
											<Avatar>
												{filteredReview.user
													.charAt(0)
													.toUpperCase()}
											</Avatar>
										) : (
											<Avatar>
												{filteredReview.name
													.charAt(0)
													.toUpperCase()}
											</Avatar>
										)}
									</ListItemAvatar>
									<ListItemText
										component={Box}
										sx={{
											border: "1px solid #BDBDBD",
											paddingLeft: 3,
											paddingBottom: 3,
											borderRadius: "5px 20px 5px",
										}}
										{...(filteredReview.name === null
											? filteredReview.name
											: "")}
										secondary={
											<React.Fragment>
												<Rating
													name="read-only"
													value={Number(
														filteredReview.rating
													)}
													readOnly
													style={{ display: "flex" }}
												/>
												{filteredReview.user ===
												null ? (
													<Custom.TextPriStyle
														sx={{
															display: "inline",
														}}
														component="span"
														variant="body2"
														color="text.primary"
														text={`${filteredReview.name} `}
													/>
												) : (
													<Custom.TextPriStyle
														sx={{
															display: "inline",
														}}
														component="span"
														variant="body2"
														color="text.primary"
														text={`${filteredReview.user} `}
													/>
												)}
												-{filteredReview.comment} <br />{" "}
												~
												<TimeStamp
													relative
													date={
														filteredReview.timestamp
													}
												/>
											</React.Fragment>
										}
									/>
								</ListItem>
						  ))
						: ""}
				</List>
			</Box>
			<Divider>
				<Chip label="Review this Product" />
			</Divider>
			<Box style={{ width: "100%" }} align="right">
				<ReviewProduct {...props} />
			</Box>
		</>
	);
};

export default ProductReviews;
