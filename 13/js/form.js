import {isEscapeKey} from './util.js';
import {sendData} from './api.js';
import {resetData} from './edit-img.js';

const COMMENT_LENGTH = 140;
const HASHTAG = /^#[a-zа-яё0-9]{1,19}$/i;
const HASHTAGS_LENGTH = 5;

const SUBMIT_BUTTON_TEXT = {
  IDLE: 'Опубликовать',
  SENDING: 'Опубликовываю...'
};

const fileUploadElement = document.querySelector('.img-upload__input');
const formEditImgElement = document.querySelector('.img-upload__overlay');
const bodyElement = document.querySelector('body');
const cancelButtonElement = document.querySelector('.img-upload__cancel');
const hashtagsFieldElement = document.querySelector('.text__hashtags');
const commentFieldElement = document.querySelector('.text__description');
const formElement = document.querySelector('.img-upload__form');
const submitButtonElement = document.querySelector('.img-upload__submit');

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


const successFormUpload = function () {
  resetData();
  hashtagsFieldElement.value = '';
  commentFieldElement.value = '';
  const successTemplate = document.querySelector('#success').content.querySelector('.success');
  const successMessageElement = successTemplate.cloneNode(true);
  const successButtonElement = successTemplate.querySelector('.success__button');
  formEditImgElement.classList.add('hidden');
  document.querySelector('body').appendChild(successMessageElement);
  successButtonElement.addEventListener('click', () => {
    successMessageElement.remove();
  });
  document.removeEventListener('keydown', onDocumentKeydown);

  const onFormKeyDown = (evt) => {
    if (isEscapeKey(evt)) {
      successMessageElement.remove();
      window.removeEventListener('keydown', onFormKeyDown);
    }
  };
  const onClickBehindForm = (evt) => {
    if (evt.target !== successMessageElement.querySelector('div')) {
      successMessageElement.remove();
      window.removeEventListener('click', onClickBehindForm);
    }
  };

  window.addEventListener('keydown', onFormKeyDown);
  window.addEventListener('click', onClickBehindForm);
};

const failedFormUpload = function () {
  const failedTemplate = document.querySelector('#error').content.querySelector('.error');
  const failedMessageElement = failedTemplate.cloneNode(true);
  const failedButtonElement = failedTemplate.querySelector('.error__button');
  failedButtonElement.addEventListener('click', () => {
    failedMessageElement.classList.add('hidden');
  });
  document.querySelector('body').appendChild(failedMessageElement);
  document.removeEventListener('keydown', onDocumentKeydown);

  const onFormKeyDown = (evt) => {
    if (isEscapeKey(evt)) {
      failedMessageElement.remove();
      window.removeEventListener('keydown', onFormKeyDown);
    }
  };
  const onClickBehindForm = (evt) => {
    if (evt.target !== failedMessageElement.querySelector('div')) {
      failedMessageElement.remove();
      window.removeEventListener('click', onClickBehindForm);
    }
  };
  window.addEventListener('keydown', onFormKeyDown);
  window.addEventListener('click', onClickBehindForm);
};

const blockSubmitButton = () => {
  submitButtonElement.disabled = true;
  submitButtonElement.textContent = SUBMIT_BUTTON_TEXT.SENDING;
};

const unblockSubmitButton = () => {
  submitButtonElement.disabled = false;
  submitButtonElement.textContent = SUBMIT_BUTTON_TEXT.IDLE;
};

const setImgFormSubmit = () => {
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(() => {
          successFormUpload();
        })
        .catch(() => {
          failedFormUpload();
        })
        .finally(unblockSubmitButton);
    }
  });
};

setImgFormSubmit();

export {failedFormUpload};
