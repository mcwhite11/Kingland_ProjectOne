//This file contains all the methods and variables used to verify the forms for the new hire portal, as well as generate the email for welcome email page

//this function can focus on certain areas of the form, name = the id of the input.
function getFocus(name){
    document.getElementById(name).focus();
}

//this function can take in one of the variable defined above and a color, changes the color of the text on the html page
/* this function is not being used
function changeColor(name, color){
    document.getElementById(name).style.color=color;
}
*/

// this function takes in a txt input to check if it only contains alpha chars
function allLetter(inputText)  {
    var letters = /^[ƒŽŒžŸÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝàáâãäåæçèéêëìíîïðñòóôõöøùúûüýÿ . A-Za-z $ " " ']+$/;
    if(inputText.match(letters)) {
		return true;
    }
	else {
		return false;
    }
}

//function to check for phone numbers and - and / and ()
function allNumber(inputText)  {
      var numbers = /^[0-9-/ /( ) $ " "]+$/;
      if(inputText.match(numbers)) {
		return true;
      }
      else {
		return false;
      }
}

//function that checks a text input to make sure it only has numbers and letters, and certian special characters
function allAlphaNum(inputText){
    var alphanum = /^[ƒŽŒžŸÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝàáâãäåæçèéêëìíîïðñòóôõöøùúûüýÿ 0-9A-Za-z " " $ @ . - , # ']+$/;
      if(inputText.match(alphanum)) {
		return true;
      }
      else {
		return false;
      }
}

//this is used to capatalize the first letter of a string
function capitaliseFirstLetter(string)
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

//This function takes in an id(for a checkbox/radio button) and a value and verifies its value and if its checked
function validateCheckBox(ID, value){

	var check = document.getElementById(ID).checked;
	var checkVal = document.getElementById(ID).value;
	
	if(!check || checkVal != value){
		return true;
	}else {
		return false;
	}
}

//This function takes in an id and a type. the id fetches the value of the input field and the type defines whether its a letter number or either
function checkInput(ID, type){
	
	var val = document.getElementById(ID).value;
	
	if(type == "num"){
		if(val == null || val == "" || !allNumber(val)){
			return true;
		}else{
			return false;
		}
	}else if(type == "alpha"){
		if(val == null || val == "" || !allLetter(val)){
			return true;
		}else{
			return false;
		}
	}else{
		if(val == null || val == "" || !allAlphaNum(val)){
			return true;
		}else{
			return false;
		}
	}
}

//This function takes in an id to get the value an entry/or text of entry, and the other input value checks to see if the selected input matches said value 
function checkDropDownMenu(ID){

	var varTemp = document.getElementById(ID);
	var value = varTemp.options[varTemp.selectedIndex].text;
	
	if(value == "Select..."){
		return true;
	}else{
		return false;
	}
}

// this function is for the itional information form, checks all the feilds for character requirements
function validateAdditionalInfo() {

	//following statement is for the first name text feild
    if (checkInput("firstNameText", "alpha")) {
		getFocus("firstNameText");
        alert("You have to fill out the first name!");
    }

	//following statement is for the last name text feild
	else if (checkInput("lastNameText", "alpha")){
		getFocus("lastNameText");
        alert("You have to fill out the last name!");
    }

	//following statement is for the home phone text feild
	else if (checkInput("homePhoneText", "num") || document.getElementById("homePhoneText").value.length < 10) {
		getFocus("homePhoneText");
        alert("Please enter your full Home Phone number!");
    }

	//following statement is for the cell phone text feild
	else if (checkInput("cellPhoneText", "num") || document.getElementById("cellPhoneText").value.length < 10) {
		getFocus("cellPhoneText");
        alert("Please enter your full Cell Phone number!");
    }

	// following statement is for emergency contact name text feild
	else if (checkInput("emergencyContactNameText", "alpha")){
		getFocus("emergencyContactNameText");
        alert("Emergency Contact Name must be filled out!");
    }

	//following statement is for the emergency contact home phone text feild
	else if (checkInput("emergencyHomePhoneNumberText", "num") || document.getElementById("emergencyHomePhoneNumberText").value.length < 10) {
		getFocus("emergencyHomePhoneNumberText");
        alert("Please enter your full Emergency Contact Home Phone number!");
    }

	//following statement is for the emergency contact work phone text feild
	else if (checkInput("emergencyWorkPhoneNumberText", "num") || document.getElementById("emergencyWorkPhoneNumberText").value.length < 10) {
		getFocus("emergencyWorkPhoneNumberText");
        alert("Please enter your full Emergency Contact Work Phone number!");
    }

	// followingstatement is for emergency contact relationship text feild
	else if (checkInput("relationshipText", "alpha")){
		getFocus("relationshipText");
        alert("Emergency Contact Relationship must be filled out!");
    }

	else if (!validateCheckBox("noVet", "Not a veteran") && !validateCheckBox("vet", "I am a Vietname Veteran") || !validateCheckBox("disVet", "I am a disabled Veteran")) {
		getFocus("noVet");
		alert("You cannot choose a veteran and none of the above!");
	}

	//If all checks are meet proceed to form 2
	else {
		submitFrontForm(1);
	}
}

// This function is used to verify all the character requirements on the direct deposit form.
function validateDirectDeposit() {
	
    //check to make sure the appropriate authorization is checked
    if(validateCheckBox("newAuthorization", "New") && validateCheckBox("changeAuthorization", "Change")){
        getFocus("newAuthorization");
        alert("You must select new authorization or change authorization!");
    }

    //Check the effective date
    else if(checkInput("effectiveDate", "num")){
        getFocus("effectiveDate");
        alert("Please fill in the effective date! Month/Day/Year");
    }

    //Check to make sure an account type was choosen
    else if(validateCheckBox("checkingAccount1", "Checking") && validateCheckBox("savingsAccount1", "Savings") && validateCheckBox("paycard", "Paycard/Debit")){
        getFocus("checkingAccount1");
        alert("You must choose the account type!");
    }

    //Check depositary name
    else if(checkInput("depositaryName1", "alphanum")){
        getFocus("depositaryName1");
        alert("Please fill out the Depositary Name!");
    }

    //check routing number
    else if(checkInput("routingNumber1", "num") || document.getElementById("routingNumber1").value.length < 9 || document.getElementById("routingNumber1").value.length > 9){
        getFocus("routingNumber1");
        alert("Please enter a Routing Number!");
    }

    //check account number
    else if(checkInput("accountNumber1", "num")){
        getFocus("accountNumber1");
        alert("Please enter an Account Number!");
    }

    //Check for foreign bank status
    else if(validateCheckBox("foreignYes", "yes") && validateCheckBox("foreignNo", "no")){
        getFocus("foreignYes");
        alert("You must answer whether or not these funds are going to a foreign bank!");
    }

	//check for Social Security Number
    else if(checkInput("SSN", "num") || document.getElementById("SSN").value.length < 9  || document.getElementById("SSN").value.length > 9){
        getFocus("SSN");
        alert("Please enter your full SSN!");
    }

	//Check to see if they agreed to the direct deposit form
    else if(validateCheckBox("directDepositAgree", "agree")){
        getFocus("directDepositAgree");
        alert("Have you fully read, understand, and agree to these terms?");
    }

	//Check for a form signature
    else if(checkInput("directDepositSignature", "alpha")){
        getFocus("directDepositSignature");
        alert("You must type your name into the signature box if you you fully read, understand, and agree to these terms.");
    }
	
	//check to see if they agreed to one of the volunitary authorization processes
	else if(validateCheckBox("authorize", "agree") && validateCheckBox("doNotAuthorize", "disagree")){
		getFocus('authorize');
		alert('You have to agree to one of the options regarding the forwarding paychecks!');
	}
	
	//check to see if they signed the voluntary authorization agreement, or disagreement 
	else if(checkInput("voluntaryAuthSignature", "alpha")){
		getFocus('voluntaryAuthSignature');
		alert('Please sign the voluntary authorization agreement, stating you agree understand the option you have choosen.');
	}

    //go into account 2 if applicable
    else if(validateCheckBox("checkingAccount2", "Checking") || validateCheckBox("savingsAccount2", "Savings")){

        //check for secondary account amount
        if(checkInput("account2Amount", "num")){
            getFocus("account2Amount");
            alert("Please fill in the Amount to be desposited each pay period for account 2!");
        }

        //Check depositary name 2
        else if(checkInput("depositaryName2", "alphanum")){
            getFocus("depositaryName2");
            alert("Please fill out the Depositary Name for account 2!");
        }

        //check routing number 2
        else if(checkInput("routingNumber2", "num") || document.getElementById("routingNumber2").value.length < 9 || document.getElementById("routingNumber2").value.length > 9){
            getFocus("routingNumber2");
            alert("Please enter a Routing Number for account 2!");
        }

        //check account number 2
        else if(checkInput("accountNumber2", "num")){
            getFocus("accountNumber2");
            alert("Please enter a Account Number for account 2!");
        }
		
		else if (validateCheckBox("directDepositAgree", "agree")) {
			alert("Have you read and agreed to the terms?");
		}

		//if account two was applicable and all checks were meet, go to form three
        else{
            submitFrontForm(2);
        }
    }

	//if account two was not applicable and all checks were meet, go to form three
    else{
            submitFrontForm(2);
        }
}

// this function validates the student status verification form
function validateStudentStatus(){

	//check the signature
	if(checkInput("signatureSVCF", "alpha")){
	alert("Please sign the Student Verification Consent Form!");
	}
	
	else if (validateCheckBox("agreeSVCF", "agree")) {
		alert("Have you agreed to the verification of your student status?");
	}

	//if its signed go to form 4
	else{
	submitFrontForm(3);
	}
}

// this function validates the employee handbook receipt form
function validateEmployeeHandbook(){

	//check the singature
	if(checkInput("EHsigned", "alpha")){
		alert("Please sign the Employee Handbook Receipt Form!");
	}

	//check the checkbox agreement
	else if(validateCheckBox("EHagree", "agree")){
		alert("Have you read and agreed with the receipt?");
	}

	//go to form 5
	else{
		submitFrontForm(4);
	}
}

//this function validates the safe harbor agreement
function validateSafeHarbor(){
	
	//check the signature
	if(checkInput("signedSafeHarbor", "alpha")){
		alert("Please sign the Safe Harbor Form!");
	}

	//check the check box
	else if(validateCheckBox("agreeSafeHarbor", "agree")){
		alert("Have you read and agreed to this acknowledgement?");
	}

	//go to form 6
	else{
		submitFrontForm(5);
	}
}

//this function is used to verify the technology agreement
function validateTechAgreement(){

	//check signature
	if(checkInput("signedEmployeeTech", "alpha")){
		alert("Please sign the Employee Technology Agreement Form!");
	}

	//check the check box
	else if(validateCheckBox("agreeEmployeeTech", "agree")){
		alert("Have you read and agreed  to the Technolgy Agreement?");
	}

	// go to form 7
	else{
		submitFrontForm(6);
	}
}

//This function will check to see if all requirements are meet for the HR adding a new employee form
function validateAddEmployee(){
	
	//check for first name
	if(checkInput("newFirstName", "alpha")){
		alert("You must enter a first name to add a new employee!");
		getFocus("newFirstName");
	}
	
	//check last name
	else if(checkInput("newLastName", "alpha")){
		alert("You must add a last name to add a new employee!");
		getFocus("newLastName");
	}
	
	//check email
	else if(checkInput("newEmail", "alphanum")){
		alert("You must enter an E-mail to add a new employee!");
		getFocus("newEmail");
	}
	
	//check actual start date
	else if(checkInput("newActualStartDate", "num")){
		alert("You must enter an actual start date to add a new employee!");
		getFocus("newActualStartDate");
	}
	
	//check to see if the position has been selected
	else if(checkDropDownMenu("prPosition")){
		alert('Please select an employee position!');
		getFocus('prPosition');
	}
	
	//check to see if the department has been selected
	else if(checkDropDownMenu("prDepartment")){
		alert('Please select an employee department!');
		getFocus('prDepartment');
	}
	
	//check to see if the supervisor has been selected
	else if(checkDropDownMenu("prSupervisor")){
		alert('Please select an employee supervisor!');
		getFocus('prSupervisor');
	}
	
	//check to see if the employee type has been selected
	else if(checkDropDownMenu("prEmployeeType")){
		alert('Please select an employee type!');
		getFocus('prEmployeeType');
	}
	
	//check to see if the location has been selected
	else if(checkDropDownMenu("prLocation")){
		alert('Please select an employee location!');
		getFocus('prLocation');
	}
	
	else {
		//Call Generic AJAX function to use cshtml to check if the ID in the field is not in use
		//This updateArea function is force to handle the result because Javascript is stupid and can't
		//Handle things in sequential order.
		updateArea("checkUserID", document.getElementById('manualID').value, 0);
	}
}

//This function will check to see if all requirements are meet for the HR form
function validateHRForm(){

	//check for first name
	if(checkInput("hrFirstName", "alpha")){
		alert("You have to enter in a valid first name!");
		getFocus("hrFirstName");
	}
	
	//check last name
	else if(checkInput("hrLastName", "alpha")){
		alert("You have to eneter in a valid last name!");
		getFocus("hrLastName");
	}
	
	//check email
	else if(checkInput("hrEmail", "alphanum")){
		alert("You have to enter in a valid E-mail!");
		getFocus("hrEmail");
	}
	
	//check position
	else if(checkInput("hrPosition", "alpha")){
		alert("You have to enter in a valid position!");
		getFocus("hrPosition");
	}
	
	//check department
	else if(checkInput("hrDepartment", "alpha")){
		alert("You have to enter in a valid department!");
		getFocus("hrDepartment");
	}
	
	//check actual start date
	else if(checkInput("hrActualStartDate", "num")){
		alert("You have to enter in a valid actual start date!");
		getFocus("hrActualStartDate");
	}
	
	//check hiring manager
	else if(checkInput("hrHiringManager", "alpha")){
		alert("You have to enter in a valid hiring manager!");
		getFocus("hrHiringManager");
	}
	
	//check hiring manager email
	else if(checkInput("hrHiringManagerEmail", "alphanum")){
		alert("You have to enter in a valid hiring manager E-mail!");
		getFocus("hrHiringManagerEmail");
	}
	
	//if all is good, add employee
	else {
		submitHRForm();
	}
}

//this function is used to validate the hiring manager form
function validateHiringManager(){

	//check specail installs
	if(checkInput("specialInstall", "alphanum")){
		alert("You have to specify any special installations, or specify none!");
		getFocus("specialInstall");
	}
	
	//check for pc requirements
	else if(checkInput("pcRequirement", "alphanum")){
		alert("You have to specify any pc requirements, or specify none!");
		getFocus("pcRequirement");
	}

	//check for desk location
	else if(checkInput("deskLocation", "alphanum")){
		alert("You have to specify a desk location!");
		getFocus("deskLocation");
	}
	
	//check assigned network ports
	else if(checkInput("assignedNetworkPort", "alphanum")){
		alert("You have to specify a netwrok port!");
		getFocus("assignedNetworkPort");
	}
	
	//check user permission
	else if(checkInput("userPermission", "alphanum")){
		alert("You have to specify any user permissions!");
		getFocus("userPermission");
	}
	
	//check for mks access
	else if(validateCheckBox("mksYes", "yes") && validateCheckBox("mksNo", "no")){
		alert("You have to specify MKS access!");
	}
	else {
		submitHMForm();
	}
}

// this function is a combonation of the hr and hm form used for the IT form
function validateITForm(){
	
	//check for first name
	if(checkInput("hrFirstName", "alpha")){
		alert("You have to enter in a valid first name!");
		getFocus("hrFirstName");
	}
	
	//check last name
	else if(checkInput("hrLastName", "alpha")){
		alert("You have to eneter in a valid last name!");
		getFocus("hrLastName");
	}
	
	//check email
	else if(checkInput("hrEmail", "alphanum")){
		alert("You have to enter in a valid E-mail!");
		getFocus("hrEmail");
	}
	
	//check position
	else if(checkInput("hrPosition", "alphanum")){
		alert("You have to enter in a valid position!");
		getFocus("hrPosition");
	}
	
	//check department
	else if(checkInput("hrDepartment", "alphanum")){
		alert("You have to enter in a valid department!");
		getFocus("hrDepartment");
	}
	
	//check actual start date
	else if(checkInput("hrActualStartDate", "num")){
		alert("You have to enter in a valid actual start date!");
		getFocus("hrActualStartDate");
	}
	
	//check hiring manager
	else if(checkInput("hrHiringManager", "alphanum")){
		alert("You have to enter in a valid hiring manager!");
		getFocus("hrHiringManager");
	}


	else if(checkInput("specialInstall", "alphanum")){
		alert("You have to specify any special installations, , or specify none!");
		getFocus("specialInstall");
	}
	
	//check for pc requirements
	else if(checkInput("pcRequirement", "alphanum")){
		alert("You have to specify any pc requirements, , or specify none!");
		getFocus("pcRequirement");
	}

	//check for desk location
	else if(checkInput("deskLocation", "alphanum")){
		alert("You have to specify a desk location!");
		getFocus("deskLocation");
	}
	
	//check assigned network ports
	else if(checkInput("assignedNetworkPort", "alphanum")){
		alert("You have to specify a netwrok port!");
		getFocus("assignedNetworkPort");
	}
	
	//check user permission
	else if(checkInput("userPermission", "alphanum")){
		alert("You have to specify any user permissions!");
		getFocus("userPermission");
	}
	
	//check for mks access
	else if(validateCheckBox("mksYes", "yes") && validateCheckBox("mksNo", "no")){
		alert("You have to specify MKS access!");
	}
	else {
		submitITForm();
	}
}

//form used to validate the payroll form 
function validatePRForm(){

	//check the first name
	if(checkInput("prFirstName", "alpha")){
		alert("You have to fill out the first name of the employee!");
		getFocus("prFirstName");
	}
	
	//check the last name
	else if(checkInput("prLastName", "alpha")){
		alert("You have to fill out the last name of the employee!");
		getFocus("prLastName");
	}
	
	//check the employee id
	else if(checkInput("prEmpId", "alpha")){
		alert("You have to fill out the employee ID!");
		getFocus("prEmpId");
	}
	
	//check the postion
	else if(checkDropDownMenu("prPosition")){
		alert("You have to select the employee position!");
		getFocus("prPosition");
	}
	
	//check the division
	else if(checkDropDownMenu("division")){
		alert("You have to select the employee division!");
		getFocus("division");
	}
	
	//check the department
	else if(checkDropDownMenu("prDepartment")){
		alert("You have to select the employee department!");
		getFocus("prDepartment");
	}
	
	//check Incentive Payment
	else if(checkInput("prIncentivePayment", "alphanum")){
		alert("You have to fill out the employee incentive payment, or specify none!");
		getFocus("prIncentivePayment");
	}
	
	//check incentive type
	else if(checkDropDownMenu("prIncentiveType")){
		alert("You have to select the incentive type, or specify other!");
		getFocus("prIncentiveType");
	}

	//check the comments
	else if(checkInput("prComments", "alphanum")){
		alert("You have to fill out the comments section, or specify none!");
		getFocus("prComments");
	}
	
	//check employee referral payments
	else if(checkInput("prReferralPayment", "alphanum")){
		alert("You have to fill out the referral payments section, or specify none!");
		getFocus("prReferralPayment");
	}
	
	//check supervisor 
	else if(checkDropDownMenu("prSupervisor")){
		alert("You have to select a supervisor for the employee!");
		getFocus("prSupervisor");
	}
	
	//check employee type  
	else if(checkDropDownMenu("prEmployeeType")){
		alert("You have to select an employee type!");
		getFocus("prEmployeeType");
	}
	
	//check employee status 
	else if(checkDropDownMenu("prEmployeeStatus")){
		alert("You have to select an employee status!");
		getFocus("prEmployeeStatus");
	}
	
	//check functional area 
	else if(checkDropDownMenu("prFunctionalArea")){
		alert("You have to select a functional area!");
		getFocus("prFunctionalArea");
	}
	
	//check base pay 
	else if(checkInput("prBasePay", "alphanum")){
		alert("You have to fill out the base pay section!");
		getFocus("prBasePay");
	}
	
	//check employement type 
	else if(checkDropDownMenu("prEmploymentType")){
		alert("You have to select an employee type!");
		getFocus("prEmploymentType");
	}
	
	//check pay type 
	else if(checkDropDownMenu("prPayType")){
		alert("You have to select a pay type!");
		getFocus("prPayType");
	}
	
	//check sick hours 
	else if(checkInput("prSickHours", "alphanum")){
		alert("You have to fill out the sick hours section, or specify none!");
		getFocus("prSickHours");
	}
	
	//check vacation hours 
	else if(checkInput("prVacationHours", "alphanum")){
		alert("You have to fill out the vacation hours section, or specify none!");
		getFocus("prVacationHours");
	}
	
	//if all check pass then submit the form
	else{
		submitPRForm();
	}
}

//this function is used to generate the email body on the send welcome email page
function generateEmailBody(){

	//drop down list variable for location
	var locationTemp = document.getElementById("location");
	var location = locationTemp.options[locationTemp.selectedIndex].value;
	
	//pulling both text and hidden variables from that page
	var name = capitaliseFirstLetter(document.getElementById('name').value.trim());
	var startDate = document.getElementById('startDate').value.trim();
	var user = document.getElementById('user').value.trim();
	var pass = document.getElementById('pass').value.trim();
	var checkInName = document.getElementById('checkInName').value.trim();
	var preferredEmail = document.getElementById('preferredEmail').value.trim();
	var preferredPhone = document.getElementById('preferredPhone').value.trim();
	var website = "newhire.kingland.com";
	var websiteURL = website.link("http://newhire.kingland.com");
	
	//inserting variables into the template in the body textarea 
	document.getElementById('messageBody').innerHTML = "Dear " + name + 
														", \n\nWelcome to Kingland Systems Corporation (KSC)! We are excited that you have decided to accept our employment offer. Your tentative start date scheduled for " + 
														startDate + ". Please report to " + location + ". When you arrive, please check in with " + 
														checkInName + ". On your first day you will be completing New Hire Orientation. \n\n" +
														"In preparation for your employment at KSC, we ask that you follow the link below and complete your employment paperwork prior to your first day through " +
														"the New Hire Portal. If you have any questions regarding the paperwork, please send an e-mail to " + preferredEmail +" or call " + preferredPhone + ". \n\n" + 
														"We look forward to you sharing in our future! \n\n" +
														"Please proceed to " + website + " and use the provided credentials to log in. From there, you can fill out the required forms and you will be ready for your first day.";
}

//This function is used to set the submit button on the PRForm after the signature box is changed, ID of button, and text button appears as
function setButton(ID, buttonVal){
	document.getElementById(ID).innerHTML = buttonVal;
}