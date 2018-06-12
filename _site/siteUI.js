//On DOM load (Before images and all other scripts
document.addEventListener('DOMContentLoaded', function () {
    
    //Store common elements for quick reference
    var page = document.querySelector('html');
    var nightModeButton = document.querySelector('#nightmode');
    var blockquoteParagraphs = document.querySelector('blockquote p');
    
    //Change page css for light text, dark background
    const goNight = function () {
        page.style.backgroundColor = 'black';
        page.style.color = 'white';
        nightModeButton.innerHTML = '&#9728;';
        if (blockquoteParagraphs != null) blockquoteParagraphs.style.color = 'black';
        night = true;
        localStorage.setItem('nightMode', 'y');
    };
    
    //Change page css for light background, dark text
    const goDay = function () {
        page.style.backgroundColor = '#fdfdfd';
        page.style.color = 'black';
        nightModeButton.innerHTML = '&#9790;';
        night = false;
        localStorage.setItem('nightMode', 'n');
    };

	//Grab background color settings, if they exist
	var nightIn = '';
	var night = false;
	try {
        //Set night mode on load if it was selected
        let isNight = localStorage.getItem('nightMode');
        console.log('night', isNight)
		if (isNight == 'y') {
			goNight();
		}
	}
	catch (error) {
		localStorage.setItem('nightMode', 'n')
	}

	//Toggle footnotes when button is clicked
	var visible = false;
	var footnotes = document.querySelectorAll('.fn_button');
	if (footnotes != null) {
        for (let i = 0; i < footnotes.length; i++) {
            footnotes[i].addEventListener('click', function () {
                var fn = this.nextSibling;
                if (visible) {
                    fn.classList.remove('fn_text_showing');
                    fn.classList.add('fn_text_hidden');
                    visible = false;
                }
                else {
                    fn.classList.remove('fn_text_hidden');
                    fn.classList.add('fn_text_showing');
                    visible = true;
                }
            });
        }
	}
    
    //Night mode toggle button
    nightModeButton.addEventListener('click', function () {
        if (night) goDay();
        else goNight();
    });

});

