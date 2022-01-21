import { Skeleton, Typography } from "@mui/material";
import React from "react";

const ProfileSkeleton = () => {
	return (
		<div style={{ width: "95%", margin: "auto", marginTop: "1em" }}>
			<div
				style={{
					p: 3,
					maxWidth: "90%",
					margin: "auto",
					marginBottom: "2em",
					backgroundColor: "rgba(0, 0, 0, 0.12)",
					borderRadius: "20px",
				}}
			>
				<div
					style={{ display: "flex", justifyContent: "space-around" }}
				>
					<Typography sx={{ width: "35%" }} variant="h1">
						{<Skeleton />}
					</Typography>
					<Typography sx={{ width: "35%" }} variant="h1">
						{<Skeleton />}
					</Typography>
				</div>
				<div
					style={{ display: "flex", justifyContent: "space-around" }}
				>
					<Typography sx={{ width: "35%" }} variant="h1">
						{<Skeleton />}
					</Typography>
					<Typography sx={{ width: "35%" }} variant="h1">
						{<Skeleton />}
					</Typography>
				</div>
			</div>
			<div
				style={{
					p: 3,
					width: "90%",
					margin: "auto",
					marginBottom: "2em",
					backgroundColor: "rgba(0, 0, 0, 0.12)",
					borderRadius: "20px",
					minHeight: "40vh",
					display: "flex",
				}}
			>
				<Skeleton
					sx={{
						bgcolor: "grey.900",
						width: "25%",
						height: "13em",
						marginTop: "10px",
						marginLeft: "10px",
					}}
				/>
				<Skeleton
					sx={{
						bgcolor: "grey.900",
						width: "25%",
						height: "13em",
						marginTop: "10px",
						marginLeft: "10px",
					}}
				/>
				<Skeleton
					sx={{
						bgcolor: "grey.900",
						width: "25%",
						height: "13em",
						marginTop: "10px",
						marginLeft: "10px",
					}}
				/>
				<Skeleton
					sx={{
						bgcolor: "grey.900",
						width: "25%",
						height: "13em",
						marginTop: "10px",
						marginLeft: "10px",
					}}
				/>
			</div>

			<div
				style={{
					p: 3,
					width: "90%",
					margin: "auto",
					marginBottom: "2em",
					backgroundColor: "rgba(0, 0, 0, 0.12)",
					borderRadius: "20px",
					minHeight: "40vh",
					display: "flex",
				}}
			>
				<Skeleton
					sx={{
						bgcolor: "grey.900",
						width: "25%",
						height: "13em",
						borderBottom: "2px solid #ab47bc",
						borderRight: "2px solid #ab47bc",
						borderRadius: "5px 20px 5px",
						marginTop: "10px",
						marginLeft: "10px",
					}}
				/>
				<Skeleton
					sx={{
						bgcolor: "grey.900",
						width: "25%",
						height: "13em",
						borderBottom: "2px solid #ab47bc",
						borderRight: "2px solid #ab47bc",
						borderRadius: "5px 20px 5px",
						marginTop: "10px",
						marginLeft: "10px",
					}}
				/>
				<Skeleton
					sx={{
						bgcolor: "grey.900",
						width: "25%",
						height: "13em",
						borderBottom: "2px solid #ab47bc",
						borderRight: "2px solid #ab47bc",
						borderRadius: "5px 20px 5px",
						marginTop: "10px",
						marginLeft: "10px",
					}}
				/>
				<Skeleton
					sx={{
						bgcolor: "grey.900",
						width: "25%",
						height: "13em",
						borderBottom: "2px solid #ab47bc",
						borderRight: "2px solid #ab47bc",
						borderRadius: "5px 20px 5px",
						marginTop: "10px",
						marginLeft: "10px",
					}}
				/>
			</div>
		</div>
	);
};

export default ProfileSkeleton;
