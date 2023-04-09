const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const fileChooserElement = document.querySelector('#upload-file');
const previewImgBlockElement = document.querySelector('.img-upload__preview');
const previewImgElement = previewImgBlockElement.querySelector('img');

fileChooserElement.addEventListener('change', () => {
  const file = fileChooserElement.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    previewImgElement.src = URL.createObjectURL(file);
  }
});
