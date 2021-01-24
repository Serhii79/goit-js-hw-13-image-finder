import './styles.css';

import apiService from './js/apiService';
import refs from './js/refs';
import updateImageMarkup from './js/update-image-markup';


refs.searchForm.addEventListener('submit', event => {
  event.preventDefault();
  
  const form = event.currentTarget;
  apiService.query = form.elements.query.value;
  refs.gallery.innerHTML = "";
  apiService.resetPage();
  refs.loadMoreImagesBtn.classList.add('is-hidden');
    
  apiService.fetchImages()
    .then(images => {
      if (images) {
        updateImageMarkup(images);
        refs.loadMoreImagesBtn.classList.remove('is-hidden');
      }
    })
  
});


refs.loadMoreImagesBtn.addEventListener('click', onLoadMoreBtnClick);
 

function onLoadMoreBtnClick() {
  apiService.fetchImages().then(images => {
  updateImageMarkup(images);
  
  window.scrollBy({
  top: window.innerHeight,
  left: 0,
  behavior: 'smooth'});
  });
}


