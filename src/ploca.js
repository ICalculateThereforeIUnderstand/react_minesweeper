import React from "react";
import "./ploca.css";

function defaultFun() { console.log("kliknuo si ali nisi postavio funkciju2.")}

function Polje({tip="prazno", klikPolje=defaultFun, id="-1"}) {
	const [broj, setBroj] = React.useState("");
	const [klasa, setKlasa] = React.useState("polje");
	const [idOznaka] = React.useState(id);
	
	React.useEffect(()=>{
		switch (tip) {
			case "prazno":
			    setBroj("");
			    setKlasa("polje");
			    break;
			case "1":
			    setBroj("1");
			    setKlasa("polje plava");
			    break;
			case "2":
			    setBroj("2");
			    setKlasa("polje zelena");
			    break;
			case "3":
			    setBroj("3");
			    setKlasa("polje crvena");
			    break;
			case "4":
			    setBroj("4");
			    setKlasa("polje ljubicasta");
			    break;
			case "5":
			    setBroj("5");
			    setKlasa("polje zuta");
			    break;
			case "6":
			    setBroj("6");
			    setKlasa("polje pink");
			    break;
			case "7":
			    setBroj("7");
			    setKlasa("polje narancasta");
			    break;
			case "8":
			    setBroj("8");
			    setKlasa("polje narancasta");
			    break;
			case "zatvoreno":
			    setBroj("");
			    setKlasa("polje zatvoreno");
			    break;
			case "zastava":
			    setBroj("");
			    setKlasa("polje zatvoreno zastava");
			    break;
			case "mina":
			    setBroj("");
			    setKlasa("polje mina");
			    break;
			case "mina-crveno":
			    setBroj("");
			    setKlasa("polje mina crvena1");
			    break;
			default:
			    setBroj("-");
			    break;
		}
		
	}, [tip]);
	
	return (
	    <div className={klasa} onClick={(e)=>{klikPolje(e, idOznaka, true)}} onContextMenu={(e)=>{klikPolje(e, idOznaka, false)}}>
	        {broj}
	    </div>
	)
}

export function Ploca({polje=[], klikPolje=defaultFun}) {
	const [matrica, setMatrica] = React.useState([]);
	const [nx, setNx] = React.useState(0);
	const [ny, setNy] = React.useState(0);
	const r = React.useRef();
	
	React.useEffect(()=> {
		if (polje.length === 0) {
			setNx(0);
			setNy(0);
		} else {
			setNx(polje[0].length);
			setNy(polje.length);
			setMatrica(polje);
		}
			
	}, [polje]);
	
	React.useEffect(()=>{
		dodajStilove(r.current, {gridTemplateRows: "repeat(" + ny + ", 25px)", gridTemplateColumns: "repeat(" + nx + ", 25px)",
			                   height: (ny*(25+2)+1) + "px", width: (nx*(25+2)+1) + "px"});	
	}, [nx, ny]);
	
	function generirajElemente() {
		let poljee = [];
		let x = 0;
		let y = 0;
		if (matrica.length !== 0) {
			x = matrica[0].length;
			y = matrica.length;
		}
		
		for (let i = 0; i < y; i++) {
			for (let j = 0; j < x; j++) {
			    poljee.push(<Polje key={j+i*x} tip={matrica[i][j]} id={(j+i*x)+"el"} klikPolje={klikPolje}/>);
		    }
		}
		return poljee;
	}
	
	
    return (
	    <div className="ploca" ref={r}>
	        {generirajElemente(nx, ny)}
	    </div>
	)
	
}

export function Menu({klik=defaultFun}) {
	return (
	    <div id="menu">
	        <div className="menu-el" onClick={()=>{klik("beginner")}}>
	            <p>Beginner</p>
	        </div>
	        <div className="menu-el" onClick={()=>{klik("intermediate")}}>
	            <p>Intermediate</p>
	        </div>
	        <div className="menu-el" onClick={()=>{klik("expert")}}>
	            <p>Expert</p>
	        </div>
	        <div className="menu-el" onClick={()=>{klik("custom")}}>
	            <p>Custom</p>
	        </div>
	    </div>
	)
}

export function Forma({nx=9, ny=9, brMina=11, submitKlik=defaultFun}) {
	const [x, setX] = React.useState(nx);
	const [y, setY] = React.useState(ny);
	const [mineBr, setMineBr] = React.useState(brMina);
	
	function submitaj(e) {
		e.preventDefault();
		if (x > 0  &&  y > 0  &&  mineBr < x*y) {
		    submitKlik(x, y, mineBr);
		} else {
			setX(3);
			setY(3);
			setMineBr(3);
			submitKlik(3, 3, 3);
		}
	}
	
	function unesi(e, setFun) {
		let v = e.target.value;
		console.log("unos:" + v + "      /   " + Math.random());
		console.log("posljednje slovo je " + v.substr(-1));
		switch (v.substr(-1)) {
			case "0":
			case "1":
			case "2":
			case "3":
			case "4":
			case "5":
			case "6":
			case "7":
			case "8":
			case "9":
			case "":
			    setFun(v);
			    break;
		}
	}
	
	return (
	    <form id="forma" onSubmit={submitaj}>
	        <div id="forma-div">
	            <div className="forma-el">
	                <label className="forma-el-label" htmlFor="width">Width:</label>
	                <input type="text" id="width" maxlength="4" className="input" name="sirina" value={x} onChange={(e)=>{unesi(e, setX)}}/>
	            </div>
	            <div className="forma-el">
	                <label className="forma-el-label" htmlFor="height">Height:</label>
	                <input type="text" id="height" maxlength="4" className="input" name="visina" value={y} onChange={(e)=>{unesi(e, setY)}}/>
	            </div>
	            <div className="forma-el">
	                <label className="forma-el-label" htmlFor="mines">Mines:</label>
	                <input type="text" id="mines" maxlength="3" className="input" name="mine" value={mineBr} onChange={(e)=>{unesi(e, setMineBr)}}/>
	            </div>
	            <div className="forma-el">
	                <button type="submit">Update</button>
	            </div>
	        </div>  
	    </form>  
	    
	)
}

function dodajStilove(el, stilovi) {
    for (let key in stilovi) {
	    el.style[key] = stilovi[key];
	}
}
