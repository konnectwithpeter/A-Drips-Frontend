import { Box, Grid, Skeleton } from "@mui/material";
import React from "react";

const ProductCardSkeleton = ({ loops }) => {
	return [...Array(loops)].map((e, i) => (
		<Grid item xs={6} sm={6} md={4} lg={3} key={i}>
			<Box sx={{ maxWidth: 200, width:"100%" }}>
				<Skeleton
					variant="rectangular"
					sx={{ width: "100%" }}
					height={118}
				/>
				<Skeleton />
				<Skeleton animation="wave" />
				<Skeleton animation="wave" />
				<Skeleton animation={false} />
			</Box>
		</Grid>
	));
};

export default ProductCardSkeleton;
