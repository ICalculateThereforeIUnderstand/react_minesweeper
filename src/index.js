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
			brMina: 11,
			brPreostalihMina: 0
		}
		
		this.mina = this.mina.bind(this);
		this.brSusjednihMina = this.brSusjednihMina.bind(this);
		this.inicirajPolje = this.inicirajPolje.bind(this);
		this.kliknutoPolje = this.kliknutoPolje.bind(this);
		this.kliknutoPolje1 = this.kliknutoPolje1.bind(this);
		this.vratiDisplay = this.vratiDisplay.bind(this);
		this.vratiPraznaSusjednaPolja = this.vratiPraznaSusjednaPolja.bind(this);
		this.praznoPoljeSw = this.praznoPoljeSw.bind(this);
		this.nadodajPolje = this.nadodajPolje.bind(this);
	}
	
	componentDidMount() {
		this.inicirajPolje();
		//setInterval(()=>{this.inicirajPolje();}, 5000);
	}
	
	praznoPoljeSw(polje, x, y) {
		//console.log("ispitujemo " + x + " - " + y);
		
		if (x < 0 || x >= this.state.nx) return false;
		if (y < 0 || y >= this.state.ny) return false;
		
		
		if (polje[y][x] == "prazno")  return true;
		return false;
	}
	
	nadodajPolje(rez, polje, x, y) {
		if (x >= 0  &&  x < this.state.nx  &&  y >= 0  &&  y < this.state.ny  &&  polje[y][x] !== "prosao") {
		    rez.push([x, y]);
		    polje[y][x] = "prosao";
		}
	}
	
	vratiPraznaSusjednaPolja(x, y) {
		let pp = [[x, y]];
		//console.log("(" + x + "," + y + ")");
		let polje = JSON.parse(JSON.stringify(this.state.polje));
		let rez = [[x,y]];
		polje[y][x] = "prosao";
		while (pp.length !== 0) {
            let [x1, y1] = pp.shift();		
            
            if (false) {
            if (this.praznoPoljeSw(polje, x1-1, y1)) { polje[y1][x1-1] = "prosao"; rez.push([x1-1, y1]); pp.push([x1-1, y1]); }
            if (this.praznoPoljeSw(polje, x1+1, y1)) { polje[y1][x1+1] = "prosao"; rez.push([x1+1, y1]); pp.push([x1+1, y1]); }
            if (this.praznoPoljeSw(polje, x1, y1-1)) { polje[y1-1][x1] = "prosao"; rez.push([x1, y1-1]); pp.push([x1, y1-1]); }
            if (this.praznoPoljeSw(polje, x1, y1+1)) { polje[y1+1][x1] = "prosao"; rez.push([x1, y1+1]); pp.push([x1, y1+1]); }
		    } else {
			// u pp polje nadodajemo samo susjedna prazna polja
			if (this.praznoPoljeSw(polje, x1-1, y1)) { pp.push([x1-1, y1]); }
            if (this.praznoPoljeSw(polje, x1+1, y1)) { pp.push([x1+1, y1]); }
            if (this.praznoPoljeSw(polje, x1, y1-1)) { pp.push([x1, y1-1]); }
            if (this.praznoPoljeSw(polje, x1, y1+1)) { pp.push([x1, y1+1]); }
            if (this.praznoPoljeSw(polje, x1-1, y1-1)) { pp.push([x1-1, y1-1]); }
            if (this.praznoPoljeSw(polje, x1-1, y1+1)) { pp.push([x1-1, y1+1]); }
            if (this.praznoPoljeSw(polje, x1+1, y1-1)) { pp.push([x1+1, y1-1]); }
            if (this.praznoPoljeSw(polje, x1+1, y1+1)) { pp.push([x1+1, y1+1]); }
            
            // u rez nadodajemo i prazna polja i susjedna polja sa brojevima
            this.nadodajPolje(rez, polje, x1-1, y1);
            this.nadodajPolje(rez, polje, x1+1, y1);
            this.nadodajPolje(rez, polje, x1, y1-1);
            this.nadodajPolje(rez, polje, x1, y1+1);
         
            this.nadodajPolje(rez, polje, x1-1, y1-1);
            this.nadodajPolje(rez, polje, x1+1, y1-1);
            this.nadodajPolje(rez, polje, x1-1, y1+1);
            this.nadodajPolje(rez, polje, x1+1, y1+1);
            
			}
		}
		
		return rez;
	}
	
	kliknutoPolje1(e) {
		let poz = parseInt(e);
		let x = poz % this.state.nx;
		let y = Math.floor(poz / this.state.nx);
		console.log("kliknuo si polje (" + x + ", " + y + ")  "  +  this.state.polje[y][x]);
		
		if (this.state.polje[y][x] == "prazno") {
			console.log("polje je prazno... " + Math.random());
			
			let rez = this.vratiPraznaSusjednaPolja(x, y);
			//let pp = this.state.poljeSw;
			let pp = JSON.parse(JSON.stringify(this.state.poljeSw));
			for (let i = 0; i < rez.length; i++) {
				pp[ rez[i][1] ][ rez[i][0] ] = "otvoreno";
				console.log("otvaramo " + rez[i][0] + ", " + rez[i][1]);
			}
			
			this.setState((prevState) => {return {poljeSw: pp, poljeDisplay: this.vratiDisplay(prevState.polje, pp)}});
			
			console.log("Popis praznih polja: ");
			for (let i = 0; i < -1*rez.length; i++) {
				console.log("(" + rez[i][0] + "," + rez[i][1] + ")");
			}
		} else {
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
				if (Math.random() < 1.5) {
				    //ppp.push("otvoreno");
				    ppp.push("zatvoreno");
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
	            <Povrsina polje={this.state.poljeDisplay} brMina={this.state.brPreostalihMina} klikPolje={this.kliknutoPolje1} klikStart={this.inicirajPolje}/>
	        </div>
		)
	}
}

ReactDOM.render(
    <App/>,
    cont
)

