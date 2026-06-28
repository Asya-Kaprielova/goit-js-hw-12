import SimpleLightbox from 'simplelightbox';
import "simplelightbox/dist/simple-lightbox.min.css";

const galleryContainer = document.querySelector('.gallery');
const loaderContainer = document.querySelector('.loader-container');
const loadMoreBtn = document.querySelector('.load-more-btn');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function createGallery(images) {
  const markup = images
    .map(
      ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
      <li class="gallery-item">
        <a class="gallery-link" href="${largeImageURL}">
          <img class="gallery-image" src="${webformatURL}" alt="${tags}" />
        </a>
        <div class="info-wrapper">
          <p class="info-item"><b>Likes</b><br>${likes}</p>
          <p class="info-item"><b>Views</b><br>${views}</p>
          <p class="info-item"><b>Comments</b><br>${comments}</p>
          <p class="info-item"><b>Downloads</b><br>${downloads}</p>
        </div>
      </li>`
    )
    .join('');

  galleryContainer.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

export function clearGallery() {
  galleryContainer.innerHTML = '';
}

export function showLoader() {
  loaderContainer.classList.remove('is-hidden');
}

export function hideLoader() {
  loaderContainer.classList.add('is-hidden');
}

export function showLoadMoreBtn() {
  loadMoreBtn.classList.remove('is-hidden');
}

export function hideLoadMoreBtn() {
  loadMoreBtn.classList.add('is-hidden');
}