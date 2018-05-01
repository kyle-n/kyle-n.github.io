//Wait to load
document.addEventListener('DOMContentLoaded', function() {

	 //Grab background color settings, if they exist
	 var nightIn = '';
	 var night = false;
	 var doc = document.querySelector('html');
	 var nightButton = document.querySelector('#nightmode');
	 try {
        nightIn = localStorage.getItem('nightMode');

		  //Set night mode on page load
        if (nightIn === 'y') {
            night = true;
				doc.style['background-color'] = 'black';
				doc.style['color'] = 'white';
				nightButton.innerHTML('&#9728;');
        }
	 }
	 catch (error) {
        localStorage.setItem('nightMode', 'n')
	 }

	 //Toggle footnotes when button is clicked
	 var visible = false;
    document.querySelector('.fn_button').addEventListener('click', 
      function(e) {
        var fn = e.nextSibling();
		  if (visible) {
            fn.
		  }
	 });
});
