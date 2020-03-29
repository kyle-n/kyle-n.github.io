//On DOM load (Before images and all other scripts
document.addEventListener('DOMContentLoaded', function () {

  // -------------------------------------------------------------------------
  // toggles outline -> filled -> outline icons
  const links = document.querySelectorAll('a');
  links.forEach(link => {
    link.addEventListener('mouseenter', () => {
      const linkIcon = link.querySelector('i.material-icons-outlined');
      if (linkIcon) {
        linkIcon.classList.remove('material-icons-outlined');
        linkIcon.classList.add('material-icons');
      }
    });
    link.addEventListener('mouseleave', () => {
      const linkIcon = link.querySelector('i.material-icons');
      if (linkIcon) {
        linkIcon.classList.add('material-icons-outlined');
        linkIcon.classList.remove('material-icons');
      }
    })
  });
  // -------------------------------------------------------------------------

});

