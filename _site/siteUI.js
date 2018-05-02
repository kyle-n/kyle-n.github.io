$(document).ready(function() {

	//Grab background color settings, if they exist
	var nightIn = '';
	var night = false;
	try {
		nightIn = localStorage.getItem('nightMode');

		//Set night mode on page load
		if (nightIn === 'y') {
			night = true;
			$('html').css('background-color', 'black');
			$('html').css('color', 'white');
			$('#nightmode').html('&#9728;');
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

		//Night is on, turn it off
		if (night) {
			$('html').css('background-color', '#fdfdfd');
			$('html').css('color', 'black');
			$(this).html('&#9790;');

			//Set var and memory
			night = false;
			localStorage.setItem('nightMode', 'n');
		}

		//Night is off, turn it on
		else {
			$('html').css('background-color', 'black');
			$('html').css('color', 'white');
			$(this).html('&#9728;');

			//Set var and memory
			night = true;
			localStorage.setItem('nightMode', 'y');
		}
	});
});
