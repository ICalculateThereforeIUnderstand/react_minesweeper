import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Gumb} from "./gumb.js";
import { Ploca } from "./ploca.js";
import { DigitalniBrojac } from "./digitalniBrojac.js";

let cont = document.querySelector("#cont");


function Povrsina() {
	return (
	    <div id="povrsina">
	        <div id="povrsina-el">
	            <div id="povrsina-el-el">
	                <DigitalniBrojac sirina="60px" broj={123}/>
	                <Gumb/>
	                <DigitalniBrojac sirina="60px" broj={456}/>
	            </div>    
	        </div>
	        <div id="povrsina-el1">
	            <Ploca/>
	        </div>
	    </div>
	)
}


function App1() {
	return (
	    <div className="pokus">
	        <Povrsina/>
	    </div>
	)
}

class App2 extends React.Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		return (
		    <div className="pokus">
	            <Povrsina/>
	        </div>
		)
	}
}

ReactDOM.render(
    <App2/>,
    cont
)

