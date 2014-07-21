function slideHolder(holder){
	$("#"+holder).slideToggle("slow");
}

function slideHolderUp(holder, id) {
	$("#"+holder).slideUp("slow",function(){
		updateArea('showForm', id, 0);
	});
}

function reloadUser(holder){
	$("#"+holder).slideUp("slow").slideDown("slow");
}