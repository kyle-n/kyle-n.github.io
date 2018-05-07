$(document).ready(function() {

	//Grab background color settings, if they exist
	var nightIn = '';
	var night = false;
	try {
		nightIn = localStorage.getItem('nightMode');

		//Set night mode on page load
		if (nightIn === 'y') {
			goNight();
		}
	}
	catch (error) {
		localStorage.setItem('nightMode', 'n')
	}

	//Toggle footnotes when button is clicked
	var visible = false;
	$('.fn_button').on('click', function() {
		var $fn = $(this).next();
		if (visible) {
			$fn.fadeOut();
			visible = false;
		}
		else {
			$fn.fadeIn();
			$fn.css('display', 'block');
			visible = true;
		}
	});

	//Background color settings
	$('#nightmode').on('click', function() {
		if (night) {
			goDay();
		}
		else {
			goNight();
		}
	});

	//Activate night mode
	function goNight() {
		$('html').css('background-color', 'black')
			.css('color', 'white');
		$('#nightmode').html('&#9728;');
		$('blockquote p').css('color', 'black');
		night = true;
		localStorage.setItem('nightMode', 'y');
	}

	//Activate day mode
	function goDay() {
			$('html').css('background-color', '#fdfdfd')
				.css('color', 'black');
			$('#nightmode').html('&#9790;');
			night = false;
			localStorage.setItem('nightMode', 'n');
	}
});
