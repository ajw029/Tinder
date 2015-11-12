function like() {

	var len = document.getElementById('card-stack').children.length;
	var list_item = document.getElementById('card-stack').children[len-1];
	if (len > 0) {

		list_item.children[0].children[0].children[0].style.display ="block";
		list_item.classList.add('like');

	    me.likes.push(list_item.id);
    	checkMatch(list_item.id, me.id_);
    	lastDeleted = null;

	    setTimeout(function() { 
	        list_item.classList.remove('like');
			list_item.children[0].children[0].children[0].style.display = "none";
			removeCard(list_item.id);
	    }, 500); 
	}
}

function dislike(){

	var len = document.getElementById('card-stack').children.length;
	var list_item = document.getElementById('card-stack').children[len-1];
	if (len > 0) {
		list_item.classList.add('dislike');
		list_item.children[0].children[0].children[1].style.display ="block";
	    setTimeout(function() { 
	        list_item.classList.remove('dislike');
			list_item.children[0].children[0].children[1].style.display ="none";
			lastDeleted = document.getElementById(list_item.id).cloneNode(true);
			removeCard(list_item.id);
	    }, 500); 
	}
}

function superLike() {

	var len = document.getElementById('card-stack').children.length;
	var list_item = document.getElementById('card-stack').children[len-1];
	var star  = document.getElementById('buttons-n-stuff').children[0].children[3].children[0];
	if (len > 0) {

		star.classList.add('superlike-bounce');
		list_item.classList.add('like');

	    me.superlike.push(list_item.id);
    	checkMatch(list_item.id, me.id_);
    	lastDeleted = null;
	    setTimeout(function() { 
	        list_item.classList.remove('like');
			removeCard(list_item.id);
	    }, 500); 	    
	    setTimeout(function() { 
	        star.classList.remove('superlike-bounce');
	    }, 1250); 
	}
}

function undo() {
	if (lastDeleted != null) {
		var ul = document.getElementById('card-stack');
		lastDeleted.style.transform = "";
		var match_id = lastDeleted.id;
		var my_likes = me.likes; 

		ul.appendChild(lastDeleted);
		setUpDrag(lastDeleted.id);
		lastDeleted = null;
	}
}

function removeCard(id) {
	var ul = document.getElementById('card-stack');
	if (document.getElementById(id) != null) {
		ul.removeChild(document.getElementById(id));
		shiftCards();
	}
}

function shiftCards() {

	var len = document.getElementById('card-stack').children.length;
	if (len == 0) {
		var potential_list = document.getElementById('card-stack');
		var load_screen = document.getElementById('loading-screen');

		potential_list.style.display = "none";				
		load_screen.style.display = "block";	
	    setTimeout(function() { 
	        loadPotentials();
	    }, 750); 
		
	}
	else {
		var first = document.getElementById('card-stack').children[len-1];
		setUpDrag(first.id);
	}
}