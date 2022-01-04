import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Gumb} from "./gumb.js";
import { DigitalniBrojac } from "./digitalniBrojac.js";

let cont = document.querySelector("#cont");


function App() {
	const [br, setBr] = React.useState(0);
	
	React.useEffect(()=>{
		if (true) {
		    setInterval(()=>{setBr((prevBr)=>{return (prevBr+1)})}, 130);
		}
	}, []);
	
	return (
	    <div className="pokus">
            <DigitalniBrojac sirina="100px" broj={br}/>
        </div>
	)
}


function Ploca({x=10, y=10}) {
	const [nx, setNx] = React.useState(x);
	const [ny, setNy] = React.useState(y);
	
	
	function generirajPlocu(x, y) {
		let polje = [];
		for (let i = 0; i < x; i++) {
			for (let j = 0; j < y; j++) {
				if (Math.random() < 0.8) {
					let r = Math.random(); 
					if (r < 0.2) {
				        polje.push(React.createElement("div", {key:j + i*y, id: (j+i*y)+"el", className: "el plava"}, "1"));
				    } else if (r < 0.4) {
						polje.push(React.createElement("div", {key:j + i*y, id: (j+i*y)+"el", className: "el zelena"}, "2"));
				    } else if (r < 0.6) {
						polje.push(React.createElement("div", {key:j + i*y, id: (j+i*y)+"el", className: "el crvena"}, "3"));
				    } else {
						polje.push(React.createElement("div", {key:j + i*y, id: (j+i*y)+"el", className: "el"}));
					}
				} else {
					polje.push(React.createElement("div", {key:j + i*y, id: (j+i*y)+"el", className: "el zatvoreno"}));
				}
			}
		}
		return polje;
	}
	
	return (
	    <div className="ploca">
	        {generirajPlocu(nx, ny)}
	    </div>
	)
}

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

ReactDOM.render(
    <App1/>,
    cont
)

