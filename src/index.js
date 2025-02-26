//import GLightbox from 'glightbox';
import './style.scss';
import './fontawesome.scss';
import './js/bootstrap.bundle.js';

// Lightbox
// const lightbox = GLightbox({
//   href: 'https://www.youtube.com/watch?v=Ga6RYejo6Hk',
//   type: 'video',
//   source: 'youtube', //vimeo, youtube or local
//   width: 900,
// });

const navLinkRef = document.querySelectorAll('.nav-link');

for (
  let navLinkRefIndex = 0;
  navLinkRef.length > navLinkRefIndex;
  navLinkRefIndex++
) {
  navLinkRef[navLinkRefIndex].addEventListener('click', (e) => {
    for (
      let navLinkRefIndex = 0;
      navLinkRef.length > navLinkRefIndex;
      navLinkRefIndex++
    ) {
      navLinkRef[navLinkRefIndex].classList.remove('active');
    }
    e.target.classList.add('active');
  });
}
