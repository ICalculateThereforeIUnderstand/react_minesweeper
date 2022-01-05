import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Gumb} from "./gumb.js";
import { Ploca } from "./ploca.js";
import { DigitalniBrojac } from "./digitalniBrojac.js";

let cont = document.querySelector("#cont");


function Povrsina({polje=[], brMina=0, klikPolje=defaultFun, klikStart=defaultFun}) {
	const [matrica, setMatrica] = React.useState(polje);
	
	React.useEffect(()=>{
		setMatrica(polje);
	}, [polje]);
	
	
	return (
	    <div id="povrsina">
	        <div id="povrsina-el">
	            <div id="povrsina-el-el">
	                <DigitalniBrojac sirina="60px" broj={brMina}/>
	                <Gumb klik={klikStart}/>
	                <DigitalniBrojac sirina="60px" broj={456}/>
	            </div>    
	        </div>
	        <div id="povrsina-el1">
	            <Ploca polje={polje} klikPolje={klikPolje}/>
	        </div>
	    </div>
	)
}

function defaultFun() { console.log("kliknuo si ali nisi postavio funkciju.")}

class App extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			polje: [],          //  zadaje razmjestaj mina i brojeva
			poljeSw: [],        //  sadrzi informacije o statusu polja, da li je otvoreno/zatvoreno/oznaceno zastavicom
			poljeDisplay: [],   //  kombinira podatke iz polje i poljeSw te definira trenutni display
			nx: 11,
			ny: 9,
			brMina: 30,
			brPreostalihMina: 0
		}
		
		this.mina = this.mina.bind(this);
		this.brSusjednihMina = this.brSusjednihMina.bind(this);
		this.inicirajPolje = this.inicirajPolje.bind(this);
		this.kliknutoPolje = this.kliknutoPolje.bind(this);
		this.vratiDisplay = this.vratiDisplay.bind(this);
	}
	
	componentDidMount() {
		this.inicirajPolje();
		//setInterval(()=>{this.inicirajPolje();}, 5000);
	}
		
	kliknutoPolje(e) {
		let poz = parseInt(e);
		let x = poz % this.state.nx;
		let y = Math.floor(poz / this.state.nx);
		
		this.setState((prevState)=> {
		    let p = prevState.poljeSw[y][x];
		    switch (p) {
				case "zatvoreno":
				    p = "zastava";
				    break;
				case "zastava":
				    p = "otvoreno";
				    break;
				case "otvoreno":
				    p = "zatvoreno";
				    break;
				default:
				    console.log("Dogodila se nekakva POGRESKA...");
				    break;
			}
			prevState.poljeSw[y][x] = p;
			
			return {poljeSW: prevState.poljeSw, poljeDisplay: this.vratiDisplay(prevState.polje, prevState.poljeSw)};
			
		})
		
	}
	
	inicirajPolje() {
		let pp1 = [];
		let pp2 = [];
		for (let i = 0; i < this.state.ny; i++) {
			let pp = [];
			let ppp = [];
			for (let j = 0; j < this.state.nx; j++) {
				pp.push("prazno");
				if (Math.random() < 0.5) {
				    ppp.push("otvoreno");
				} else {
					if (Math.random() < 0.3) {
					    ppp.push("zastava");
				    } else {
					    ppp.push("zatvoreno");
					}
				}
		    }	
		    pp1.push(pp);
		    pp2.push(ppp);
		}
		
		// postavljamo mine
		for (let i = 0; i < this.state.brMina; i++) {
			let uvjet = true;
			while (uvjet) {
			    var pozx = Math.floor(Math.random()*this.state.nx);
			    var pozy = Math.floor(Math.random()*this.state.ny);
			    if (pp1[pozy][pozx] === "prazno")  uvjet = false;
			}
			pp1[pozy][pozx] = "mina";
		}
		
		// postavljamo brojeve
	    for (let i = 0; i < this.state.ny; i++) {
			for (let j = 0; j < this.state.nx; j++) {
				if (pp1[i][j] !== "mina") {
				    let brr = this.brSusjednihMina(j, i, pp1);
				    if (brr !== 0)  pp1[i][j] = brr.toString();
				}
			}
		}
		
		this.setState((prevState)=>{return {...prevState, brPreostalihMina: prevState.brMina, polje: pp1, 
			                                poljeDisplay: this.vratiDisplay(pp1, pp2), poljeSw: pp2}});
	}
	
	vratiDisplay(polje, poljeSw) {
		let dulj1 = polje.length;
		let dulj2 = polje[0].length;
		let rez = [];
		for (let i = 0; i < dulj1; i++) {
			let re = [];
			for (let j = 0; j < dulj2; j++) {
				let tt = poljeSw[i][j];
				if (tt === "otvoreno") {
					re.push(polje[i][j]);
				} else if (tt === "zatvoreno") {
					re.push("zatvoreno");
				} else if (tt === "zastava") {
					re.push("zastava");
				}
			}
			rez.push(re);
		}
		return rez;
	}
	
	mina(x, y, mat) {
		if (mat[y][x] === "mina") return 1;
		return 0;
	}
	
	brSusjednihMina(x, y, mat) {
		if (x > 0) {
		    if (x !== this.state.nx-1) {
				if (y > 0) {
					if (y !== this.state.ny-1) {
						//return 0;
						return this.mina(x-1,y-1,mat)+this.mina(x,y-1,mat)+this.mina(x+1,y-1,mat)+this.mina(x-1,y,mat)+this.mina(x+1,y,mat)+this.mina(x-1,y+1,mat)+this.mina(x,y+1,mat)+this.mina(x+1,y+1,mat);
					} else {
						//return 0;
						return this.mina(x-1,y-1,mat)+this.mina(x,y-1,mat)+this.mina(x+1,y-1,mat)+this.mina(x-1,y,mat)+this.mina(x+1,y,mat);
					}
				} else {
					//return 0;
					return this.mina(x-1,y,mat)+this.mina(x+1,y,mat)+this.mina(x-1,y+1,mat)+this.mina(x,y+1,mat)+this.mina(x+1,y+1,mat);
				}
			} else {
				if (y > 0) {
					if (y !== this.state.ny-1) {
						//return 0;
						return this.mina(x-1,y-1,mat)+this.mina(x,y-1,mat)+this.mina(x-1,y,mat)+this.mina(x-1,y+1,mat)+this.mina(x,y+1,mat);
					} else {
						//return 0;
						return this.mina(x-1,y-1,mat)+this.mina(x,y-1,mat)+this.mina(x-1,y,mat);
					}
				} else {
					//return 0;
					return this.mina(x-1,y,mat)+this.mina(x-1,y+1,mat)+this.mina(x,y+1,mat);
				}
			}	
		} else { // x == 0
		    if (y > 0) {
				if (y !== this.state.ny-1) {
					//return 0;
					return this.mina(x,y-1,mat)+this.mina(x+1,y-1,mat)+this.mina(x+1,y,mat)+this.mina(x,y+1,mat)+this.mina(x+1,y+1,mat);
				} else {
					//return 0;
					return this.mina(x,y-1,mat)+this.mina(x+1,y-1,mat)+this.mina(x+1,y,mat);
				}
			} else {
				//return 0;
				return this.mina(x+1,y,mat)+this.mina(x,y+1,mat)+this.mina(x+1,y+1,mat);
			}
		
		
	    }

			
	}
	
	render() {
		return (
		    <div className="pokus">
	            <Povrsina polje={this.state.poljeDisplay} brMina={this.state.brPreostalihMina} klikPolje={this.kliknutoPolje} klikStart={this.inicirajPolje}/>
	        </div>
		)
	}
}

ReactDOM.render(
    <App/>,
    cont
)

