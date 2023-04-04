import {isEscapeKey} from './util.js';
import {sendData} from './api.js';
import {resetData} from './edit-img.js';
import {showAlert} from './util.js';

const COMMENT_LENGTH = 140;
const HASHTAG = /^#[a-zа-яё0-9]{1,19}$/i;
const HASHTAGS_LENGTH = 5;

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
    closeFormEditImg();
  }
};

const openFormEditImg = function () {
  document.addEventListener('keydown', onDocumentKeydown);
  formEditImgElement.classList.remove('hidden');
  bodyElement.classList.add('.modal-open');
};

function closeFormEditImg () {
  document.removeEventListener('keydown', onDocumentKeydown);
  formEditImgElement.classList.add('hidden');
  bodyElement.classList.remove('.modal-open');
  fileUploadElement.value = '';
  hashtagsFieldElement.value = '';
  commentFieldElement.value = '';
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

  const isValidLength = hashtagsArray.length <= HASHTAGS_LENGTH;

  const isValidHashtag = hashtagsArray.every((tag) => HASHTAG.test(tag));

  const isDuplicate = new Set(hashtagsArray).size !== hashtagsArray.length;

  return isValidLength && isValidHashtag && !isDuplicate;
};

pristine.addValidator(formElement.querySelector('.text__description'), validateComment, 'Длина комментария не может составлять больше 140 символов');

pristine.addValidator(formElement.querySelector('.text__hashtags'), validateHashtag, 'Введено некорректное значение хэштегов');

fileUploadElement.addEventListener('change', openFormEditImg);

cancelButtonElement.addEventListener('click', closeFormEditImg);

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


const onFormKeyDown = (evt, messageElement) => {
  if (isEscapeKey(evt)) {
    messageElement.classList.add('hidden');
  }
};

const onClickBehindForm = (evt, messageElement) => {
  if ((!evt.target.classList.contains('success__inner')) && (!evt.target.classList.contains('success__title'))) {
    messageElement.classList.add('hidden');
  }
};

const successFormUpload = function () {
  resetData();
  hashtagsFieldElement.value = '';
  commentFieldElement.value = '';
  const successTemplate = document.querySelector('#success').content.querySelector('.success');
  const successMessageElement = successTemplate.cloneNode(true);
  const successButtonElement = document.querySelector('.success__button');
  document.querySelector('body').appendChild(successMessageElement);
  successButtonElement.addEventListener('click', () => {
    //document.querySelector('body').removeChild(successMessageElement);
    successMessageElement.classList.add('hidden');
  });
  document.removeEventListener('keydown', onDocumentKeydown);
  document.addEventListener('keydown', onFormKeyDown(successMessageElement));
  document.addEventListener('click', onClickBehindForm(successMessageElement));
};

const failedFormUpload = function () {
  const failedTemplate = document.querySelector('#error').content.querySelector('.error');
  const failedMessageElement = failedTemplate.cloneNode(true);
  const failedButtonElement = document.querySelector('.error__button');
  failedButtonElement.addEventListener('click', () => {
    //document.querySelector('body').removeChild(failedMessageElement);
    failedMessageElement.classList.add('hidden');
  });
  document.querySelector('body').appendChild(failedMessageElement);
  document.removeEventListener('keydown', onDocumentKeydown);
  document.addEventListener('keydown', onFormKeyDown(failedMessageElement));
  document.addEventListener('click', onClickBehindForm(failedMessageElement));
};

document.removeEventListener('keydown', onFormKeyDown);
document.removeEventListener('click', onClickBehindForm);

const setImgFormSubmit = () => {
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      sendData(new FormData(evt.target)).then((response) => {
        if (response.ok) {
          successFormUpload();
        } else {
          failedFormUpload();
        }
      })
        .catch(() => {
          showAlert('Фотография не загружена. Попробуйте позже');
        });
    }
  });
};

setImgFormSubmit();
