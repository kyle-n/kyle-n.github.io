document.addEventListener('DOMContentLoaded', function () {

  // -------------------------------------------------------------------------
  // toggles outline -> filled -> outline icons
  const goSolid = link => {
    const linkIcon = link.querySelector('i.material-icons-outlined');
    if (linkIcon) {
      linkIcon.classList.remove('material-icons-outlined');
      linkIcon.classList.add('material-icons');
    }
  };
  const goOutlined = link => {
    const linkIcon = link.querySelector('i.material-icons');
    if (linkIcon) {
      linkIcon.classList.remove('material-icons');
      linkIcon.classList.add('material-icons-outlined');
    }
  };

  const links = document.querySelectorAll('a');
  links.forEach(link => {
    link.addEventListener('mouseenter', () => goSolid(link));
    link.addEventListener('mouseleave', () => goOutlined(link));
    link.addEventListener('touchstart', () => goSolid(link))
    link.addEventListener('touchend', () => goOutlined(link))
  });
  // -------------------------------------------------------------------------

});

