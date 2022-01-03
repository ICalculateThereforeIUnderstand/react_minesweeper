import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
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

ReactDOM.render(
    <App/>,
    cont
)

function dodajStilove(el, stilovi) {
    for (let key in stilovi) {
	    el.style[key] = stilovi[key];
	}
}
