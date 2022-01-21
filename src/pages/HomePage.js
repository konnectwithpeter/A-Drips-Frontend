import { styled } from "@mui/material/styles";
import { useEffect } from "react";
import TawkTo from "tawkto-react";
import RiskReducers from "../components/homepage/RiskReducers";
import Categories from "../components/homepage/Categories";
import FeaturedProducts from "../components/homepage/FeaturedProducts";
import Footer from "../components/homepage/Footer";
import Hero from "../components/homepage/Hero";
import RecentArrivals from "../components/homepage/RecentArrivals";
import Testimonials from "../components/homepage/Testimonials";
import WeeklyDeal from "../components/homepage/WeeklyDeal";

const Root = styled("div")(({ theme }) => ({
	padding: theme.spacing(0),
	paddingBottom: 0,
	paddingTop: 0,
	[theme.breakpoints.down("md")]: {
		//backgroundColor: theme.palette.secondary.main,
		//marginTop: "5em",
	},

	//   [theme.breakpoints.up('md')]: {
	//     backgroundColor: theme.palette.primary.main,
	//   },
	//   [theme.breakpoints.up('lg')]: {
	//     backgroundColor: green[500],
	//   },
}));

const HomePage = () => {
	const tawkToPropertyId = "61b3f62d80b2296cfdd12760";

	// Direct Chat Link
	// https://tawk.to/chat/tawkToPropertyId/tawkToKey

	const tawkId = "1fmjfj8mv";

	useEffect(() => {
		var tawk = new TawkTo(tawkToPropertyId, tawkId);

		tawk.onStatusChange((status) => {
			// console.log(status)
		});
	}, []);

	//alway scroll to the top of the page at screen load
	useEffect(() => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	}, []);

	return (
		<Root id="body">
			<Hero />
			<WeeklyDeal />
			<Categories />
			<FeaturedProducts />
			<RecentArrivals />
			<RiskReducers />
			<Testimonials />
			<div style={{ marginTop: "3em" }}>
				<Footer />
			</div>
		</Root>
	);
};

export default HomePage;
