function paycalc(){
	
	var theName = document.getElementById("name").value; //Display Name //
	
	var theRate = document.getElementById("rate").value; //Display Rate //
	
	var theHour = document.getElementById("hours").value; //Display Hours//
	
	
	document.getElementById("button").innerHTML = "Pay Information is as follows..."; 
																					
	
	document.getElementById("nmp").innerHTML = theName; //Places the users name on the page
	
	document.getElementById("rtp").innerHTML = "$"+theRate; //Places the users name on the page
	
	document.getElementById("hrp").innerHTML = theHour+" hours"; //Places the users name on the page
	

	
	if(theHour < 40){
		var regular = theRate * theHour; //the payrate times the hours worked //
		var overpaid = 0; 
		var overHour = 0; 
		var totalPay = regular; 
		
		
		document.getElementById("overhoursworked").innerHTML = overHour + " hours";
		
		document.getElementById("regular").innerHTML = "$"+regular.toFixed(2);
		document.getElementById("overpaid").innerHTML = "$"+overpaid.toFixed(2);
		
		
		document.getElementById("netpaid").innerHTML = "$"+regular.toFixed(2);
		
		}
	else{
		var regHour  = 40; //Set the regular hours worked to 40 //
		var regular = theRate * regHour; 
		var overHour = theHour - regHour; 
		var overPayR = theRate * 1.5; 
		var overpaid = overPayR * overHour;
		var totalPay = regular + overpaid; 
		

		document.getElementById("overhoursworked").innerHTML = overHour + " hours";
		document.getElementById("regular").innerHTML = "$"+regular.toFixed(2);
		document.getElementById("overpaid").innerHTML = "$"+overpaid.toFixed(2);
		document.getElementById("netpaid").innerHTML = "$"+totalPay.toFixed(2);
	}
	
	
	var fedD = totalPay * 0.1259; 
	var FICA = totalPay * 0.0765; 
	var staD = totalPay * 0.0482; 
	var insurance = 26.54; 
	
	var deduc = fedD + FICA + staD + insurance; // add the values I received above to get the total amount of what my 
												 //deductions will be //
												 
// listing deductions //
	
	
	document.getElementById("fed").innerHTML = "$"+fedD.toFixed(2);
	document.getElementById("fica").innerHTML = "$"+FICA.toFixed(2);
	document.getElementById("state").innerHTML = "$"+staD.toFixed(2);
	document.getElementById("ins").innerHTML = "$"+insurance;
	
	document.getElementById("deduc").innerHTML = "$"+deduc.toFixed(2);
	

	var netPay = totalPay - deduc;
	                               

	
	document.getElementById("payt").innerHTML = "$" + netPay.toFixed(2);
	document.getElementById("nameo").innerHTML = "Has been paid to "+theName;
	
	document.getElementById("reset").innerHTML = "<button onclick = 'reloadp()' class = 'buttonsmall'>Reset Page</button>"

}

//The function below allows me to reset the page //
function reloadp(){
	location.reload();	
}
	
