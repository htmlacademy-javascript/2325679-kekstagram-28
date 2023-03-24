import {posts} from './miniature.js';
import {isEscapeKey} from './util.js';

const picturesElement = document.querySelector('.pictures');
const fullSizePicturePopupElement = document.querySelector('.big-picture');
const fullSizePictureBlockElement = document.querySelector('.big-picture__img');
const fullSizePictureElement = fullSizePictureBlockElement.querySelector('img');
const likesCountElement = document.querySelector('.likes-count');
const descriptionPictureElement = document.querySelector('.social__caption');
const exitButtonElement = document.querySelector('.big-picture__cancel');
const commentsSocialElement = document.querySelector('.social__comments');
const commentsSocialCountElement = document.querySelector('.social__comment-count');
const commentsLoaderElement = document.querySelector('.comments-loader');

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
    commentsSocialElement.innerHTML = '';
    fullSizePictureElement.src = evt.target.src;
    likesCountElement.textContent = evt.target.closest('.picture').querySelector('.picture__likes').textContent;
    const allCommentsCountElement = evt.target.closest('.picture').querySelector('.picture__comments').textContent;

    document.querySelector('body').classList.add('modal-open');
    document.addEventListener('keydown', onDocumentKeydown);
    for (let i = 0; i < posts.length; i++) {
      if (evt.target.src.includes(posts[i].url)) {
        descriptionPictureElement.textContent = posts[i].description;
        commentsLoaderElement.classList.remove('hidden');
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
          commentsSocialCountElement.innerHTML = `${j + 1} из <span class="comments-count">${allCommentsCountElement}</span> комментариев`;

          if (posts[i].comments.length === 5) {
            commentsLoaderElement.classList.add('hidden');
          }

          if (j >= 5) {
            liPictureElement.classList.add('hidden');
            commentsSocialCountElement.innerHTML = `5 из <span class="comments-count">${allCommentsCountElement}</span> комментариев`;

            commentsLoaderElement.addEventListener('click', () => {
              commentsSocialCountElement.innerHTML = `${j + 1} из <span class="comments-count">${allCommentsCountElement}</span> комментариев`;
              liPictureElement.classList.remove('hidden');
              commentsLoaderElement.classList.add('hidden');
            });
          }

        }
        if (posts[i].comments.length < 5) {
          commentsLoaderElement.classList.add('hidden');
        }
      }
    }

  }
};

function closeFullSizePictures() {
  commentsSocialElement.innerHTML = '';
  fullSizePicturePopupElement.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

exitButtonElement.addEventListener('click', () => {
  closeFullSizePictures();
});

picturesElement.addEventListener('click', showFullSizePictures);

export {showFullSizePictures};
