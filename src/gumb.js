import React from "react";
import { BsEmojiSmile } from "react-icons/bs";
import "./gumb.css"

class pomocna {
	constructor(r, r1, klik) {
		this.r = r;
		this.r1 = r1;
		this.klikFun = klik;
		
		this.klik = this.klik.bind(this);
	}
	
	klik() {
		console.log("upravo si kliknuo na funkciju... " + Math.random());
		//dodajStilove(this.r.current, {borderLeft: "2px solid #555", borderTop: "2px solid #555"});
		this.r.current.classList.remove("otpusten");
		this.r.current.classList.add("pritisnut");
		this.r1.current.style.transform = "translate(3%, 3%)";
		this.klikFun();
		
		setTimeout(()=>{
			this.r.current.classList.remove("pritisnut");
		    this.r.current.classList.add("otpusten");
		    this.r1.current.style.transform = "translate(0%, 0%)";
		}, 500);
	}
}

export function Gumb({klik=defaultFun}) {
	const r = React.useRef();
	const r1 = React.useRef();
	const p = new pomocna(r, r1, klik);
	
	React.useEffect(()=>{
		let sirina = parseFloat(window.getComputedStyle(r.current, null).getPropertyValue("width"));
		console.log("sirina gumba je " + sirina);
		r1.current.style.width = sirina + "px";
		r1.current.style.height = sirina + "px";
		r1.current.style.backgroundColor = "transparent";
	}, []);
	
	
	return (
	    <div ref={r} className="gumb otpusten" onClick={p.klik}>
            <div ref={r1} className="gumb-el">
	            <BsEmojiSmile className="emoji"/>
	        </div>
	    </div>
	)
}

function dodajStilove(el, stilovi) {
    for (let key in stilovi) {
	    el.style[key] = stilovi[key];
	}
}

function defaultFun() { console.log("kliknuo si GUMB, ali nisi postavio funkciju.")}
