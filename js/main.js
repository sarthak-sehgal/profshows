function init() {
	var bgs = ['#C50138', 'blue', 'green', 'cyan', 'orange'];
	
	document.addEventListener("wheel", wheelFunc);
	document.addEventListener("keydown", keydownFunc);

	// getting elements
	var vinyl = document.getElementById('vinyl');
	var profshowName = document.getElementById('ft-name');
	var bodyWrapper = document.getElementById('body-wrapper');
	var showsWrapper = document.getElementById('showcasing-wrapper');
	var shows = document.getElementsByClassName('showcase-item');
	var showName = document.getElementsByClassName('ft-name');
	// getting mobile elements
	var items_mobile = document.getElementsByClassName('showcase-item-mobile');
	var items_shadow = document.getElementsByClassName('showcase-shadow-mobile');

	for(i=1; i<items_mobile.length; i++)
	{
		items_mobile[i].style.left =  i*70 + 'vw';
		items_mobile[i].style.transform =  'scale(0.7)';
		items_mobile[i].style.zIndex =  '1';
		// items_shadow[i].style.left = i*150 + 'vw';
	}

	var scrolling=false;

	shows[0].style.top = '0';
	bodyWrapper.style.background = bgs[0];
	showsWrapper.style.background = bgs[0];


	function wheelFunc(e) {
		e.preventDefault();
		if(scrolling==false)
		{
			scrolling=true;
			setTimeout(function(){scrolling=false;}, 800);

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
			setTimeout(function(){scrolling=false;}, 800);

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
		shows[active].style.opacity = 1;
		shows[active].style.top = '0';
	}
	function vinylTransition(){
		vinyl.style.transform = "translateX(-88px)";
		vinyl.style.opacity = "0";
		setTimeout(function(){
			vinyl.style.transform = "translateX(0px)";
			vinyl.style.opacity = "1";
		}, 400);
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
