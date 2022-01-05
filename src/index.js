import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Gumb} from "./gumb.js";
import { Ploca, Ploca1 } from "./ploca.js";
import { DigitalniBrojac } from "./digitalniBrojac.js";

let cont = document.querySelector("#cont");


function Povrsina({polje=[], brMina=0, klikPolje=defaultFun}) {
	const [matrica, setMatrica] = React.useState(polje);
	
	React.useEffect(()=>{
		setMatrica(polje);
		//console.log("u funkciji POVRSINA swbe je " + swBr);
		console.log("u funkciji POVRSINA polje je " + polje);
	}, [polje]);
	
	
	return (
	    <div id="povrsina">
	        <div id="povrsina-el">
	            <div id="povrsina-el-el">
	                <DigitalniBrojac sirina="60px" broj={brMina}/>
	                <Gumb/>
	                <DigitalniBrojac sirina="60px" broj={456}/>
	            </div>    
	        </div>
	        <div id="povrsina-el1">
	            {/*<Ploca x={11} y={9}/>*/}
	            <Ploca1 polje={polje} klikPolje={klikPolje}/>
	        </div>
	    </div>
	)
}

function defaultFun() { console.log("kliknuo si ali nisi postavio funkciju.")}


function App1() {
	return (
	    <div className="pokus">
	        <Povrsina/>
	    </div>
	)
}

class App2 extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			polje: [],
			nx: 11,
			ny: 9,
			brMina: 30,
			brPreostalihMina: 0
		}
		
		this.mina = this.mina.bind(this);
		this.brSusjednihMina = this.brSusjednihMina.bind(this);
		this.inicirajPolje = this.inicirajPolje.bind(this);
		this.kliknutoPolje = this.kliknutoPolje.bind(this);
	}
	
	componentDidMount() {
		this.inicirajPolje();
		
		//setInterval(()=>{this.inicirajPolje();}, 5000);
	}
	
	kliknutoPolje(e) {
		console.log("Upravo si kliknuo na poljeeeee " + e + "  --  " + Math.random());
	}
	
	inicirajPolje() {
		let pp1 = [];
		for (let i = 0; i < this.state.ny; i++) {
			let pp = [];
			for (let j = 0; j < this.state.nx; j++) {
				pp.push("prazno");
		    }	
		    pp1.push(pp);
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
				    //let brr = 0;
				    if (brr !== 0)  pp1[i][j] = brr.toString();
				}
			}
		}
		
		this.setState((prevState)=>{return {...prevState, brPreostalihMina: prevState.brMina, polje: pp1}});
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
	            <Povrsina polje={this.state.polje} brMina={this.state.brPreostalihMina} klikPolje={this.kliknutoPolje}/>
	        </div>
		)
	}
}

ReactDOM.render(
    <App2/>,
    cont
)

