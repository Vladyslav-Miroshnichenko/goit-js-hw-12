import { createGalleryCardTemplate } from './js/render-funktion';
import { fetchEl } from './js/pixabay-api';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const formEl = document.querySelector('.js-search-form');
const galleryEl = document.querySelector('.js-gallery');
const loader = document.querySelector('.loader');

const startLoader = () => {
  loader.classList.remove('is-hidden');
};
const finishLoader = () => {
  loader.classList.add('is-hidden');
};

const onSearchFormEl = event => {
  event.preventDefault();

  const searchValue = formEl.elements.user_query.value;

  startLoader();

  fetchEl(searchValue)
    .then(data => {
      if (data.hits.length === 0) {
        iziToast.error({
          title: 'Error',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
        });
        galleryEl.innerHTML = '';
        formEl.reset();
        finishLoader();
        return;
      }

      const galleryCardsTemplate = data.hits
        .map(imgDetails => createGalleryCardTemplate(imgDetails))
        .join('');

      galleryEl.innerHTML = galleryCardsTemplate;
      formEl.reset();
      finishLoader();
      const lightbox = new SimpleLightbox('.js-gallery a', {
        captionsData: 'alt',
        captionDelay: 250,
      });
      lightbox.refresh();
    })

    .catch(error => {
      console.log(error);
    });
};

formEl.addEventListener('submit', onSearchFormEl);
