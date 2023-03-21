import {isEscapeKey} from './util.js';

const COMMENT_LENGTH = 140;
const HASHTAG = /^#[a-zа-яё0-9]{1,19}$/i;

const fileUploadElement = document.querySelector('.img-upload__input');
const formEditImgElement = document.querySelector('.img-upload__overlay');
const bodyElement = document.querySelector('body');
const cancelButtonElement = document.querySelector('.img-upload__cancel');
const hashtagsFieldElement = document.querySelector('.text__hashtags');
const commentFieldElement = document.querySelector('.text__description');
const formElement = document.querySelector('.img-upload__form');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeformEditImg();
  }
};

const openformEditImg = function () {
  document.addEventListener('keydown', onDocumentKeydown);
  formEditImgElement.classList.remove('hidden');
  bodyElement.classList.add('.modal-open');
};

function closeformEditImg () {
  document.removeEventListener('keydown', onDocumentKeydown);
  formEditImgElement.classList.add('hidden');
  bodyElement.classList.remove('.modal-open');
  fileUploadElement.value = '';
}

const pristine = new Pristine(formElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper'
});

const validateComment = function (value) {
  return value.length <= COMMENT_LENGTH;
};

const validateHashtag = function (value) {
  const hashtagsArray = value.trim().toLowerCase().split(' ').filter((element) => (element !== null && element !== '' || element === 0));

  const isValidLength = hashtagsArray.length <= 5;

  const isValidHashtag = hashtagsArray.every((tag) => HASHTAG.test(tag));

  const isDuplicate = new Set(hashtagsArray).size !== hashtagsArray.length;

  return isValidLength && isValidHashtag && !isDuplicate;
};

pristine.addValidator(formElement.querySelector('.text__description'), validateComment, 'Длина комментария не может составлять больше 140 символов');

pristine.addValidator(formElement.querySelector('.text__hashtags'), validateHashtag, 'Введено некорректное значение хэштегов');

const submitForm = function (evt) {
  const isValid = pristine.validate();
  if (!isValid) {
    evt.preventDefault();
  }
};

fileUploadElement.addEventListener('change', openformEditImg);

cancelButtonElement.addEventListener('click', closeformEditImg);

hashtagsFieldElement.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
});

commentFieldElement.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
});

formElement.addEventListener('submit', submitForm);
