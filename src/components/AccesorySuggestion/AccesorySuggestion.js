import React, { useEffect, useState } from "react";
import "./AccesorySuggestion.css";

function AccesorySuggestion(props) {
	const [suggestion, setSuggestion] = useState(" A smiling face 😉");
	useEffect(() => {
		if (props.results.weather[0].main === "Sunny") {
			setSuggestion("Sunglasses 😎");
		}
		if (props.results.weather[0].main === "Rain") {
			setSuggestion("Umbrella ☂️");
		}
		if (props.results.weather[0].main === "Cold") {
			setSuggestion("Coat 🧥");
		}
	}, [props.results.weather[0].main]);

	return (
		<div className='OuterContainer'>
			<div className='HeadingContainer'>
				<h1>Do not forget to bring</h1>
			</div>
			<div className='InnerContainer'>
				<h2>{suggestion}</h2>
			</div>
		</div>
	);
}

export default AccesorySuggestion;
