var formShown = false;

//If each of these forms are shown
var emp, HR, HM, IT, PR  = false;

//Returns which form is currently shown
function whichFormShown() {

    if ( emp ) {
        return "emp";
    }

    else if ( HR ) {
        return "HR";
    }

    else if ( HM ) {
        return "HM";
    }

    else if ( IT ) {
        return "IT";
    }

    else if ( PR ) {
        return "PR";
    } else {
        return "NONE";
    }
}

//Toggles if the given form is shown or not.
function toggleForm(id) {
   
   if ( id == "emp" ) {
        if ( emp ) {
           emp = false;  
        } else {
           emp = true; 
        }
    }

    else if ( id == "HR" ) {
        if ( HR ) {
           HR = false;  
        } else {
           HR = true; 
        }
    }

    else if ( id == "HM" ) {
        if ( HM ) {
           HM = false;  
        } else {
           HM = true; 
        }
    }

    else if ( id == "IT" ) {
        if ( IT ) {
           IT = false;  
        } else {
           IT = true; 
        }
    }

    else if ( id == "PR" ) {
        if ( PR ) {
           PR = false;  
        } else {
           PR = true; 
        }
    }
}

function shouldShowForms(id, holderID) {

	if ( formShown ) {
        //If the form we are trying to hide is the current form. Otherwise do nothing.
	    if (id == whichFormShown()) {
	        document.getElementById(holderID).innerHTML = "v Show v";
	        //Display form should disappear with some pretty jQuery
	        slideHolderUp("displayForm", id);
	    }
	} else {
	        document.getElementById(holderID).innerHTML = "^ Hide ^";
	        //Display form should disappear with some pretty jQuery
	        $("#displayForm").slideDown("slow");
	        updateArea('showForm', id, 0);
	}

	if (id == whichFormShown() || !formShown) {
        formShown = !formShown;
        toggleForm(id);
	}
}

//If you uncomment the form selection box in Cpanel, move this code into showForm for it to function
function OLDSHOWFORM(value) {
        //If value is zero, we're selecting employee - and must grab the actual form value
    if ( value == 0 ) {
        otherList = document.getElementById('formList');
        value = otherList.options[otherList.selectedIndex].value;
    }

    //Forms
    var status = document.getElementById('showStatus');
    var display = document.getElementById('displayForm');

    //Employee Selected
	var mylist = document.getElementById("myList");
    var formlist = document.getElementById("formList");

    //Form selected
	var usrID = mylist.options[mylist.selectedIndex].text;
    var myForm = formlist.options[formlist.selectedIndex].text;

    //Some simple variables
    var blankUsr = "Choose Employee";
    var blankForm = "Select...";

    //Must choose an employee to show forms for them! -- Add must choose form too?
	if ( usrID != blankUsr && myForm != blankForm ) {
	    //Showing the status bar
        if ( value == "status" ) {
            display.innerHTML = "";
            updateArea('showStatus', value, 0);
        }

        //Showing the forms
        if ( value != "status" ) {
            status.innerHTML = "";
            updateArea('showForm', value, 0);
        }
	} 
    
    if ( usrID == blankUsr ) {
        status.innerHTML = "";                    
	} 
}

//Make sure we are showing forms correctly
function showForm(value) {
    //Reload status bar with some fancy jQuery
    reloadUser("displayStatus");

    //Clear any status variables of which form is shown
    emp = HR = HM = IT = PR = formShown = false;
    document.getElementById('displayForm').innerHTML = " ";

    //Show the new users status
    updateArea('showStatus', value, 0);
}


//Generic Ajax function
    //Caller - The page/forms calling the function
    //val - The value to pass for updating
    //The name to update
function updateArea(caller, val, name){
	var xmlhttp;

    //Pull the userID selected if relevant
	if ( caller == "showForm" || caller == "showStatus" ) {
	    var mylist = document.getElementById("myList");
	    var usrID = mylist.options[mylist.selectedIndex].text;
	}

    //For smooth transition with showing a different user's status
    if ( caller == "showStatus" ) {

        //If we deselected all employees
        if ( usrID == "Choose Employee" ) {
		    document.getElementById('showStatus').innerHTML = " ";
	    }
    }

    //Make a new XML HTTP Request
    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else { // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    //updateInformation: Remove fields and skip rest of function
    if (val == "Select..." && caller == "updateAdmin") {
        document.getElementById(name + "Update").innerHTML = " ";
    
    //showForm: Blank form and skip rest of function
    }

	//updateInformation: Remove fields and skip rest of function
    else if (val == "Select..." && caller == "updateInformation") {
        document.getElementById(name + "Update").innerHTML = " ";
    
    //showForm: Blank form and skip rest of function
    } else if ( usrID == "Choose Employee" ) {
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

	        //Add/modify admin form
	        if (caller == "updateAdmin") {
	            document.getElementById("usersUpdate").innerHTML = xmlhttp.responseText;
	        }

	        //Update Information Form
	        if (caller == "showForm") {
	            document.getElementById("displayForm").innerHTML = xmlhttp.responseText;
	        }

	        //Update Information Form
	        if (caller == "showStatus") {
	            document.getElementById("showStatus").innerHTML = xmlhttp.responseText;
	        }

	        //Updating the value of the manualUser ID Box
	        if (caller == "userID") {
	            document.getElementById(name).value = xmlhttp.responseText.trim();
	        }

	        //Checks against return value.
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

        //Pass the Field and the value of that field	
		if ( caller == "updateAdmin" ) {
			xmlhttp.open("GET","forms/updateAdmin-AJAX.cshtml?val="+val,true);
		}

        //If we're showing one of the front page forms
        if ( caller == "showForm" ) {
            xmlhttp.open("GET","forms/updateForm.cshtml?q="+usrID+"&form="+val,true);
        }

        //If we're showing the status bar for employees
        if ( caller == "showStatus" ) {
            xmlhttp.open("GET","forms/updateUser.cshtml?q="+usrID,true);
        }

		//Generates a Unique ID from First/Last name boxes.	
		if ( caller == "userID" ) {
			var first = document.getElementById('newFirstName').value;
			var last = document.getElementById('newLastName').value;
			xmlhttp.open("GET","functions/generateID.cshtml?first="+first+"&last="+last, true);
		}
			
        //If they manually enter a userID, we want to make sure we check that it's unique and valid
		if ( caller == "checkUserID" ) {
			xmlhttp.open("GET","functions/checkID.cshtml?id="+val, true);
		}
			
		xmlhttp.send();
	}
}

