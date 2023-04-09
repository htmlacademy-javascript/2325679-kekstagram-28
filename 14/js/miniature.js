const picturePlaceElement = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const blockFiltersElement = document.querySelector('.img-filters');
const defaultFilterElement = document.querySelector('#filter-default');
const randomFilterElement = document.querySelector('#filter-random');
const discussedFilterElement = document.querySelector('#filter-discussed');

let posts = '';
const postsFragment = document.createDocumentFragment();

const getCountComments = (post) => {
  const countComments = post.comments.length;
  return countComments;
};

const sortComments = (a, b) => {
  const likesA = getCountComments(a);
  const likesB = getCountComments(b);

  return likesB - likesA;
};

const showBlockFilters = () => {
  blockFiltersElement.classList.remove('img-filters--inactive');
};

const renderMiniatures = (miniatures) => {
  const picturesElement = document.querySelectorAll('.picture');
  picturesElement.forEach((e) => e.remove());
  miniatures
    .forEach(({ url, likes, comments }) => {
      const pictureElement = pictureTemplate.cloneNode(true);
      pictureElement.querySelector('.picture__img').src = url;
      pictureElement.querySelector('.picture__likes').textContent = likes;
      pictureElement.querySelector('.picture__comments').textContent = comments.length;

      postsFragment.appendChild(pictureElement);
      posts = miniatures;
    });

  picturePlaceElement.appendChild(postsFragment);
};

const getPosts = () => posts;

const setDefaultFilter = (cb) => {
  defaultFilterElement.addEventListener('click', () => {
    defaultFilterElement.classList.add('img-filters__button--active');
    randomFilterElement.classList.remove('img-filters__button--active');
    discussedFilterElement.classList.remove('img-filters__button--active');
    cb();
  });
};

const setRandomFilter = (cb) => {
  randomFilterElement.addEventListener('click', () => {
    randomFilterElement.classList.add('img-filters__button--active');
    discussedFilterElement.classList.remove('img-filters__button--active');
    defaultFilterElement.classList.remove('img-filters__button--active');
    cb();
  });
};

const setDiscussedFilter = (cb) => {
  discussedFilterElement.addEventListener('click', () => {
    discussedFilterElement.classList.add('img-filters__button--active');
    defaultFilterElement.classList.remove('img-filters__button--active');
    randomFilterElement.classList.remove('img-filters__button--active');
    cb();
  });
};

export {renderMiniatures, getPosts, showBlockFilters, setDefaultFilter, setRandomFilter, setDiscussedFilter, sortComments};
