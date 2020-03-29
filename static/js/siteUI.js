//On DOM load (Before images and all other scripts
document.addEventListener('DOMContentLoaded', function () {

  const links = document.querySelectorAll('a');
  console.log(links)
  links.forEach(link => {
    link.addEventListener('mouseenter', e => {
      console.log(e)
      const linkIcon = link.querySelector('i.material-icons-outlined');
      if (linkIcon) {
        linkIcon.classList.remove('material-icons-outlined');
        linkIcon.classList.add('material-icons');
      }
    });
    link.addEventListener('mouseleave', () => {
      console.log('leave')
      const linkIcon = link.querySelector('i.material-icons-outlined');
      if (linkIcon) {
        linkIcon.classList.add('material-icons-outlined');
        linkIcon.classList.remove('material-icons');
      }
    })
  });

});

