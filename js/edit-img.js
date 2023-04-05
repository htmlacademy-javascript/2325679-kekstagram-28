const LOWER_SCALE_LIMIT = 25;
const UPPER_SCALE_LIMIT = 100;

const buttonSmallerElement = document.querySelector('.scale__control--smaller');
const buttonBiggerElement = document.querySelector('.scale__control--bigger');
const scaleValueElement = document.querySelector('.scale__control--value');
scaleValueElement.value = '100%';
const blockUploadPreviewElement = document.querySelector('.img-upload__preview');
const imgUploadPreviewElement = blockUploadPreviewElement.querySelector('img');
const effectsFormElement = document.querySelector('.img-upload__effects');
const imgUploadEffectLevelElement = document.querySelector('.img-upload__effect-level');
imgUploadEffectLevelElement.classList.add('hidden');
const effectLevelValueElement = document.querySelector('.effect-level__value');
const effectLevelSliderElement = document.querySelector('.effect-level__slider');
const cancelElement = document.querySelector('.img-upload__cancel');

buttonBiggerElement.addEventListener('click', () => {
  if (parseInt(scaleValueElement.value, 10) < UPPER_SCALE_LIMIT) {
    scaleValueElement.value = `${parseInt(scaleValueElement.value, 10) + 25}%`;
    imgUploadPreviewElement.style.transform = `scale(${parseInt(scaleValueElement.value, 10) / 100})`;
  }
});

buttonSmallerElement.addEventListener('click', () => {
  if (parseInt(scaleValueElement.value, 10) > LOWER_SCALE_LIMIT) {
    scaleValueElement.value = `${parseInt(scaleValueElement.value, 10) - 25}%`;
    imgUploadPreviewElement.style.transform = `scale(${parseInt(scaleValueElement.value, 10) / 100})`;
  }
});

noUiSlider.create(effectLevelSliderElement, {
  range: {
    min: 0,
    max: 1.0,
  },
  start: 1.0,
  step: 0.1,
  connect: 'lower',
});


const effectChange = function(evt) {
  if (evt.target.matches('input[type="radio"]')) {
    if(evt.target.matches('input[id="effect-none"]')) {
      imgUploadPreviewElement.className = 'effects__preview--none';
      imgUploadPreviewElement.style.removeProperty('filter');
      imgUploadEffectLevelElement.classList.add('hidden');
    }

    if(evt.target.matches('input[id="effect-chrome"]')) {
      imgUploadEffectLevelElement.classList.remove('hidden');
      imgUploadPreviewElement.className = 'effects__preview--chrome';
      effectLevelSliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1.0
        },
        start: 1,
        step: 0.1
      });
      effectLevelSliderElement.noUiSlider.on('update', () => {
        effectLevelValueElement.value = effectLevelSliderElement.noUiSlider.get();
        imgUploadPreviewElement.style.filter = `grayscale(${effectLevelValueElement.value})`;
      });
    }

    if(evt.target.matches('input[id="effect-sepia"]')) {
      imgUploadEffectLevelElement.classList.remove('hidden');
      imgUploadPreviewElement.className = 'effects__preview--sepiae';
      effectLevelSliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1.0
        },
        start: 1,
        step: 0.1
      });
      effectLevelSliderElement.noUiSlider.on('update', () => {
        effectLevelValueElement.value = effectLevelSliderElement.noUiSlider.get();
        imgUploadPreviewElement.style.filter = `sepia(${effectLevelValueElement.value})`;
      });
    }

    if(evt.target.matches('input[id="effect-marvin"]')) {
      imgUploadEffectLevelElement.classList.remove('hidden');
      imgUploadPreviewElement.className = 'effects__preview--marvin';
      effectLevelSliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 100
        },
        start: 100,
        step: 1
      });
      effectLevelSliderElement.noUiSlider.on('update', () => {
        effectLevelValueElement.value = effectLevelSliderElement.noUiSlider.get();
        imgUploadPreviewElement.style.filter = `invert(${effectLevelValueElement.value}%)`;
      });
    }

    if(evt.target.matches('input[id="effect-phobos"]')) {
      imgUploadEffectLevelElement.classList.remove('hidden');
      imgUploadPreviewElement.className = 'effects__preview--phobos';
      effectLevelSliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 3
        },
        start: 3,
        step: 0.1
      });
      effectLevelSliderElement.noUiSlider.on('update', () => {
        effectLevelValueElement.value = effectLevelSliderElement.noUiSlider.get();
        imgUploadPreviewElement.style.filter = `blur(${effectLevelValueElement.value}px)`;
      });
    }

    if(evt.target.matches('input[id="effect-heat"]')) {
      imgUploadEffectLevelElement.classList.remove('hidden');
      imgUploadPreviewElement.className = 'effects__preview--heat';
      effectLevelSliderElement.noUiSlider.updateOptions({
        range: {
          min: 1,
          max: 3
        },
        start: 3,
        step: 0.1
      });
      effectLevelSliderElement.noUiSlider.on('update', () => {
        effectLevelValueElement.value = effectLevelSliderElement.noUiSlider.get();
        imgUploadPreviewElement.style.filter = `brightness(${effectLevelValueElement.value})`;
      });
    }
  }
};

const resetData = function () {
  scaleValueElement.value = '100%';
  scaleValueElement.setAttribute('value', '100%');
  imgUploadPreviewElement.className = 'effects__preview--none';
  document.querySelector('input[id="effect-none"]').checked = true;
  imgUploadPreviewElement.style.removeProperty('filter');
  imgUploadEffectLevelElement.classList.add('hidden');
  imgUploadPreviewElement.style.transform = 'scale(1)';
};

cancelElement.addEventListener('click', resetData);

effectsFormElement.addEventListener('change', effectChange);

export {resetData};
