import { Box } from "@mui/material";
import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { CartProvider } from "react-use-cart";
import ApplicationBar from "./components/nav/ApplicationBar";
import { APIProvider } from "./context/APIContext";
import { AuthProvider } from "./context/AuthContext";
import { OrdersProvider } from "./context/OrdersContext";
import { ProductsProvider } from "./context/ProductsContext";
import { SearchProvider } from "./context/SearchContext";
import { WishesProvider } from "./context/WishListContext";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import RegisterPage from "./pages/RegisterPage";
import Loader from "./reusable/PageLoadingBuffer";
import PrivateRoute from "./utils/PrivateRoute";
import PublicLogin from "./utils/PublicLogin";

const AllBlogsPage = React.lazy(() => import("./pages/AllBlogsPage"));
const LoginPage = React.lazy(() => import("./pages/LoginPage"));
const CheckoutPage = React.lazy(() => import("./pages/CheckoutPage"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const ProductPage = React.lazy(() => import("./pages/ProductPage"));
const StorePage = React.lazy(() => import("./pages/StorePage"));
const ResetPassword = React.lazy(() =>
	import("./components/auth/ResetPassword")
);
const ShoppingCart = React.lazy(() => import("./components/cart/ShoppingCart"));

const App = () => {
	return (
		//style={{ backgroundColor:""#1C1C27}}#E0E6F2backgroundColor: "#28293D",
		<APIProvider>
			<CartProvider>
				<Box
					elevation={0}
					style={{
						minHeight: "100vh",
						margin: 0,
						padding: 0,
						backgroundColor: "whitesmoke",
					}}
				>
					<AuthProvider>
						<WishesProvider>
							<ProductsProvider>
								<SearchProvider>
									<ApplicationBar />

									<Box
										elevation={0}
										style={{
											padding: 0,
											margin: 0,
											paddingBottom: 0,
											minHeight: "100%",
											paddingTop: 0,
										}}
									>
										<Suspense fallback={<Loader />}>
											<Routes>
												<Route
													path="/"
													exact
													element={<HomePage />}
												/>
												<Route
													path="/store"
													exact
													element={<StorePage />}
												/>
												<Route
													path="/product/:id"
													element={<ProductPage />}
												/>
												<Route
													path="/cart"
													element={<ShoppingCart />}
												/>
												<Route
													element={<PrivateRoute />}
												>
													<Route
														path="/account"
														element={
															<OrdersProvider>
																<ProfilePage />
															</OrdersProvider>
														}
													/>
													<Route
														path="/checkout"
														element={
															<CheckoutPage />
														}
													/>
												</Route>
												<Route
													element={<PublicLogin />}
												>
													<Route
														path="/create-account"
														element={
															<RegisterPage />
														}
													/>
													<Route
														path="/login"
														element={<LoginPage />}
													/>
													<Route
														path={
															"/reset-password/:id/:id"
														}
														element={
															<ResetPassword />
														}
													/>
												</Route>

												<Route
													path="/news"
													exact
													element={<AllBlogsPage />}
												/>
												<Route
													path="*"
													element={<NotFound />}
												/>
											</Routes>
										</Suspense>
									</Box>
								</SearchProvider>
							</ProductsProvider>
						</WishesProvider>
					</AuthProvider>
				</Box>
			</CartProvider>
		</APIProvider>
	);
};

export default App;
