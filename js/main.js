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
	var shadow = document.getElementById('showcase-shadow');
	// getting mobile elements
	var items_mobile = document.getElementsByClassName('showcase-item-mobile');
	var items_shadow = document.getElementsByClassName('showcase-shadow-mobile');
	var mobileMenuWrapper = document.getElementById('main-menu-wrapper');
	// var isMobileMenuOpen = false;

	for(i=1; i<items_mobile.length; i++)
	{
		items_mobile[i].style.left =  '100%';
		if(i==1)
			items_mobile[i].style.transform =  'translateX(20%) scale(0.8)';
		else
			items_mobile[i].style.transform =  'translateX(50%) scale(0.8)';
		items_mobile[i].style.zIndex =  (items_mobile.length-i);
		// items_shadow[i].style.left = i*150 + 'vw';
	}

	var scrolling=false;

	shows[0].style.top = '0';
	bodyWrapper.style.background = bgs[0];
	showsWrapper.style.background = bgs[0];

	var active = 0;
	var activeMobile = 0;


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
			vinylTransition("14vh");
			changeBackground(active);
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
				vinylTransition("14vh");
				changeBackground(active);
			}
			else if(e.keyCode==38)
			{
				vinylTransition("14vh");
				scrollUp();
				changeBackground(active);
			}
			activeMobile=active;
		}
	}

	function scrollDown() {
		shows[active].style.opacity = 0;
		shows[active].style.top = '-100%';
		fadeOutName(active);
		if(active==shows.length-1)
		{
			active=0;
		}
		else
			active++;
		fadeInName(active);
		shows[active].style.opacity = 1;
		shows[active].style.top = '0';
	}
	function scrollUp() {
		shows[active].style.opacity = 0;
		shows[active].style.top = '100%';
		fadeOutName(active);
		if(active==0)
			active=shows.length-1;
		else
			active--;
		fadeInName(active);
		shows[active].style.opacity = 1;
		shows[active].style.top = '0';
	}
	function vinylTransition(vinylTranslate){
		vinyl.style.transform = "translateX(-"+vinylTranslate+")";
		vinyl.style.opacity = "0";
		setTimeout(function(){
			vinyl.style.transform = "translateX(0px)";
			vinyl.style.opacity = "1";
		}, 400);
	}

	function changeBackground(active) {
		bodyWrapper.style.backgroundColor=bgs[active];
		showsWrapper.style.backgroundColor=bgs[active];
	}

	function fadeOutName(active) {
		showName[active].style.opacity=0;
	}

	function fadeInName(active) {
		showName[active].style.opacity=1;
	}

	// ZingTouch javascript
	var mainSection = document.getElementById('main');
	var touchRegion = new ZingTouch.Region(mainSection);
	var touchNext = new ZingTouch.Region(document.getElementById("next"));
	var touchPrev = new ZingTouch.Region(document.getElementById("prev"));

	touchRegion.bind(mainSection, 'swipe', function(e){
		var direction = e.detail.data[0].currentDirection;

		if(parseInt(screen.width)<=480)
		{
			if((direction >= 315 && direction<=360) || (direction>=0 && direction < 45))
				rightSwipe();
			else if(direction >= 135 && direction <225)
				leftSwipe();
		}
		else
		{
			if(direction >= 45 && direction <135)
				topSwipe();
			else if(direction>=225 && direction<315)
				bottomSwipe();
		}
	});

	function rightSwipe() {
		if(activeMobile!=0)
		{
			if(activeMobile<=items_mobile.length-2)
			{
				items_mobile[activeMobile].style.zIndex =  items_mobile[activeMobile+1].style.zIndex+100;
				items_mobile[activeMobile+1].style.transform = 'translateX(100%)';
			}
			items_mobile[activeMobile].style.left =  '100%';
			items_mobile[activeMobile].style.transform =  'translateX(20%) scale(0.8)';
			fadeOutName(activeMobile);
			activeMobile--;
			fadeInName(activeMobile);
			items_mobile[activeMobile].style.left =  '50%';
			items_mobile[activeMobile].style.transform =  'translateX(0%) scale(1)';

			if(activeMobile-1>=0)
				items_mobile[activeMobile-1].style.transform =  'translateX(-20%) scale(0.8)';

			changeBackground(activeMobile);
			console.log();
		}
	}

	function leftSwipe() {
		if(activeMobile!=items_mobile.length-1)
		{
			if(activeMobile>=1)
			{
				items_mobile[activeMobile].style.zIndex =  items_mobile[activeMobile-1].style.zIndex+100;
				items_mobile[activeMobile-1].style.transform = 'translateX(-100%)';
			}
			items_mobile[activeMobile].style.left =  '0%';
			items_mobile[activeMobile].style.transform =  'translateX(-20%) scale(0.8)';
			fadeOutName(activeMobile);
			activeMobile++;
			fadeInName(activeMobile);
			items_mobile[activeMobile].style.left =  '50%';
			items_mobile[activeMobile].style.transform =  'translateX(0%) scale(1)';

			if(activeMobile+1<=items_mobile.length-1)
				items_mobile[activeMobile+1].style.transform =  'translateX(20%) scale(0.8)';

			changeBackground(activeMobile);
			console.log();
		}
	}

	function topSwipe() {
		scrollDown();
		vinylTransition("7vw");
		changeBackground(active);
	}

	function bottomSwipe() {
		scrollUp();
		vinylTransition("7vw");
		changeBackground(active);
	}
	touchNext.bind(document.getElementById("next"), 'tap', function(e){
		if(activeMobile!=items_mobile.length-1)
		{
			leftSwipe();
		}
	});
	touchPrev.bind(document.getElementById("prev"), 'tap', function(e){
		if(activeMobile!=0)
		{
			rightSwipe();
		}
	});

	// navigation transitions and animations
	var thumbIcons = document.getElementsByClassName('thumbIcons')[0];

	thumbIcons.onmouseover = function ()
	{
		if(parseInt(screen.width)<480)
		{
			showsWrapper.style.transform = "translateX(7vw)";
			shadow.style.transform = "translateX(7vw)";
		}
		else
		{
			showsWrapper.style.transform = "translateX(14vh)";
			shadow.style.transform = "translateX(14vh)";
		}
	}
	thumbIcons.onmouseout = function()
	{
		showsWrapper.style.transform = "translateX(0vh)";
		shadow.style.transform = "translateX(0vh)";
	}
}


init();
