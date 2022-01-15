import React from "react";

export function DigitalniBrojac({sirina="200px", broj=888}) {
	const [br, setBr] = React.useState(broj);
	const [sir, setSir] = React.useState(0);
	
	const r = React.useRef();
	const r1 = React.useRef();
	React.useEffect(()=>{
	    dodajStilove(r1.current, {width: sirina, backgroundColor: "black", display: "flex", flexDirection: "row", justifyContent: "space-around",
			                      margin: "0px 10px 0px 10px"});	
		
		let s = parseFloat(window.getComputedStyle(r1.current, null).getPropertyValue("width"));
		console.log("sirinaaa je " + s);
		dodajStilove(r1.current, {height: s*2/3.1 + "px", alignItems: "center"}); // sa koeficijentom u height efektivno namjestas relativnu visinu brojaca u odnosu na brojke

		setSir(s/3.7);  // ovdje sa koeficijentom efektivno namjestas sirinu brojaca u odnosu na brojke
		
	  
	}, []);
	
	React.useEffect(()=>{
		setBr(broj);
	}, [broj])
	
	return (
	    <div ref={r1}>
	        <DigitalniBroj sirina={sir} broj={Math.floor(br%1000/100)}/>
	        <DigitalniBroj sirina={sir} broj={Math.floor(br%100/10)}/>
	        <DigitalniBroj sirina={sir} broj={br%10}/>
	    </div>
	)
}

function DigitalniElement({visina=50, sirina=200, stil={}, boja="yellow"}) {
	
	const [boja1, setBoja1] = React.useState(boja);
	
	React.useEffect(()=>{
		setBoja1(boja);
	}, [boja]);
	
	let tijelo = 0.6666; // postotak duljine tijela
	
	tijelo = 1 - visina/sirina;
	
	const r = React.useRef();
	const r1 = React.useRef();
	const r2 = React.useRef();
	const r3 = React.useRef();
	React.useEffect(()=>{
	  if (false) {	
		dodajStilove(r.current, {height: visina+"px", width: sirina+"px", backgroundColor: "transparent", position: "absolute"});
		dodajStilove(r1.current, {position: "absolute", left: "0px", top: "0px", width: "0", height: "0", borderTop: visina/2 + "px solid transparent", 
			                      borderRight: sirina*(1-tijelo)/2 + "px solid " + boja1, borderBottom: visina/2 + "px solid transparent"});
        dodajStilove(r2.current, {position: "absolute", left: sirina*(1-tijelo)/2 + "px", top: "0px", width: sirina*tijelo + "px", height: "100%", backgroundColor: boja1});
        dodajStilove(r3.current, {position: "absolute", right: "0px", top: "0px", width: "0", height: "0", borderTop: visina/2 + "px solid transparent", 
			                      borderLeft: sirina*(1-tijelo)/2 + "px solid " + boja1, borderBottom: visina/2 + "px solid transparent"});
	    dodajStilove(r.current, stil);
	    console.log("PARAMETRI: " + (visina/2) + " / " + (sirina*(1-tijelo)/2) + " / " + (sirina*tijelo));
	  } else {
	    
	    dodajStilove(r.current, {height: visina+"px", width: sirina+"px", backgroundColor: "transparent", position: "absolute"});
		dodajStilove(r1.current, {position: "absolute", left: "0px", top: "0px", width: "0", height: "0", borderTop: Math.ceil(visina/2) + "px solid transparent", 
			                      borderRight: Math.ceil(sirina*(1-tijelo)/2) + "px solid " + boja1, borderBottom: Math.ceil(visina/2) + "px solid transparent"});
        dodajStilove(r2.current, {position: "absolute", left: sirina*(1-tijelo)/2 + "px", top: "0px", width: sirina*tijelo + "px", height: "100%", backgroundColor: boja1});
        dodajStilove(r3.current, {position: "absolute", right: "0px", top: "0px", width: "0", height: "0", borderTop: Math.ceil(visina/2) + "px solid transparent", 
			                      borderLeft: Math.ceil(sirina*(1-tijelo)/2) + "px solid " + boja1, borderBottom: Math.ceil(visina/2) + "px solid transparent"});
	    dodajStilove(r.current, stil);
      }
	    
	    
	}, [boja1, visina, sirina]);
	
	return (
	    <div ref={r} className="pokus">
	        <div ref={r1}>
	        </div>
	        <div ref={r2}>
	        </div>
	        <div ref={r3}>
	        </div>
	    </div>
	)
}

function DigitalniBroj({sirina=200, broj}) {
	const BOJA1 = "red";
	const BOJA2 = "#333";
	const BOJA3 = "black";
	
	const [br, setBr] = React.useState(broj);
	const [polje, setPolje] = React.useState([BOJA1,BOJA2,BOJA2,BOJA1,BOJA2,BOJA2,BOJA2]);
	const r = React.useRef();
	/*const r1 = React.useRef();
	const r2 = React.useRef();
	const r3 = React.useRef();
	const r4 = React.useRef();
	const r5 = React.useRef();
	const r6 = React.useRef();
	const r7 = React.useRef();*/
	
	let postotak = 0.22;  // 0.18 odreduje efektivno odnos sirine elemenata brojke u odnosu na visinu, sto je postotak veci brojevi su "deblji"
	let pomak = 0.015;  /* 0.015 postotak pomaka u odnosu na visinu elementa*/
	
	let koefVisine = (1-postotak)*2 + 4*pomak + postotak;
	console.log("koef visine je " + koefVisine);
	
	React.useEffect(()=>{
		dodajStilove(r.current, {width: sirina + "px", height: sirina*koefVisine + "px", backgroundColor: BOJA3, position: "relative"});
	}, [sirina]);
	
	React.useEffect(()=>{
		setBr(broj);
	}, [broj]);
	
	React.useEffect(()=> {
		switch (br) {
			case 1:
			    console.log("postavili smo 1");
			    setPolje([BOJA2,BOJA2,BOJA1,BOJA2,BOJA2,BOJA1,BOJA2]);
			    break;
			case 2:
			    setPolje([BOJA1,BOJA2,BOJA1,BOJA1,BOJA1,BOJA2,BOJA1]);
			    break;
			case 3:
			    setPolje([BOJA1,BOJA2,BOJA1,BOJA1,BOJA2,BOJA1,BOJA1]);
			    break;
			case 4:
			    setPolje([BOJA2,BOJA1,BOJA1,BOJA1,BOJA2,BOJA1,BOJA2]);
			    break;
			case 5:
			    setPolje([BOJA1,BOJA1,BOJA2,BOJA1,BOJA2,BOJA1,BOJA1]);
			    break;
			case 6:
			    setPolje([BOJA1,BOJA1,BOJA2,BOJA1,BOJA1,BOJA1,BOJA1]);
			    break;
			case 7:
			    setPolje([BOJA1,BOJA2,BOJA1,BOJA2,BOJA2,BOJA1,BOJA2]);
			    break;
			case 8:
			    setPolje([BOJA1,BOJA1,BOJA1,BOJA1,BOJA1,BOJA1,BOJA1]);
			    break;
			case 9:
			    setPolje([BOJA1,BOJA1,BOJA1,BOJA1,BOJA2,BOJA1,BOJA1]);
			    break;
			case 0:
			    setPolje([BOJA1,BOJA1,BOJA1,BOJA2,BOJA1,BOJA1,BOJA1]);
			    break;
			default:
			    setPolje([BOJA1,BOJA1,BOJA1,BOJA1,BOJA1,BOJA1,BOJA1]);
			    break;
		}
	}, [br]);
	
	
	return (
	    <div ref={r} className="broj">
	        <DigitalniElement boja={polje[0]} visina={sirina*postotak} sirina={(1-postotak)*sirina} stil={{left: sirina*postotak/2+"px", top:"0px"}}/>  {/*gornja*/}
	        <DigitalniElement boja={polje[1]} visina={sirina*postotak} sirina={(1-postotak)*sirina} stil={{top: -1*sirina*postotak/2 + sirina*pomak + "px", left: "0px", transform: "rotate(90deg)", transformOrigin: "0% 100%"}}/>  {/*gornja lijeva*/}
	        <DigitalniElement boja={polje[2]} visina={sirina*postotak} sirina={(1-postotak)*sirina} stil={{top: -1*sirina*postotak/2 + sirina*pomak + "px", right: "0px",transform: "rotate(-90deg)", transformOrigin: "100% 100%"}}/>  {/*gornja desna*/}
	        <DigitalniElement boja={polje[3]} visina={sirina*postotak} sirina={(1-postotak)*sirina} stil={{left: sirina*postotak/2+"px", top: (1-postotak)*sirina + sirina*2*pomak + "px"}}/>  {/*srednja*/}
	        <DigitalniElement boja={polje[4]} visina={sirina*postotak} sirina={(1-postotak)*sirina} stil={{top: -1*sirina*postotak/2 + sirina*3*pomak + (1-postotak)*sirina + "px", left: "0px", transform: "rotate(90deg)", transformOrigin: "0% 100%"}}/>  {/*donja lijeva*/}
	        <DigitalniElement boja={polje[5]} visina={sirina*postotak} sirina={(1-postotak)*sirina} stil={{top: -1*sirina*postotak/2 + sirina*3*pomak + (1-postotak)*sirina + "px", right: "0px",transform: "rotate(-90deg)", transformOrigin: "100% 100%"}}/>  {/*donja desna*/}
	        <DigitalniElement boja={polje[6]} visina={sirina*postotak} sirina={(1-postotak)*sirina} stil={{left: sirina*postotak/2+"px", top: 2*(1-postotak)*sirina + sirina*4*pomak + "px"}}/>  {/*donja*/}
	    </div>
	)
}

function dodajStilove(el, stilovi) {
    for (let key in stilovi) {
	    el.style[key] = stilovi[key];
	}
}
