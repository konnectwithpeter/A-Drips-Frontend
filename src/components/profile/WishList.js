import {
	CancelPresentationRounded,
	ReadMoreRounded
} from "@mui/icons-material";
import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Chip, IconButton,
	Paper,
	Typography
} from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import APIContext from "../../context/APIContext";
import AuthContext from "../../context/AuthContext";
import ProductsContext from "../../context/ProductsContext";
import WishesContext from "../../context/WishListContext";
import Custom from "../../reusable/Custom";
const responsiveItems = {
	desktop: {
		breakpoint: { max: 3000, min: 1024 },
		items: 3,
		slidesToSlide: 3, // optional, default to 1.
		partialVisibilityGutter: 40,
	},
	tablet: {
		breakpoint: { max: 1024, min: 464 },
		items: 2,
		slidesToSlide: 1, // optional, default to 1.
		partialVisibilityGutter: 20,
	},
	mobile: {
		breakpoint: { max: 464, min: 0 },
		items: 1,
		slidesToSlide: 1, // optional, default to 1.
		partialVisibilityGutter: 40,
	},
};

const WishList = () => {
	let { API_URL } = useContext(APIContext);
	let { wishes, getWishes } = useContext(WishesContext);
	let { user, authTokens } = useContext(AuthContext);
	let { products } = useContext(ProductsContext);
	let [waitRequest, setWaitRequest] = useState(false);

	useEffect(() => {
		getWishes();
	}, []);
	let removeWish = async (wish) => {
		setWaitRequest(true);
		await axios.delete(`${API_URL}api/wishlist/`, {
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + String(authTokens.access),
			},
			data: { wish: wish.slug },
			user: user,
		});
		getWishes();
		setWaitRequest(false);
	};
	return (
		<Box
			sx={{
				backgroundColor: "white",
				borderBottomRightRadius: "10px",
				display: "flex",
				flex: 1,
				flexDirection: "column",
				paddingTop:"1rem"
			}}
			//align="center"
			// style={{
			// 	display: "flex",
			// 	position: "relative",
			// 	top: 50,
			// 	left: 0,
			// 	minHeight: "100%",
			// 	width: "100%",
			// }}
		>
			<Typography
				variant="h6"
				sx={{ textAlign: "center", fontWeight: "bold" }}
				color="secondary"
			>
				My Wish Items
			</Typography>
			{wishes.length === undefined ? null : wishes.length === 0 ? (
				<Box>
					<Typography align="center" sx={{ p: 3 }}>
						Item added to your favorites will be listed here
					</Typography>
				</Box>
			) : (
				<Box
					elevation={0}
					style={{
						maxWidth: "95%",
						margin: "auto",
						borderRadius: "20px",
						backgroundColor: "transparent",
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
					}}
				>
					{wishes.map((wish) =>
						products
							.filter((item) => item.slug === wish.product)
							.map((item, index) => (
								<Card
								component={Paper}
								elevation={5}
									sx={{
										
										margin: "1em",
										borderRadius: "10px",
										// borderBottom: "2px solid gray",
										// borderRight: "2px solid gray",
										// borderRadius: "5px 20px 5px",
										backgroundColor: "transparent",
										display: "flex",
									}}
									key={index}
								>
									<CardMedia
										component="img"
										height="140"
										sx={{
											width: "auto",
											margin: "auto",
											objectFit: "cover",
											borderRadius:"20px"
										}}
										src={item.image1}
										alt={item.name}
									/>
									<div>
										<CardContent>
											<Typography
												gutterBottom
												variant="h6"
												component="div"
											>
												{item.name.slice(0, 12)}{" "}
											</Typography>
											<Chip
												sx={{
													color: "black",
													width: "50%",
												}}
												size="small"
												label={
													<Typography variant="h6">
														{item.price.toLocaleString()}
														<sup
															style={{
																fontSize:
																	"10px",
															}}
														>
															Ksh
														</sup>
													</Typography>
												}
											/>
											<Typography
												variant="body2"
												color="text.secondary"
											>
												{item.short_description.slice(
													0,
													65
												)}
											</Typography>
										</CardContent>
										<CardActions
											sx={{
												justifyContent: "space-between",
											}}
										>
											<IconButton
												disabled={waitRequest}
												onClick={() => removeWish(item)}
											>
												<CancelPresentationRounded color="error" />
											</IconButton>

											<Button
												component={Link}
												to={`/product/${item.slug}`}
												size="small"
												startIcon={<ReadMoreRounded />}
											>
												Learn More
											</Button>
											<Custom.AddtoCart item={item} />
										</CardActions>
									</div>
								</Card>
							))
					)}
					{/* <Carousel
						responsive={responsiveItems}
						autoPlay={true}
						infinite={true}
						autoPlaySpeed={10000}
						removeArrowOnDeviceType={["mobile"]}
						keyBoardControl={true}
						showDots={true}
						partialVisible={true}
					>
						{wishes.map((wish) =>
							products
								.filter((item) => item.slug === wish.product)
								.map((item, index) => (
									<Card
										sx={{
											maxWidth: 345,
											margin: "1em",
											borderBottom: "2px solid #ab47bc",
											borderRight: "2px solid #ab47bc",
											borderRadius: "5px 20px 5px",
											backgroundColor: "transparent",
										}}
										key={index}
									>
										<CardMedia
											component="img"
											
											height="140"
											sx={{width: "auto", margin:"auto", objectFit:"cover"}}
											src={item.image1}
											alt={item.name}
										/>
										<CardContent>
											<Typography
												gutterBottom
												variant="h6"
												component="div"
											>
												{item.name.slice(0, 12)}{" "}
											</Typography>
											<Chip
												sx={{
													color: "black",
													width: "50%",
												}}
												size="small"
												label={
													<Typography variant="h6">
														{item.price.toLocaleString()}
														<sup
															style={{
																fontSize:
																	"10px",
															}}
														>
															Ksh
														</sup>
													</Typography>
												}
											/>
											<Typography
												variant="body2"
												color="text.secondary"
											>
												{item.short_description.slice(
													0,
													65
												)}
											</Typography>
										</CardContent>
										<CardActions
											sx={{
												justifyContent: "space-between",
											}}
										>
											<IconButton
												disabled={waitRequest}
												onClick={() => removeWish(item)}
											>
												<CancelPresentationRounded color="error" />
											</IconButton>

											<Button
												component={Link}
												to={`/product/${item.slug}`}
												size="small"
												startIcon={<ReadMoreRounded />}
											>
												Learn More
											</Button>
											<Custom.AddtoCart item={item} />
										</CardActions>
									</Card>
								))
						)}
					</Carousel> */}
				</Box>
			)}
		</Box>
	);
};

export default WishList;
