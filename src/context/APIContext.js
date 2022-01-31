import React, { createContext } from "react";
let APIContext = createContext();
export default APIContext;
export const APIProvider = (props) => {

	//global start section for urls in the entire project
	const backendUrl = "https://aplusdrips.com/";
	const frontendUrl = "https://aplusdrips.com/";

	let contextData = { API_URL: backendUrl, BASE_URL: frontendUrl };
	return (
		<APIContext.Provider value={contextData}>
			{props.children}
		</APIContext.Provider>
	);
};
