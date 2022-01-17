
export class mouseEvents {
	constructor(el, klikPolje, idOznaka) {
		this.el = el;
		this.klikPolje = klikPolje;
		this.idOznaka = idOznaka;
		
		this.time = null;
		this.pritisakSw = false;
		
		
		this.pritisni = this.pritisni.bind(this);
	    this.otpusti = this.otpusti.bind(this);
	    this.iniciraj = this.iniciraj.bind(this);
	    this.ocisti = this.ocisti.bind(this);
	}
	
	iniciraj() {
		//this.el.addEventListener("mousedown", this.pritisni);
        //this.el.addEventListener("mouseup", this.otpusti);
        
        this.el.addEventListener("touchstart", this.pritisni);
        this.el.addEventListener("touchend", this.otpusti);
        this.el.addEventListener("touchleave", this.otpusti);			
	    this.el.addEventListener("touchcancel", this.otpusti);
	}
	
	ocisti() {
		//this.el.removeEventListener("mousedown", this.pritisni);
        //this.el.removeEventListener("mouseup", this.otpusti);
        
        this.el.removeEventListener("touchstart", this.pritisni);
        this.el.removeEventListener("touchend", this.otpusti);
        this.el.removeEventListener("touchleave", this.otpusti);			
	    this.el.removeEventListener("touchcancel", this.otpusti);
	}
	
	pritisni() {
		if (this.pritisakSw) {
			
		} else {
			this.time = (new Date()).getTime();
			this.pritisakSw = true;
		}
		console.log("PRITISNULI smo gumb na vremenu" + this.time + "  " + this.pritisakSw);		
	}
	
	otpusti(e) {
		let msec;
		if (this.pritisakSw) {
			msec = (new Date()).getTime();
			console.log("Vrijeme pritiska je " + ((msec-this.time)/1000));
			this.pritisakSw = false;
			if ((msec-this.time)/1000 > 0.8) {
				this.klikPolje(e, this.idOznaka, false);
				console.log("registriran je desni klik.");
			}
		} else {
			
		}
		console.log("OTPUSTILI smo gumb na vremenu " + msec + "  " + this.pritisakSw);
	}
	
}



