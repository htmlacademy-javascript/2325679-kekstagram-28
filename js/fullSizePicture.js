import {posts} from './miniature.js';
import {isEscapeKey} from './util.js';

const pictures = document.querySelector('.pictures');
const fullSizePicturePopup = document.querySelector('.big-picture');
const fullSizePictureBlock = document.querySelector('.big-picture__img');
const fullSizePicture = fullSizePictureBlock.querySelector('img');
const likesCount = document.querySelector('.likes-count');
const commentsCount = document.querySelector('.comments-count');
const descriptionPicture = document.querySelector('.social__caption');
const exitButton = document.querySelector('.big-picture__cancel');
const commentsSocial = document.querySelector('.social__comments');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFullSizePictures();
  }
};

const showFullSizePictures = (evt) => {
  if (evt.target.matches('img[class="picture__img"]')) {
    fullSizePicturePopup.classList.remove('hidden');
    fullSizePicture.src = evt.target.src;
    likesCount.textContent = evt.target.closest('.picture').querySelector('.picture__likes').textContent;
    commentsCount.textContent = evt.target.closest('.picture').querySelector('.picture__comments').textContent;

    document.querySelector('body').classList.add('modal-open');
    document.addEventListener('keydown', onDocumentKeydown);
    for (let i = 0; i < posts.length; i++) {
      if (evt.target.src.includes(posts[i].url)) {
        descriptionPicture.textContent = posts[i].description;
        commentsSocial.innerHTML = '';
        for (let j = 0; j < posts[i].comments.length; j++) {

          const liElementPicture = document.createElement('li');
          liElementPicture.classList.add('social__comment');
          commentsSocial.appendChild(liElementPicture);

          const imgElementPicture = document.createElement('img');
          imgElementPicture.classList.add('social__picture');
          imgElementPicture.src = posts[i].comments[j].avatar;
          imgElementPicture.alt = posts[i].comments[j].name;
          imgElementPicture.width = '35';
          imgElementPicture.height = '35';
          liElementPicture.appendChild(imgElementPicture);

          const pElementPicture = document.createElement('p');
          pElementPicture.classList.add('social__text');
          pElementPicture.textContent = posts[i].comments[j].message;
          liElementPicture.appendChild(pElementPicture);
        }
      }
    }
    document.querySelector('.social__comment-count').classList.add('hidden');
    document.querySelector('.comments-loader').classList.add('hidden');
  }
};


const closeFullSizePictures = () => {
  fullSizePicturePopup.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

exitButton.addEventListener('click', () => {
  closeFullSizePictures();
});

pictures.addEventListener('click', showFullSizePictures);

export {showFullSizePictures};
