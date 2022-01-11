import React from "react";
import "./ploca.css";

function defaultFun() { console.log("kliknuo si ali nisi postavio funkciju2.")}

function Polje({tip="prazno", klikPolje=defaultFun, id="-1"}) {
	const [broj, setBroj] = React.useState("");
	const [klasa, setKlasa] = React.useState("polje");
	const [idOznaka] = React.useState(id);
	const [krizicSw, setKrizicSw] = React.useState(false);
	
	React.useEffect(()=>{
		switch (tip) {
			case "prazno":
			    setBroj("");
			    setKrizicSw(false);
			    setKlasa("polje");
			    break;
			case "1":
			    setBroj("1");
			    setKrizicSw(false);
			    setKlasa("polje plava");
			    break;
			case "2":
			    setBroj("2");
			    setKrizicSw(false);
			    setKlasa("polje zelena");
			    break;
			case "3":
			    setBroj("3");
			    setKrizicSw(false);
			    setKlasa("polje crvena");
			    break;
			case "4":
			    setBroj("4");
			    setKrizicSw(false);
			    setKlasa("polje ljubicasta");
			    break;
			case "5":
			    setBroj("5");
			    setKrizicSw(false);
			    setKlasa("polje zuta");
			    break;
			case "6":
			    setBroj("6");
			    setKrizicSw(false);
			    setKlasa("polje pink");
			    break;
			case "7":
			    setBroj("7");
			    setKrizicSw(false);
			    setKlasa("polje narancasta");
			    break;
			case "8":
			    setBroj("8");
			    setKrizicSw(false);
			    setKlasa("polje narancasta");
			    break;
			case "zatvoreno":
			    setBroj("");
			    setKrizicSw(false);
			    setKlasa("polje zatvoreno");
			    break;
			case "zastava":
			    setBroj("");
			    setKrizicSw(false);
			    setKlasa("polje zatvoreno zastava");
			    break;
			case "mina":
			    setBroj("");
			    setKrizicSw(false);
			    setKlasa("polje mina");
			    break;
			case "mina-crveno":
			    setBroj("");
			    setKrizicSw(false);
			    setKlasa("polje mina crvena1");
			    break;
			case "krizic":
			    setBroj("");
			    setKrizicSw(true);
			    setKlasa("polje zatvoreno");
			    break;
			default:
			    setBroj("-");
			    break;
		}
		
	}, [tip]);
	
	return (
	    <div className={klasa} onClick={(e)=>{klikPolje(e, idOznaka, true)}} onContextMenu={(e)=>{klikPolje(e, idOznaka, false)}}>
	        {broj}
	        {krizicSw ? <Krizic/> : null}
	    </div>
	)
}

function Krizic() {
	return (
	    <div className="krizic">
	        <div className="krizic-el1">
	        </div>
            <div className="krizic-el2">
	        </div>
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
	    <div className="ploca" ref={r} onContextMenu={(e)=>{e.preventDefault()}}>
	        {generirajElemente(nx, ny)}
	    </div>
	)
	
}

export function Menu({klik=defaultFun, guessModeKlik=defaultFun}) {
	const [sw, setSw] = React.useState(false);
	
	function checkboxToggle() {
		setSw((prevSw) => {if (prevSw) {return false}; return true; })
	}
	
	React.useEffect(()=>{
		console.log("Novi prekidac je " + sw + "   " + Math.random());
		guessModeKlik(sw)
	}, [sw]);
	
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
	        <div className="menu-el1">
	            <form className="menu-el-form">
	                <label>Guess mode</label>
	                <input type="checkbox" onChange={checkboxToggle}/>
	            </form>
	        </div>
	    </div>
	)
}

export function Forma({nx=9, ny=9, brMina=11, submitKlik=defaultFun, hideSw=false}) {
	const [x, setX] = React.useState(nx);
	const [y, setY] = React.useState(ny);
	const [mineBr, setMineBr] = React.useState(brMina);
	const [porukaSw, setPorukaSw] = React.useState(false);
	const r = React.useRef();
	const r1 = React.useRef();
	const r2 = React.useRef();
	const r3 = React.useRef();
	const r4 = React.useRef();
	let rOdabrano = React.useRef();
	
	React.useEffect(()=>{
		setX(nx);
		setY(ny);
		setMineBr(brMina);
	}, [nx, ny, brMina]);
	
	React.useEffect(()=>{
		if (hideSw) {
			r.current.style.display = "none";
			setPorukaSw(false);
		} else {
			r.current.style.display = "block";
		}
	}, [hideSw]);
	
	React.useEffect(()=>{
		if (porukaSw) {
			let el = rOdabrano.current.getBoundingClientRect();
            let bottom = el.bottom;
            let left = el.left;
            
            console.log("left/bottom OFFSET je " + left + " / " + bottom);
            
            dodajStilove(r1.current, {position: "fixed", top: bottom+"px", left: left+50+"px", backgroundColor: "#5c5c5e", height: "80px", 
				                      width: "300px", display: "block", borderRadius: "5px", color: "white", display: "flex", alignItems: "center",
				                      padding: "0px 20px 0px 20px", fontFamily: "sans-serif", zIndex: 2});
            
            
		} else {
			r1.current.style.display = "none";
		}
	}, [porukaSw]);
	
	function submitaj(e) {
		e.preventDefault();
		
		if (x < 1) {
			r1.current.innerHTML = "Please select value that is greater then 0.";
			rOdabrano.current = r2.current;
			setPorukaSw(true);
			return null;
		}
		
		if (y < 1) {
			r1.current.innerHTML = "Please select value that is greater then 0";
			rOdabrano.current = r3.current;
			setPorukaSw(true);
			return null;
		}
		
		if (mineBr < 1) {
			r1.current.innerHTML = "Please select value that is greater then 0";
			rOdabrano.current = r4.current;
			setPorukaSw(true);
			return null;
		}
		
		if (x > 80) {
			r1.current.innerHTML = "Please select value that is no more then 80";
			rOdabrano.current = r2.current;
			setPorukaSw(true);
			return null;
		}
		
		if (y > 80) {
			r1.current.innerHTML = "Please select value that is greater then 80";
			rOdabrano.current = r3.current;
			setPorukaSw(true);
			return null;
		}
		
		if (mineBr >= x*y) {
			r1.current.innerHTML = "Please select value that is smaller then " + (x*y);
			rOdabrano.current = r4.current;
			setPorukaSw(true);
			return null;
		}
		
		setPorukaSw(false);
		submitKlik(x, y, mineBr);
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
	    <form id="forma" onSubmit={submitaj} ref={r}>
	        <div id="forma-div">
	            <div className="forma-el" ref={r2}>
	                <label className="forma-el-label" htmlFor="width">Width:</label>
	                <input type="text" id="width" maxlength="2" className="input" name="sirina" value={x} onChange={(e)=>{unesi(e, setX)}}/>
	            </div>
	            <div className="forma-el" ref={r3}>
	                <label className="forma-el-label" htmlFor="height">Height:</label>
	                <input type="text" id="height" maxlength="2" className="input" name="visina" value={y} onChange={(e)=>{unesi(e, setY)}}/>
	            </div>
	            <div className="forma-el" ref={r4}>
	                <label className="forma-el-label" htmlFor="mines">Mines:</label>
	                <input type="text" id="mines" maxlength="3" className="input" name="mine" value={mineBr} onChange={(e)=>{unesi(e, setMineBr)}}/>
	            </div>
	            <div className="forma-button">
	                <button type="submit">Update</button>
	            </div>
	        </div> 
	        <div className="forma-poruka" ref={r1} onClick={()=>{setPorukaSw(false)}}>
	        </div> 
	    </form>  
	    
	)
}

function dodajStilove(el, stilovi) {
    for (let key in stilovi) {
	    el.style[key] = stilovi[key];
	}
}
