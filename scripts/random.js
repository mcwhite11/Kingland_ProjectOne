var formsShown = false;

function showHandbook() {
	window.open("documents/KSC_HANDBOOK.pdf", "Employee Handbook", "width=800, height=1000");
}

function showFAQ(){
	window.open("documents/Frequently Asked Questions.pdf", "Employee Handbook", "width=800, height=1000");
}

function showSecurity(){
	window.open("documents/Security Measurements.pdf", "Employee Handbook", "width=800, height=1000");
}

function showTechAgree(){
	window.open("documents/Employee Technology Agreement.pdf", "Employee Handbook", "width=800, height=1000");
}

function submitForm() {
	document.getElementById('addUser').submit();
}

function submitFrontForm(num) {
	document.getElementById('form'+num).submit();
}

function submitITForm() {
	document.getElementById("itForm").submit();
}

function submitPRForm() {
	document.getElementById("PRForm").submit();
}

function submitHMForm() {
	document.getElementById("hmForm").submit();
}

function submitHRForm() {
	document.getElementById("hrForm").submit();
}

function submitEmail(){
	document.getElementById('newEmployeeEmail').submit();
}

function delayMessage() {
	setTimeOut(removeMsg, 50);
}

//Processes selecting the delete user checkbox in "View Existing Newhires"
function deleteUser() {
	if ( document.getElementById("deleteUserCheckbox").checked ) {
		if ( confirm("Are you sure you want to delete this user?") ) {
			document.getElementById("deleteUserViewForm").submit();
		} else {
		    document.getElementById("deleteUserCheckbox").checked = false;
		}
	}
}

//Processes selecting the delete user checkbox in "View Existing Newhires"
function toggleActivate(isActive) {
    if ( isActive == 0 ) {
        var msg = "Are you sure you want to enable this user?";
    } else {
        var msg = "Are you sure you want to disable this user?";
    }

	if ( confirm(msg) ) {
		document.getElementById("toggleUserActivationForm").submit();
	}
}

//Displays information about why we are using the persons Social Security Number
function displaySocInfo(){
    alert("To steal your identity and buy a company boat! :D");
}