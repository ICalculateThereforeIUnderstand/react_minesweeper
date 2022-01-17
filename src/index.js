import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Gumb} from "./gumb.js";
import { Ploca, Menu, Forma } from "./ploca.js";
import { DigitalniBrojac } from "./digitalniBrojac.js";

let cont = document.querySelector("#cont");

window.onload = function() {
	document.addEventListener("keydown", (e) => {pritisakGumba(e)});
	let ell = document.querySelector("html");
	function pritisakGumba(e) {
		if (e.code === "KeyS") {
			console.log("sirina/visina prozora su " + ell.clientWidth + " / " + ell.clientHeight);
			console.log(Math.random());
		}
	}
}


function Povrsina({skalniFaktor=1, polje=[], brMina=0, brSec=0, klikPolje=defaultFun, klikStart=defaultFun, emojiState=0, hoverSw=false}) {
	const [matrica, setMatrica] = React.useState(polje);
	const [x, setX] = React.useState(0);
	const [y, setY] = React.useState(0);
	const [sw, setSw] = React.useState(true);
	const [sw1, setSw1] = React.useState(true);
	const r = React.useRef();
	const r1 = React.useRef();
	//const r2 = React.useRef();
	const r3 = React.useRef();
	
	React.useEffect(()=>{
		
		let st = window.getComputedStyle(r.current);
		let vis = parseFloat(st.getPropertyValue('height'));
		let sir = parseFloat(st.getPropertyValue('width'));
		let visFak = -1*(1-skalniFaktor)*vis/2;
		let sirFak = -1*(1-skalniFaktor)*sir/2;
		
		dodajStilove(r.current, {transform: "scale(" + skalniFaktor + "," + skalniFaktor + ")", top: visFak + "px", left: sirFak + "px"});
		
		st = window.getComputedStyle(r.current);
		vis = parseFloat(st.getPropertyValue('top'));
		sir = parseFloat(st.getPropertyValue('left'));
		
	}, [skalniFaktor, x, y]);
	
	React.useEffect(()=>{
		setMatrica(polje);
		
		let ny = polje.length;
		let nx = 10;
		if (ny !== 0)  nx = polje[0].length;
		setX(nx);
		setY(ny);
		
		if (nx < 6) {
			setSw(false);
			if (nx < 2) {
			    setSw1(false);	
			} else {
				setSw1(true);
			}
		} else {
			setSw(true);
			setSw1(true);
		}
		
		dodajStilove(r.current, {height: (ny*27 + 120) + "px", width: (nx*27 + 40) + "px", backgroundColor: "yellow"});
		dodajStilove(r1.current, {height: (ny*27 + 120 - 80) + "px"});
		
	}, [polje]);
	
	return (
	    <div id="povrsina" ref={r}>
	        <div id="povrsina-el">	            
	            {sw ? 
					<div id="povrsina-el-el">
					    <DigitalniBrojac sirina="60px" broj={brMina}/>
					    <Gumb klik={klikStart} emojiState={emojiState}/>
	                    <DigitalniBrojac sirina="60px" broj={brSec}/> 
					</div> : 
					    <>
			            {sw1 ? 
							<div id="povrsina-el-el" onClick={klikStart}>
							    <DigitalniBrojac sirina="60px" broj={brMina}/>
							</div> :
							<div id="povrsina-el-el">
							    <Gumb klik={klikStart} emojiState={emojiState}/>
							</div>
						}
                        </>						
				}
	        </div>
	        <div id="povrsina-el1" ref={r1}>
	            <Ploca polje={polje} klikPolje={klikPolje} hoverSw={hoverSw}/>
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
			brPreostalihMina: 0, 
			brPreostalihPolja: 0,      // broj neoznacenih i neotvorenih polje
			prviKlikSw: false,         // postavljamo na true kada igrac klikne prvi put na polje
			brSec: 0,                  // brojac sekundi
			emojiState: 0,             // za 0/1/2 zadajemo sretnog/gubitnickog/pobjednickog emojia
			gameOverSw: false,         // za true igra je zaustavljena
			formaHideSw: false,         // za true skriva dropdown input formu
			noGuessSw: false,           // za true oznacava pocetno polje
			skalniFaktor: 1,            // za 1 je display u normalnoj velicini
			hoverCapabilitySw: this.hoverCapability("hoverTest")
		}
		
		if (this.hoverCapability("hoverTest")) {
			console.log("Ovaj uredaj ima hover sposobnosti.");
	    } else {
			console.log("Ovaj uredaj NEMA hover sposobnosti.");
		}
		
		this.timerRef = null;
		
		this.mina = this.mina.bind(this);
		this.brSusjednihMina = this.brSusjednihMina.bind(this);
		this.inicirajPolje = this.inicirajPolje.bind(this);
		this.kliknutoPolje = this.kliknutoPolje.bind(this);
		this.vratiDisplay = this.vratiDisplay.bind(this);
		this.vratiPraznaSusjednaPolja = this.vratiPraznaSusjednaPolja.bind(this);
		this.praznoPoljeSw = this.praznoPoljeSw.bind(this);
		this.nadodajPolje = this.nadodajPolje.bind(this);
		this.inicirajTimer = this.inicirajTimer.bind(this);
		this.gameOver = this.gameOver.bind(this);
		this.gameOverPobjeda = this.gameOverPobjeda.bind(this);
		this.kliknutiMenu = this.kliknutiMenu.bind(this);
		this.formaPostaviParametre = this.formaPostaviParametre.bind(this);
		this.pronadiRandomPraznoPolje = this.pronadiRandomPraznoPolje.bind(this);
		this.postaviNoGuessMode = this.postaviNoGuessMode.bind(this);
		this.postaviSkalniFaktor = this.postaviSkalniFaktor.bind(this);
		this.hoverCapability = this.hoverCapability.bind(this);
	}
	
	hoverCapability(id) {
    // ova funkcija provjerava da li uredaj ima hover sposobnosti, id je id testnog div elementa kojem media query mjenja boju ovisno o hover sposobnosti
	    if (window.getComputedStyle(document.querySelector("#"+id)).getPropertyValue("background-color") == "rgb(0, 0, 0)")  return true;
	    return false;
    }
	
	componentDidMount() {
		this.inicirajPolje();
		//setInterval(()=>{this.inicirajPolje();}, 5000);
	}
	
	inicirajTimer() {
		if (this.timerRef !== null) {
		    clearInterval(this.timerRef);
	    }
		
		this.setState({brSec: 0});
	    this.timerRef = setInterval(()=>{this.setState((prevState)=>{return {brSec: prevState.brSec + 1}})}, 1000);
		
	}
	
	praznoPoljeSw(polje, x, y) {
		
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
	
	kliknutoPolje(event, e, sw) {
		event.preventDefault();
		if (this.state.gameOverSw)  return null; // nema klika, igra je zaustavljena
		
		if (sw) {
			console.log("Upravo si kliknuo lijevi gumb. " + Math.random());
		} else {
			console.log("Upravo si kliknuo desni gumb. " + Math.random());
		}
		let poz = parseInt(e);
		let x = poz % this.state.nx;
		let y = Math.floor(poz / this.state.nx);
		console.log("kliknuo si polje (" + x + ", " + y + ")  "  +  this.state.polje[y][x]);
				
		if (!this.state.prviKlikSw) {
			if (this.state.noGuessSw) {  // no-guess mode je aktivan, prvi klik mora biti na krizic i to lijevim gumbom misa
			    if (sw && this.state.poljeSw[y][x] == "krizic") {
			        this.setState({prviKlikSw: true});
			    } else {
				    return null;  // prvim klikom nismo kliknuli na krizic, klik se ignorira
			    }
		    }
			
			
			
			//this.state.prviKlikSw = true;
			this.setState({prviKlikSw: true})
			this.inicirajTimer();
		}
		
		if (this.state.poljeSw[y][x]  === "otvoreno")  return null; // klik na otvoreno polje, nista se ne dogada
		
		if (!sw) {  // postavljamo/uklanjamo zastavicu
			let brPre = null;
			this.setState((prevState)=>{ 
				let brZas = prevState.brPreostalihMina;
				brPre = prevState.brPreostalihPolja;
				if (prevState.poljeSw[y][x] === "krizic") {
					return null;  //  desni klik na krizic se ignorira
				} else if (prevState.poljeSw[y][x] === "zatvoreno") {
					prevState.poljeSw[y][x] = "zastava";
					brZas--;
					brPre--;
				} else {
					prevState.poljeSw[y][x] = "zatvoreno";
					brZas++;
					brPre++;
				}
				//console.log("Broj PREOSTALIH polja je " + brPre);
				if (brPre == 0)  this.gameOverPobjeda();
				return {poljeSw: prevState.poljeSw, poljeDisplay: this.vratiDisplay(prevState.polje, prevState.poljeSw), 
					    brPreostalihMina: brZas, brPreostalihPolja: brPre};
			})
			
			if (false && brPre == 0) {
				this.gameOverPobjeda();
			}
			return null; 
		} else if (this.state.poljeSw[y][x] == "zastava"){  // slucaj klika lijevim gumbom na zastavu
			return null;
		}
		
		// ovdje program dolazi ako se radi o kliku lijevim gumbom misa na zatvoreno polje
		if (this.state.polje[y][x] == "prazno") {
			
			let rez = this.vratiPraznaSusjednaPolja(x, y);
			let brPre = this.state.brPreostalihPolja;
			
			//let pp = this.state.poljeSw;
			let pp = JSON.parse(JSON.stringify(this.state.poljeSw));
			let brNeotvorenih = 0;
			let korekcijaBrMina = 0;
			for (let i = 0; i < rez.length; i++) {
				if (pp[ rez[i][1] ][ rez[i][0] ] !== "otvoreno") {
					if (pp[ rez[i][1] ][ rez[i][0] ] === "zastava") {korekcijaBrMina++; brNeotvorenih--}
				    pp[ rez[i][1] ][ rez[i][0] ] = "otvoreno";
				    brNeotvorenih++;
				}
			}
			brPre -= brNeotvorenih;
			
			this.setState((prevState) => {
				return {brPreostalihPolja: brPre, poljeSw: pp, poljeDisplay: this.vratiDisplay(prevState.polje, pp),
					    brPreostalihMina: prevState.brPreostalihMina+korekcijaBrMina}});
			
            if (brPre == 0)  this.gameOverPobjeda();
			
		} else {
		  	
		  	// klik na minu, game over
		  	if (this.state.polje[y][x] == "mina") {	
			    this.gameOver(x, y);
			} else {
		  		  
		    // slucaj klika na zatvoreno polje bez zastave
		      if (this.state.brPreostalihPolja == 1)  this.gameOverPobjeda();
		      
		      this.setState((prevState)=>{
			         //console.log("Broj PREOSTALIH polja je " + (prevState.brPreostalihPolja-1));
				     prevState.poljeSw[y][x]  = "otvoreno";
				     return {poljeSw: prevState.poljeSw, poljeDisplay: this.vratiDisplay(prevState.polje, prevState.poljeSw),
						     brPreostalihPolja: prevState.brPreostalihPolja-1}; 
		      });
		    }  
		  //console.log("Broj PREOSTALIH polja je " + this.state.brPreostalihPolja);  
			
		}
	}
	
	gameOver(x, y) {
		clearInterval(this.timerRef);
		this.setState((prevState)=>{
			prevState.polje[y][x] = "mina-crveno";
			prevState.poljeSw[y][x] = "otvoreno";
			return {poljeSw: prevState.poljeSw, poljeDisplay: this.vratiDisplay(prevState.polje, prevState.poljeSw),
				    polje: prevState.polje, emojiState: 1, gameOverSw: true};
		});
	}
	
	gameOverPobjeda(x, y) {
		clearInterval(this.timerRef);
		this.setState({emojiState: 2, gameOverSw: true});
	}
			
	inicirajPolje() {
		let pp1 = [];
		let pp2 = [];
		for (let i = 0; i < this.state.ny; i++) {
			let pp = [];
			let ppp = [];
			for (let j = 0; j < this.state.nx; j++) {
				pp.push("prazno");
				ppp.push("zatvoreno");  // jos moze biti otvoreno, zastava ili krizic
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
		
		if (this.state.noGuessSw) {
			let [x, y] = this.pronadiRandomPraznoPolje(pp1);
			pp2[y][x] = "krizic";
		}
		
		if (this.timerRef !== null) {
			clearInterval(this.timerRef);
		}
		this.setState((prevState)=>{return {...prevState, brPreostalihMina: prevState.brMina, polje: pp1, brSec: 0, brPreostalihPolja: prevState.nx * prevState.ny, 
			                                poljeDisplay: this.vratiDisplay(pp1, pp2), poljeSw: pp2, prviKlikSw: false, emojiState: 0, 
			                                gameOverSw: false}});
	}
	
	pronadiRandomPraznoPolje(polje) {
		let dulj2 = polje.length;
		let dulj1 = polje[0].length;
		let rez = [];
		for (let i = 0; i < dulj2; i++) {
			for (let j = 0; j < dulj1; j++) {
				if (polje[i][j] == "prazno") {
					rez.push([j, i]);
				}
			}
		}
	    return rez[Math.floor(Math.random()*rez.length)];
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
				} else if (tt === "krizic") {
					re.push("krizic");
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
	
	kliknutiMenu(e) {
		
		switch (e) {
			case "beginner":
			    this.setState(()=>{return {nx: 9, ny: 9, brMina: 10, formaHideSw: true}}, this.inicirajPolje);
			    break;
			case "intermediate":
			    this.setState(()=>{return {nx: 16, ny: 16, brMina: 40, formaHideSw: true}}, this.inicirajPolje);
			    break;
			case "expert":
			    this.setState(()=>{return {nx: 30, ny: 16, brMina: 99, formaHideSw: true}}, this.inicirajPolje);
			    break;
			case "custom":
			    this.setState(()=>{return {formaHideSw: false}}, this.inicirajPolje);
			    break;
			default:
			    console.log("POGRESAN argument, ta opcija ne postoji u izborniku");
		}
	}
	
	postaviNoGuessMode(sw=false) {  // za true postavlja i pokrece no guess mode, za false standardni classic mode
		this.setState(()=>{return {noGuessSw: sw}}, this.inicirajPolje);
	}
	
	postaviSkalniFaktor(noviFak) {
		this.setState({skalniFaktor: noviFak});
	}
	
	formaPostaviParametre(x, y, minaBr) {
		this.setState(()=>{return {nx: x, ny: y, brMina: minaBr}}, this.inicirajPolje);
	}
	
	render() {
		return (
		    <div id="strana">
		        <Menu postaviSkalniFaktor={this.postaviSkalniFaktor} klik={this.kliknutiMenu} guessModeKlik={this.postaviNoGuessMode}/>
		        <Forma hideSw={this.state.formaHideSw} nx={this.state.nx} ny={this.state.ny} brMina={this.state.brMina} submitKlik={this.formaPostaviParametre}/>
	            <Povrsina hoverSw={this.state.hoverCapabilitySw} skalniFaktor={this.state.skalniFaktor} polje={this.state.poljeDisplay} brSec={this.state.brSec} brMina={this.state.brPreostalihMina} klikPolje={this.kliknutoPolje} klikStart={this.inicirajPolje} emojiState={this.state.emojiState}/>   
	        </div>
		)
	}
}

ReactDOM.render(
    <div className="ekran">
        <App/>
    </div>,
    cont
)

function dodajStilove(el, stilovi) {
    for (let key in stilovi) {
	    el.style[key] = stilovi[key];
	}
}
