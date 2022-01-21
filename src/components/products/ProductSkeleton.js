import { Grid, Skeleton } from "@mui/material";
import React from "react";

const ProductSkeleton = () => {
	return (
		<div style={{
					width: "100vw",
					minHeight: "100vh",
				}}>
			<Grid
				container
				
			>
				<Grid item xs={12} sm={12} md={6}>
					<div
						style={{
							display: "flex",
							minHeight: "50vh",
						}}
					>
						<Skeleton
							variant="rectangular"
							style={{ width: "100%", height: "50vh" }}
						/>
					</div>
				</Grid>
				<Grid item xs={12} sm={12} md={6}>
					<div style={{ padding: "2em", alignContent: "center" }}>
						<Skeleton />
						<br />
						<Skeleton animation="wave" />
						<br />
						<Skeleton animation={false} />
						<br />
						<Skeleton animation={false} />
						<br />
						<br />
						<Skeleton animation={false} />
						<br />
						<Skeleton animation={false} />
						<br />
						<Skeleton animation={false} />
						<br />
					</div>
				</Grid>
				<div
					style={{
						display: "flex",
						minHeight: "20vh",
						width: "100vw",
					}}
				>
					<Skeleton
						variant="rectangular"
						style={{ width: "25%", height: "100%", margin: 3 }}
					/>
					<Skeleton
						variant="rectangular"
						style={{ width: "25%", height: "100%", margin: 3 }}
					/>
					<Skeleton
						variant="rectangular"
						style={{ width: "25%", height: "100%", margin: 3 }}
					/>
					<Skeleton
						variant="rectangular"
						style={{ width: "25%", height: "100%", margin: 3 }}
					/>
				</div>
				<div
					style={{
						minHeight: "30vh",
						width: "100vw",
					}}
				>
					<div
						component={Grid}
						container="true"
						style={{
							display: "flex",
							width: "80vw",
							padding: "1em",
						}}
					>
						<Grid item xs={2} sm={1} md={1}>
							<Skeleton
								variant="circular"
								width={40}
								height={40}
							/>
						</Grid>
						<Grid item xs={10} sm={9} md={9}>
							<Skeleton animation="wave" sx={{ width: "100%" }} />

							<Skeleton animation="wave" sx={{ width: "100%" }} />
						</Grid>
					</div>
					<div
						component={Grid}
						container="true"
						style={{
							display: "flex",
							width: "80vw",
							padding: "1em",
						}}
					>
						<Grid item xs={2} sm={1} md={1}>
							<Skeleton
								variant="circular"
								width={40}
								height={40}
							/>
						</Grid>
						<Grid item xs={10} sm={9} md={9}>
							<Skeleton animation="wave" sx={{ width: "100%" }} />

							<Skeleton animation="wave" sx={{ width: "100%" }} />
						</Grid>
					</div>
					<div
						component={Grid}
						container="true"
						style={{
							display: "flex",
							width: "80vw",
							padding: "1em",
						}}
					>
						<Grid item xs={2} sm={1} md={1}>
							<Skeleton
								variant="circular"
								width={40}
								height={40}
							/>
						</Grid>
						<Grid item xs={10} sm={9} md={9}>
							<Skeleton animation="wave" sx={{ width: "100%" }} />

							<Skeleton animation="wave" sx={{ width: "100%" }} />
						</Grid>
					</div>
				</div>
			</Grid>
		</div>
	);
};

export default ProductSkeleton;
