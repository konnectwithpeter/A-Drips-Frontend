import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import TawkTo from "tawkto-react";
import Categories from "../components/homepage/Categories";
import FeaturedProducts from "../components/homepage/FeaturedProducts";
import Footer from "../components/homepage/Footer";
import Hero from "../components/homepage/Hero";
import RecentArrivals from "../components/homepage/RecentArrivals";
import RequestForm from "../components/homepage/RequestForm";
import RiskReducers from "../components/homepage/RiskReducers";
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
}));

const HomePage = () => {
	const tawkToPropertyId = "61f3c0ec9bd1f31184d9c696";

	// Direct Chat Link
	// https://tawk.to/chat/tawkToPropertyId/tawkToKey
	//https://tawk.to/chat/61f3c0ec9bd1f31184d9c696/1fqg2j76q

	const tawkId = "1fqg2j76q";

	useEffect(() => {
		var tawk = new TawkTo(tawkToPropertyId, tawkId);

		tawk.onStatusChange((status) => {
			// console.log(status)
		});
	}, []);

	useEffect(() => {
		// This will run when the page first loads and whenever the title changes
		document.title = `Aplus Drips | The new online shoe store`;
	}, []);

	const [landScreenLoaded, setLandScreenLoaded] = useState(false);

	return (
		<Root id="body">
			<Hero setLandScreenLoaded={setLandScreenLoaded} />
			{landScreenLoaded && (
				<>
					<Categories />
					<WeeklyDeal />
					<FeaturedProducts />
					<RecentArrivals />
					<RequestForm />
					<RiskReducers />
					<Testimonials />
					<div style={{ marginTop: "3em" }}>
						<Footer />
					</div>
				</>
			)}
		</Root>
	);
};

export default HomePage;
