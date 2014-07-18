var formShown = false;

//Updates the form shown in "View Existing New Hires"
function showForm(id) {
var xmlhttp;
var mylist = document.getElementById("myList");
var usrID = mylist.options[mylist.selectedIndex].text;

	if ( usrID == "Choose Employee" ) {
		document.getElementById("displayForm").innerHTML = " ";
	} else {
		//Make a new XML HTTP Request
		if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
			xmlhttp = new XMLHttpRequest();
		} else { // code for IE6, IE5
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
		  
		//On webform state change
		xmlhttp.onreadystatechange = function () {
		    //Form is processed and we can find the file to get from
		    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
		        document.getElementById("displayForm").innerHTML = xmlhttp.responseText;
		    }

		    alert(xmlhttp.status);
		}

		/* 
			Okay so this may be a bit confusing, but the ID being passed in is either 0, 1, 2, 3, or 4.
			0 = all, 1 = HR, 2 = HM, 3 = IT, 4 = PR
			(This is just going in order from left to right.)
			
			Sorry!
		*/

		
		xmlhttp.open("GET","forms/updateForm.cshtml?q="+usrID+"&form="+id,true);

		formsShown = true; 
		xmlhttp.send();
	}
}	

function shouldShowForms(id, holderID) {
	if ( formShown ) {
		slideHolderUp("displayForm", id);
		document.getElementById(holderID).innerHTML = "v Show v";
	} else {
		showForm(id);
		slideHolder("displayForm");
		document.getElementById(holderID).innerHTML = "^ Hide ^";
	}
	formShown = !formShown;
}

//AJAX Function - updates The displayed user from drop-down menus
function updateUser(id){
	var xmlhttp;
	var mylist = document.getElementById("myList");
	var usrID = mylist.options[mylist.selectedIndex].text;
	
	//Display form should disappear with some pretty jQuery
	$("#displayForm").slideUp("slow");
	
	if ( usrID == "Choose Employee" ) {
		$("#showStatus").slideUp("slow");
		document.getElementById('showStatus').innerHTML = " ";
	} else {
		
		
		//Make a new XML HTTP Request
		if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
			xmlhttp = new XMLHttpRequest();
		} else { // code for IE6, IE5
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
		  
		//On webform state change
		xmlhttp.onreadystatechange=function() {
			//Form is processed and we can find the file to get from
			if (xmlhttp.readyState==4 && xmlhttp.status== 200) {
				document.getElementById("showStatus").innerHTML = xmlhttp.responseText;
			}
		}

		if ( id == 0 ) {
			xmlhttp.open("GET","forms/updateUser.cshtml?q="+usrID,true);
			reloadUser("showStatus");
		} else if ( id == 1 ) { 
			xmlhttp.open("GET","forms/updateForm.cshtml?q="+usrID+"&form=2",true);
		}
		xmlhttp.send();
	}
}

//More Generic Ajax function that is currently used with displaying information relative to the "Update Company Informatio" page
function updateArea(caller, val, name){
	var xmlhttp;

		//Make sure to remove the fields if we don't have anything selected: For UpdateCompanyInformation
		if ( val == "Select..." && caller == "updateInformation" ) {
			document.getElementById(name+"Update").innerHTML = " ";
		} else {
		
			//Make a new XML HTTP Request
			if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
				xmlhttp = new XMLHttpRequest();
			} else { // code for IE6, IE5
				xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
			}
			  
			//On webform state change
			xmlhttp.onreadystatechange=function() {
				//Form is processed and we can find the file to get from
				if (xmlhttp.readyState==4 && xmlhttp.status== 200) {
				
					if ( caller == "updateInformation" ) {
						document.getElementById(name+"Update").innerHTML = xmlhttp.responseText;
					}
					
					//Updating the value of the manualUser ID Box
					if ( caller == "userID" ) {
						document.getElementById(name).value = xmlhttp.responseText;
					}
					
					if ( caller == "checkUserID" ) {
						if ( xmlhttp.responseText.indexOf("1") != -1 ) {
							document.getElementById('addUser').submit();
						} else {
							alert('That user ID already exists or is not of correct length!');
							getFocus('manualID');
						}
					}
				}
			}
			
			if ( caller == "updateInformation" ) {
				xmlhttp.open("GET","forms/updateInformationAJAX.cshtml?name="+name+"&val="+val,true);
			}
			
			if ( caller == "userID" ) {
				var first = document.getElementById('newFirstName').value;
				var last = document.getElementById('newLastName').value;
				xmlhttp.open("GET","handlers/generateID.cshtml?first="+first+"&last="+last, true);
			}
			
			if ( caller == "checkUserID" ) {
				xmlhttp.open("GET","functions/checkID.cshtml?id="+val, true);
			}
			
			xmlhttp.send();
	}
}

