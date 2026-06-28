import iziToast from 'izitoast';
import "izitoast/dist/css/iziToast.min.css";

import { getImagesByQuery } from './js/pixabay-api.js';
import { 
  createGallery, 
  clearGallery, 
  showLoader, 
  hideLoader, 
  showLoadMoreBtn, 
  hideLoadMoreBtn 
} from './js/render-functions.js';

const searchForm = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more-btn');

let searchQuery = '';
let page = 1;
const perPage = 15;

searchForm.addEventListener('submit', handleSearch);
loadMoreBtn.addEventListener('click', handleLoadMore);

async function handleSearch(event) {
  event.preventDefault();

  const form = event.currentTarget;
  searchQuery = form.elements['search-text'].value.trim();

  if (searchQuery === '') {
    iziToast.warning({ message: 'Please enter a valid search term!', position: 'topRight' });
    return;
  }

  page = 1;
  clearGallery();
  hideLoadMoreBtn();
  showLoader();

  try {
    const data = await getImagesByQuery(searchQuery, page);

    if (data.hits.length === 0) {
      iziToast.error({
        message: 'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      return;
    }

    createGallery(data.hits);
    checkPaginationStatus(data.totalHits);

  } catch (error) {
    iziToast.error({ title: 'Error', message: error.message, position: 'topRight' });
  } finally {
    hideLoader();
  }
}

async function handleLoadMore() {
  page += 1;
  
  hideLoadMoreBtn();
  showLoader();

  try {
    const data = await getImagesByQuery(searchQuery, page);
    createGallery(data.hits);
    smoothScroll();
    checkPaginationStatus(data.totalHits);

  } catch (error) {
    iziToast.error({ title: 'Error', message: error.message, position: 'topRight' });
  } finally {
    hideLoader();
  }
}

function checkPaginationStatus(totalHits) {
  const maxPages = Math.ceil(totalHits / perPage);

  if (page >= maxPages) {
    hideLoadMoreBtn();
    iziToast.info({
      message: "We're sorry, but you've reached the end of search results.",
      position: 'topRight',
    });
  } else {
    showLoadMoreBtn();
  }
}

function smoothScroll() {
  const firstGalleryItem = document.querySelector('.gallery-item');
  if (firstGalleryItem) {
    const { height: cardHeight } = firstGalleryItem.getBoundingClientRect();
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }
}