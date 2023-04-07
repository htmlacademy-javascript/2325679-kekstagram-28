import {posts} from './miniature.js';
import {isEscapeKey} from './util.js';

const IMG_WIDTH = '35';
const IMG_HEIGHT = '35';

const COMMENTS_PART = 5;

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

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFullSizePictures();
  }
};

const createComment = (comment) => {
  const liPictureElement = document.createElement('li');
  liPictureElement.classList.add('social__comment');
  commentsSocialElement.appendChild(liPictureElement);

  const imgPictureElement = document.createElement('img');
  imgPictureElement.classList.add('social__picture');
  imgPictureElement.src = comment.avatar;
  imgPictureElement.alt = comment.name;
  imgPictureElement.width = IMG_WIDTH;
  imgPictureElement.height = IMG_HEIGHT;
  liPictureElement.appendChild(imgPictureElement);

  const pElementPicture = document.createElement('p');
  pElementPicture.classList.add('social__text');
  pElementPicture.textContent = comment.message;
  liPictureElement.appendChild(pElementPicture);

  return liPictureElement;
};

const showFullSizePictures = (evt) => {
  if (evt.target.matches('img[class="picture__img"]')) {
    fullSizePicturePopupElement.classList.remove('hidden');
    commentsSocialElement.innerHTML = '';
    fullSizePictureElement.src = evt.target.src;
    likesCountElement.textContent = evt.target.closest('.picture').querySelector('.picture__likes').textContent;

    document.querySelector('body').classList.add('modal-open');
    document.addEventListener('keydown', onDocumentKeydown);

    let commentsShown = 0;

    const commentsPostsArray = [];
    for (let i = 0; i < posts.length; i++) {
      if (evt.target.src.includes(posts[i].url)) {
        descriptionPictureElement.textContent = posts[i].description;
        commentsPostsArray.push(posts[i].comments);
      }
    }
    const renderComments = (commentsArray) => {
      commentsShown += COMMENTS_PART;
      if (commentsShown >= commentsArray.length) {
        commentsLoaderElement.classList.add('hidden');
        commentsShown = commentsArray.length;
      } else {
        commentsLoaderElement.classList.remove('hidden');
      }

      const commentFragment = document.createDocumentFragment();
      for (let i = 0; i < commentsShown; i++) {
        const commentElement = createComment(commentsArray[i]);
        commentFragment.append(commentElement);
      }
      commentsSocialElement.innerHTML = '';
      commentsSocialElement.append(commentFragment);
      commentsSocialCountElement.innerHTML = `${commentsShown} из <span class="comments-count">${commentsArray.length}</span> комментариев`;
    };

    renderComments(commentsPostsArray[0]);
    commentsLoaderElement.addEventListener('click', () => {
      renderComments(commentsPostsArray[0]);
    });
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
