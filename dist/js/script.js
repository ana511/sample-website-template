/*

Template: NinjaDojo Website Template
Version: 1.0
Design and Developed by: Ana

==================================================
[  Table of contents  ]
==================================================
 
:: Toggle Hamburger
:: Menu Scroll

==================================================
[ End table content ]
==================================================
*/

window.onload = function(){

	/*************************
      Toggle Hamburger
 *************************/

	let visible = false;
	let menuLinks = document.querySelectorAll('header .menu a');
	let hamburger = document.querySelector('header .menu .hamburger');

	hamburger.addEventListener('click', function(e){
		visible = !visible;

		Array.prototype.forEach.call(menuLinks, function(link){
			let display = visible === true ? 'block' : 'none';
			if(!link.classList.contains("hamburger")){
				link.setAttribute("style", `display : ${display};`);
			}
		});
	});

	/*************************
        Menu scroll
 *************************/

	//t = current time, b = start value, c = change in value, d = duration
	Math.easeInOutQuad = function (t, b, c, d) {
	  t /= d/2;
	  if (t < 1) return c/2*t*t + b;
	  t--;
	  return -c/2 * (t*(t-2) - 1) + b;
	};

	function scrollAnim(to, duration){
	  let start = document.documentElement.scrollTop || document.body.scrollTop;
	  let change = to - start;
	  let currentTime = 0;
	  let increment = 20;

	  let animateScroll = function(){
	    currentTime += increment;
	    let val = Math.easeInOutQuad(currentTime, start, change, duration);
	    window.scrollTo(0, val);

	    if(currentTime < duration){
	      setTimeout(animateScroll, increment);
	    }
	  };

	  animateScroll();
	}

	function attachScrollAnim(elem){
		elem.addEventListener('click', function(e){
			e.preventDefault();

			let target = document.querySelector(e.currentTarget.hash);
			let scrollTo = target.offsetTop;

			scrollAnim(scrollTo, 1250);
		});
	}

	Array.prototype.forEach.call(menuLinks, function(link){
		attachScrollAnim(link);
	});
};