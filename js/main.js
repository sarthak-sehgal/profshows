var vinyl = document.getElementById('vinyl');
var profshowName = document.getElementById('ft-name');
function init() {

	document.addEventListener("wheel", wheelFunc);
	var showsWrapper = document.getElementById('showcasing-wrapper');
	var shows = document.getElementsByClassName('showcase-item');


	function wheelFunc(e) {
		if(e.deltaY>0)
			scrollDown();
		else
			scrollUp();
	}
	var active = 0;

	function scrollDown() {
		shows[active].style.opacity = 0;
		if(active==shows.length-1)
			active=0;
		else
			active++;
		shows[active].style.opacity = 1;
		showsWrapper.style.marginTop = -active*65.2+"vh";
	}
	function scrollUp() {
		shows[active].style.opacity = 0;
		if(active==0)
			active=shows.length-1;
		else
			active--;
		shows[active].style.opacity = 1;
		showsWrapper.style.marginTop = -active*65.2+"vh";
	}
}

function vinylTransition(){
	vinyl.style.transform = "translateX(-88px)";
	vinyl.style.opacity = "0";
	setTimeout(function(){
		vinyl.style.transform = "translateX(0px)";
		vinyl.style.opacity = "1";
	}, 500);
}

function changeProfshowName(name){
	profshowName.style.opacity = "0";
	profshowName.style.transform = "translateY(-7px)";
	setTimeout(function(){
		profshowName.textContent = name;
		profshowName.style.opacity = "1";
		profshowName.style.transform = "translateY(0px)";
	},500);
}

init();
