var vinyl = document.getElementById('vinyl');
var profshowName = document.getElementById('ft-name');
function init() {

	var bgs = ['red', 'blue', 'green', 'cyan', 'orange'];

	document.addEventListener("wheel", wheelFunc);
	document.addEventListener("keydown", keydownFunc);
	var bodyWrapper = document.getElementById('body-wrapper');
	var showsWrapper = document.getElementById('showcasing-wrapper');
	var shows = document.getElementsByClassName('showcase-item');
	var showName = document.getElementsByClassName('ft-name');

	var scrolling=false;

	shows[0].style.top = '0';

	function wheelFunc(e) {
		e.preventDefault();
		if(scrolling==false)
		{
			scrolling=true;
			setTimeout(function(){scrolling=false;}, 1200);

			if(e.deltaY>0)
				scrollDown();
			else
				scrollUp();
			vinylTransition();
			changeBackground();
		}
	}
	function keydownFunc(e) {
		if(scrolling==false)
		{
			scrolling=true;
			setTimeout(function(){scrolling=false;}, 1200);

			if(e.keyCode==40)
			{
				scrollDown();
				vinylTransition();
				changeBackground();
			}
			else if(e.keyCode==38)
			{
				vinylTransition();
				scrollUp();
				changeBackground();
			}
		}
	}
	var active = 0;

	function scrollDown() {
		shows[active].style.opacity = 0;
		shows[active].style.top = '-100%';
		fadeOutName();
		if(active==shows.length-1)
		{
			active=0;
		}
		else
			active++;
		fadeInName();
		shows[active].style.transitionDuration = '0s';
		shows[active].style.top = '100%';
		shows[active].style.transitionDuration = '1s';
		shows[active].style.opacity = 1;
		shows[active].style.top = '0';
	}
	function scrollUp() {
		shows[active].style.opacity = 0;
		shows[active].style.top = '100%';
		fadeOutName();
		if(active==0)
			active=shows.length-1;
		else
			active--;
		fadeInName();
		shows[active].style.transitionDuration = '0s';
		shows[active].style.top = '-100%';
		shows[active].style.transitionDuration = '1s';
		shows[active].style.opacity = 1;
		shows[active].style.top = '0';
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

	function changeBackground() {
		bodyWrapper.style.backgroundColor=bgs[active];
		showsWrapper.style.backgroundColor=bgs[active];
	}

	function fadeOutName() {
		showName[active].style.opacity=0;
	}

	function fadeInName() {
		showName[active].style.opacity=1;
	}
}


init();
