import React from "react";
import { BsEmojiSmile, BsEmojiSunglasses, BsEmojiFrown } from "react-icons/bs";
import "./gumb.css"

class pomocna {
	constructor(r, r1, klik) {
		this.r = r;
		this.r1 = r1;
		this.klikFun = klik;
		
		this.klik = this.klik.bind(this);
	}
	
	klik() {
		//dodajStilove(this.r.current, {borderLeft: "2px solid #555", borderTop: "2px solid #555"});
		this.r.current.classList.remove("otpusten");
		this.r.current.classList.add("pritisnut");
		this.r1.current.style.transform = "translate(3%, 3%)";
		this.klikFun();
		
		setTimeout(()=>{
			this.r.current.classList.remove("pritisnut");
		    this.r.current.classList.add("otpusten");
		    this.r1.current.style.transform = "translate(0%, 0%)";
		}, 200);
	}
}

export function Gumb({klik=defaultFun, emojiState=2}) {
	// za emojiState 0 dan je nasmijeseni emoji, za 1 je nezadovoljni gubitnicki emoji za 2 je sunglasses-emoji
	const r = React.useRef();
	const r1 = React.useRef();
	const r2 = React.useRef();
	const r3 = React.useRef();
	const p = new pomocna(r, r1, klik);
	
	React.useEffect(()=>{
		let sirina = parseFloat(window.getComputedStyle(r.current, null).getPropertyValue("width"));
		r1.current.style.display = "flex";
		r1.current.style.width = sirina + "px";
		r1.current.style.height = sirina + "px";
		
		r2.current.style.display = "none";
		r2.current.style.width = sirina + "px";
		r2.current.style.height = sirina + "px";
		
		r3.current.style.display = "none";
		r3.current.style.width = sirina + "px";
		r3.current.style.height = sirina + "px";
		
	}, []);
	
	React.useEffect(()=>{
		switch (emojiState) {
			case (0):
			    r1.current.style.display = "flex";
			    r2.current.style.display = "none";
			    r3.current.style.display = "none";
			    break;
			case (1):
			    r1.current.style.display = "none";
			    r2.current.style.display = "flex";
			    r3.current.style.display = "none";
			    break;
			case (2):
			    r1.current.style.display = "none";
			    r2.current.style.display = "none";
			    r3.current.style.display = "flex";
			    break;
			default:
			    console.log("POGRESKA, pogresan emojiState");
		}
		
	}, [emojiState]);  
	
	
	return (
	    <div ref={r} className="gumb otpusten" onClick={p.klik}>
            <div ref={r1} className="gumb-el">
	            <BsEmojiSmile className="emoji"/>
	        </div>
            <div ref={r2} className="gumb-el">
	            <BsEmojiFrown className="emoji"/>
	        </div>
            <div ref={r3} className="gumb-el">
	            <BsEmojiSunglasses className="emoji"/>
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
