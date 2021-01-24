import imageCardTemplate from '../templates/imageCard.hbs';
import refs from './refs';

function updateImageMarkup(images) {
  const markup = imageCardTemplate(images);
  refs.gallery.insertAdjacentHTML('beforeend', markup);
  
 
  
  refs.gallery.addEventListener('click', onGalleryClick);
}

refs.closeModalWindow.addEventListener('click', onCloseModal);

function onGalleryClick(e) {
  e.preventDefault();

  if (e.target.nodeName !== 'IMG') {
    return;
  }

  const imgRef = e.target;
  
  refs.largeImage.src = imgRef.dataset.source;
  refs.largeImage.alt = imgRef.alt;
  
  onOpenModal();
}

function onOpenModal() {
  window.addEventListener('keydown', onPressESC);
  
  refs.modalWindow.classList.add('is-open');
  refs.overlap.addEventListener('click', onClickOverlap);
}



function onCloseModal() {
  window.removeEventListener('keydown', onPressESC);
  
  refs.modalWindow.classList.remove('is-open');
  refs.largeImage.src = '#';
  refs.largeImage.alt = ' ';
}

function onPressESC(e) {
  if (e.code === 'Escape') {
    onCloseModal();
  }
}

function onClickOverlap(e) {
  if (e.target === e.currentTarget) {
    onCloseModal();
  }
}

export default updateImageMarkup;