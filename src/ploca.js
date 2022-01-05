import React from "react";
import "./ploca.css";


function Polje({tip="prazno"}) {
	const [broj, setBroj] = React.useState("");
	const [klasa, setKlasa] = React.useState("polje");
	
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
	    <div className={klasa}>
	        {broj}
	    </div>
	)
}


export function Ploca({x=10, y=10}) {
	const [nx, setNx] = React.useState(x);
	const [ny, setNy] = React.useState(y);
	const [matrica, setMatrica] = React.useState([]);
	const [brMina] = React.useState(30);
	
	React.useEffect(()=>{
		let pp1 = [];
		for (let i = 0; i < y; i++) {
			let pp = [];
			for (let j = 0; j < x; j++) {
				pp.push("prazno");
		    }	
		    pp1.push(pp);
		}
		
		
		// postavljamo mine
		for (let i = 0; i < brMina; i++) {
			let uvjet = true;
			while (uvjet) {
			    var pozx = Math.floor(Math.random()*nx);
			    var pozy = Math.floor(Math.random()*ny);
			    if (pp1[pozy][pozx] === "prazno")  uvjet = false;
			}
			pp1[pozy][pozx] = "mina";
		}
		
		// postavljamo brojeve
	    for (let i = 0; i < y; i++) {
			for (let j = 0; j < x; j++) {
				if (pp1[i][j] !== "mina") {
				    let brr = brSusjednihMina(j, i, pp1);
				    if (brr !== 0)  pp1[i][j] = brr.toString();
				}
			}
		}
		
		
		
		setMatrica(pp1);
		
		
	}, []);
	
	function mina(x, y, mat) {
		if (mat[y][x] === "mina") return 1;
		return 0;
	}
	function brSusjednihMina(x, y, mat) {
		if (x > 0) {
		    if (x !== nx-1) {
				if (y > 0) {
					if (y !== ny-1) {
						return mina(x-1,y-1,mat)+mina(x,y-1,mat)+mina(x+1,y-1,mat)+mina(x-1,y,mat)+mina(x+1,y,mat)+mina(x-1,y+1,mat)+mina(x,y+1,mat)+mina(x+1,y+1,mat);
					} else {
						return mina(x-1,y-1,mat)+mina(x,y-1,mat)+mina(x+1,y-1,mat)+mina(x-1,y,mat)+mina(x+1,y,mat);
					}
				} else {
					return mina(x-1,y,mat)+mina(x+1,y,mat)+mina(x-1,y+1,mat)+mina(x,y+1,mat)+mina(x+1,y+1,mat);
				}
			} else {
				if (y > 0) {
					if (y !== ny-1) {
						return mina(x-1,y-1,mat)+mina(x,y-1,mat)+mina(x-1,y,mat)+mina(x-1,y+1,mat)+mina(x,y+1,mat);
					} else {
						return mina(x-1,y-1,mat)+mina(x,y-1,mat)+mina(x-1,y,mat);
					}
				} else {
					return mina(x-1,y,mat)+mina(x-1,y+1,mat)+mina(x,y+1,mat);
				}
			}	
		} else { // x == 0
		    if (y > 0) {
				if (y !== ny-1) {
					return mina(x,y-1,mat)+mina(x+1,y-1,mat)+mina(x+1,y,mat)+mina(x,y+1,mat)+mina(x+1,y+1,mat);
				} else {
					return mina(x,y-1,mat)+mina(x+1,y-1,mat)+mina(x+1,y,mat);
				}
			} else {
				return mina(x+1,y,mat)+mina(x,y+1,mat)+mina(x+1,y+1,mat);
			}
		
		
	    }

			
	}
	
	function generirajPlocu(x, y) {
		let polje = [];
		for (let i = 0; i < x; i++) {
			for (let j = 0; j < y; j++) {
				if (Math.random() < 0.8) {
					let r = Math.random(); 
					if (r < 0.2 || true) {
				        //polje.push(React.createElement("div", {key:j + i*y, id: (j+i*y)+"el", className: "el plava"}, "1"));
				        //polje.push(React.createElement(Polje, {key:j + i*y, id: (j+i*y)+"el"}));
				        polje.push(<Polje key={j+i*y} tip="zastava" id={(j+i*y)+"el"}/>);
				    } else if (r < 0.4) {
						//polje.push(React.createElement("div", {key:j + i*y, id: (j+i*y)+"el", className: "el zelena"}, "2"));
						polje.push(<Polje key={j+i*y} tip="1"/>);
				    } else if (r < 0.6) {
						polje.push(<Polje key={j+i*y} tip="2"/>);
				    } else {
						polje.push(<Polje key={j+i*y} tip="3"/>);
					}
				} else {
					polje.push(<Polje key={j+i*y} tip="zatvoreno"/>);
				}
			}
		}
		return polje;
	}
	
	function generirajElemente() {
		let polje = [];
		let x = 0;
		let y = 0;
		if (matrica.length !== 0) {
			x = matrica[0].length;
			y = matrica.length;
		}
		
		for (let i = 0; i < y; i++) {
			for (let j = 0; j < x; j++) {
			    polje.push(<Polje key={j+i*x} tip={matrica[i][j]} id={(j+i*x)+"el"}/>);
		    }
		}
		return polje;
	}
	
	
	
	
	return (
	    <div className="ploca">
	        {/*generirajPlocu(nx, ny)*/}
	        {generirajElemente(nx, ny)}
	    </div>
	)
}
