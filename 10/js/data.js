import {getRandomInteger, getRandomArrayElement, generatePhotoId, generatePhotoUrl, generatePhotoCommentId} from './util.js';

const DESCRIPTIONS = [
  'Это я на отдыхе',
  'Новый год в кругу семьи',
  'Люблю природу',
  'Красивый вид из окна',
  'День рождения моей подруги'
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
  'Артём',
  'Павел',
  'Никита',
  'Виктория',
  'Ольга',
  'Иван',
  'Екатерина',
  'Александр',
  'Пётр',
  'Софья'
];

const generateMessage = () => (
  Array.from({length: getRandomInteger(1, 2)}, () => getRandomArrayElement(MESSAGES)).join(' ')
);


const createComment = () => ({
  id: generatePhotoCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: generateMessage(),
  name: getRandomArrayElement(NAMES)
});

const generateComments = () => (
  Array.from({length: getRandomInteger(2, 10)}, createComment)
);

const createPost = () => ({
  id: generatePhotoId(),
  url: `photos/${generatePhotoUrl()}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(15, 200),
  comments: generateComments()
});

const createPosts = () => Array.from({length: 25}, createPost);

export {createPosts};
