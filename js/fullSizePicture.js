import {posts} from './miniature.js';
import {isEscapeKey} from './util.js';

const picturesElement = document.querySelector('.pictures');
const fullSizePicturePopupElement = document.querySelector('.big-picture');
const fullSizePictureBlockElement = document.querySelector('.big-picture__img');
const fullSizePictureElement = fullSizePictureBlockElement.querySelector('img');
const likesCountElement = document.querySelector('.likes-count');
const commentsCountElement = document.querySelector('.comments-count');
const descriptionPictureElement = document.querySelector('.social__caption');
const exitButtonElement = document.querySelector('.big-picture__cancel');
const commentsSocialElement = document.querySelector('.social__comments');

const IMG_WIDTH = '35';
const IMG_HEIGHT = '35';

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFullSizePictures();
  }
};

const showFullSizePictures = (evt) => {
  if (evt.target.matches('img[class="picture__img"]')) {
    fullSizePicturePopupElement.classList.remove('hidden');
    fullSizePictureElement.src = evt.target.src;
    likesCountElement.textContent = evt.target.closest('.picture').querySelector('.picture__likes').textContent;
    commentsCountElement.textContent = evt.target.closest('.picture').querySelector('.picture__comments').textContent;

    document.querySelector('body').classList.add('modal-open');
    document.addEventListener('keydown', onDocumentKeydown);
    for (let i = 0; i < posts.length; i++) {
      if (evt.target.src.includes(posts[i].url)) {
        descriptionPictureElement.textContent = posts[i].description;
        commentsSocialElement.innerHTML = '';
        for (let j = 0; j < posts[i].comments.length; j++) {

          const liPictureElement = document.createElement('li');
          liPictureElement.classList.add('social__comment');
          commentsSocialElement.appendChild(liPictureElement);

          const imgPictureElement = document.createElement('img');
          imgPictureElement.classList.add('social__picture');
          imgPictureElement.src = posts[i].comments[j].avatar;
          imgPictureElement.alt = posts[i].comments[j].name;
          imgPictureElement.width = IMG_WIDTH;
          imgPictureElement.height = IMG_HEIGHT;
          liPictureElement.appendChild(imgPictureElement);

          const pElementPicture = document.createElement('p');
          pElementPicture.classList.add('social__text');
          pElementPicture.textContent = posts[i].comments[j].message;
          liPictureElement.appendChild(pElementPicture);
        }
      }
    }
    document.querySelector('.social__comment-count').classList.add('hidden');
    document.querySelector('.comments-loader').classList.add('hidden');
  }
};


function closeFullSizePictures() {
  fullSizePicturePopupElement.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

exitButtonElement.addEventListener('click', () => {
  closeFullSizePictures();
});

picturesElement.addEventListener('click', showFullSizePictures);

export {showFullSizePictures};
