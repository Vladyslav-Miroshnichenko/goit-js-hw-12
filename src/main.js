import { createGalleryCardTemplate } from './js/render-funktion';
import { fetchEl } from './js/pixabay-api';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const formEl = document.querySelector('.js-search-form');
const galleryEl = document.querySelector('.js-gallery');
const loader = document.querySelector('.loader');
const loadMoreBtnEl = document.querySelector('.load-more');
let currentPages = 1;
let searchValue = '';

const startLoader = () => {
  loader.classList.remove('is-hidden');
};
const finishLoader = () => {
  loader.classList.add('is-hidden');
};

const onSearchFormEl = async event => {
  try {
    event.preventDefault();
    currentPages = 1;

    searchValue = formEl.elements.user_query.value;

    startLoader();

    const response = await fetchEl(searchValue, currentPages);
    console.log(response);

    if (response.data.hits.length === 0) {
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

    const galleryCardsTemplate = response.data.hits
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
    loadMoreBtnEl.classList.remove('is-hidden');
  } catch (error) {
    console.log(error);
  }
};
const onLoadMoreClick = async event => {
  try {
    currentPages++;

    const response = await fetchEl(searchValue, currentPages);
    const galleryCardsTemplate = response.data.hits
      .map(imgDetails => createGalleryCardTemplate(imgDetails))
      .join('');

    galleryEl.insertAdjacentHTML('beforeend', galleryCardsTemplate);
    const { height: cardHeight } =
      galleryEl.firstElementChild.getBoundingClientRect();
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
    const totalPages = Math.ceil(response.data.totalHits / 15);
    if (currentPages >= totalPages) {
      loadMoreBtnEl.classList.add('is-hidden');
      iziToast.info({
        title: 'info',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }
  } catch (error) {
    console.log(error);
  }
};

formEl.addEventListener('submit', onSearchFormEl);
loadMoreBtnEl.addEventListener('click', onLoadMoreClick);
