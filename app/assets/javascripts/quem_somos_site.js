$(document).ready(function(){
	$('#icarousel').iCarousel({
		easing: 'easeInOutQuint',
		slides: 5,
		animationSpeed: 700,
		pauseTime: 5000,
		perspective: 75,
		slidesSpace: 300,
		pauseOnHover: true,
		direction: "ltr",
		timer: "Bar",
		timerOpacity: 0.5,
		timerDiameter: 220,
		keyboardNav: false,
		mouseWheel: false,
		timerPadding: 3,
		timerStroke: 4,
		timerBarStroke: 0,
		timerColor: "#0F0",
		timerPosition: "bottom-right",
		timerX: 15,
		timerY: 30
	});
});
