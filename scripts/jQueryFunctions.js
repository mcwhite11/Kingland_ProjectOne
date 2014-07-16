function slideHolder(holder){
	$("#"+holder).slideToggle("slow");
}

function slideHolderUp(holder, id) {
	$("#"+holder).slideUp("slow",function(){
		showForm(id);
	});
}

function reloadUser(holder){
	$("#"+holder).slideUp("slow").slideDown("slow");
}