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
	    <div className={klasa} onClick={()=>{klikPolje(idOznaka)}}>
	        {broj}
	    </div>
	)
}

export function Ploca({polje=[], klikPolje=defaultFun}) {
	const [matrica, setMatrica] = React.useState([]);
	const [nx, setNx] = React.useState(0);
	const [ny, setNy] = React.useState(0);
	
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
	    <div className="ploca">
	        {generirajElemente(nx, ny)}
	    </div>
	)
	
}
