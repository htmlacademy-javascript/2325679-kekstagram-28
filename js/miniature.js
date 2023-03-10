import {createPosts} from './data.js';

const picturePlace = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const posts = createPosts();

const postsFragment = document.createDocumentFragment();

posts.forEach(({url, likes, comments}) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;

  postsFragment.appendChild(pictureElement);
});

picturePlace.appendChild(postsFragment);
