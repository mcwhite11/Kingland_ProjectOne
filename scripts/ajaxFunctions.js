var formShown = false;

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

//Generic Ajax function
    //Caller - The page/forms calling the function
    //val - The value to pass for updating
    //The name to update
function updateArea(caller, val, name){
	var xmlhttp;

    //Pull the userID selected if relevant
	if ( caller == "showForm" ) {
	    var mylist = document.getElementById("myList");
	    var usrID = mylist.options[mylist.selectedIndex].text;
	}

    //Make a new XML HTTP Request
    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else { // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

	//updateInformation: Remove fields and skip rest of function
    if (val == "Select..." && caller == "updateInformation") {
        document.getElementById(name + "Update").innerHTML = " ";
    
    //showForm: Blank form and skip rest of function
    } else if ( usrID == "Choose Employee" && caller == "showForm") {
		document.getElementById("displayForm").innerHTML = " ";

    //Execute legitimate Ajax Call
	} else {

        //On webform state change
	xmlhttp.onreadystatechange = function () {
	    //Form is processed and we can find the file to get from
	    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

	        //Update Information Form
	        if (caller == "updateInformation") {
	            document.getElementById(name + "Update").innerHTML = xmlhttp.responseText;
	        }

	        //Update Information Form
	        if (caller == "showForm") {
	            document.getElementById("displayForm").innerHTML = xmlhttp.responseText;
	        }

	        //Updating the value of the manualUser ID Box
	        if (caller == "userID") {
	            document.getElementById(name).value = xmlhttp.responseText;
	        }

	        if (caller == "checkUserID") {
	            if (xmlhttp.responseText.indexOf("1") != -1) {
	                document.getElementById('addUser').submit();
	            } else {
	                alert('That user ID already exists or is not of correct length!');
	                getFocus('manualID');
	            }
	        }
	    }
	}
            
		//Pass the Field and the value of that field	
		if ( caller == "updateInformation" ) {
			xmlhttp.open("GET","forms/updateInformation-AJAX.cshtml?name="+name+"&val="+val,true);
		}

        //If we're showing one of the front page forms
        if ( caller == "showForm" ) {
            xmlhttp.open("GET","forms/updateForm.cshtml?q="+usrID+"&form="+val,true);
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

