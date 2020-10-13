import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import {App, Timer, TimerClass} from "./App";
import * as serviceWorker from "./serviceWorker";

let startTime = new Date().getTime();

let int = 10;
function incrementTimer() {
	let total = new Date().getTime() - startTime;
	ReactDOM.render(	
		<App />, 			
		document.getElementById("root")
	);
}
setInterval(incrementTimer,1000/int);


ReactDOM.render(	
	<TimerClass />, 
	document.getElementById("timer")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
