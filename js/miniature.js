const picturePlaceElement = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

let posts = '';
const postsFragment = document.createDocumentFragment();

const renderMiniatures = (miniatures) => {
  miniatures.forEach(({url, likes, comments}) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;

    postsFragment.appendChild(pictureElement);
    posts = miniatures;
  });
  picturePlaceElement.appendChild(postsFragment);
};
export {renderMiniatures, posts};
