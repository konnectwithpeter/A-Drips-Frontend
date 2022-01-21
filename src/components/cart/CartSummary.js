import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography
} from "@mui/material";
import React, { useContext } from "react";
import { useCart } from "react-use-cart";
import APIContext from "../../context/APIContext";

const CartSummary = () => {
	let { API_URL } = useContext(APIContext);
	let { items, cartTotal, totalItems, totalUniqueItems } = useCart();
	return (
		<TableContainer
			component={Paper}
			elevation={5}
			sx={{
				maxWidth: "35em",
				
				margin:"auto",
				margin:"1em",marginTop:"0px"
			}}
		>
			<Table sx={{ maxWidth: "100%"}}>
				<TableHead>
					<TableRow>
						<TableCell colSpan={5}>
							<Typography variant="h6">Order Summary</Typography>{" "}
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell align="center" />
						<TableCell align="left">Items {totalItems}</TableCell>
						<TableCell align="center">
							Qty {totalUniqueItems}
						</TableCell>
						<TableCell align="right">Unit</TableCell>
						<TableCell align="right">Sum</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{items.map((item, index) => (
						<TableRow key={index}>
							<TableCell>
								<img
									src={item.image1.slice(0,4)==='http'?`${item.image1}`:`${API_URL}${item.image1.slice(1)}`}
									alt={item.name}
									style={{
										maxHeight: 50,
										maxWidth: 50,
									}}
								/>
							</TableCell>
							<TableCell>{item.name}</TableCell>
							<TableCell align="center">
								{item.quantity}
							</TableCell>
							<TableCell align="right">
								{item.price.toLocaleString()}
								<sup>Ksh</sup>
							</TableCell>
							<TableCell align="right">
								{(item.price * item.quantity).toLocaleString()}
							</TableCell>
						</TableRow>
					))}

					<TableRow>
						<TableCell colSpan={2}>SubTotal</TableCell>
						<TableCell align="right">
							Ksh {cartTotal.toLocaleString()}
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell colSpan={2}>Carriage Cost</TableCell>
						<TableCell align="right">Not Included</TableCell>
					</TableRow>
					<TableRow>
						<TableCell colSpan={2}>GrandTotal</TableCell>
						<TableCell align="right">_____</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default CartSummary;
