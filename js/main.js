'use strict';

var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var NAMES = ['Андрей', 'Кристина', 'Артем', 'Александр', 'Маша', 'Аня', 'Татьяна', 'Владислав'];
var DESCRIPTION_ARRAY_LENGTH = 25;
var MIN_LIKES = 15;
var MAX_LIKES = 200;

// получть cлучайное число в указанном диапазоне
var getRandomNumber = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

// создаем случайный коментарий
var createRandomUser = function () {
  return {
    avatar: 'avatar-' + getRandomNumber(1, 6) + '.svg',
    message: COMMENTS[getRandomNumber(1, (COMMENTS.length - 1))],
    name: NAMES[getRandomNumber(1, (NAMES.length - 1))]
  };

};

// создаем массив из случайных комментариев
var createCommentsList = function () {
  var randomCommentsAmount = getRandomNumber(1, 5);
  var commentsList = [];
  for (var i = 0; i < randomCommentsAmount; i++) {
    commentsList.push(createRandomUser());
  }
  return commentsList;
};

// функция для создания массива объектов из n-количеством описаний фотографий
var createPhotoDescription = function (amount) {
  var comments = [];
  for (var i = 0; i < amount; i++) {
    comments.push({
      url: 'photos/' + i + '.jpg,',
      description: ' ',
      likes: getRandomNumber(MIN_LIKES, MAX_LIKES),
      comments: createCommentsList(),

    });
  }
  return comments;
};
// создаем масив из 25 описаний фотографии
var comments = createPhotoDescription(DESCRIPTION_ARRAY_LENGTH);

// создание dom елемента

var usersPicturesList = document.querySelector('.pictures');
var userPictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
var fragment = document.createDocumentFragment();

var createUsersPictures = function () {
  for (var i = 0; i < DESCRIPTION_ARRAY_LENGTH; i++) {
    var photoElement = userPictureTemplate.cloneNode(true);
    var image = photoElement.querySelector('.picture__img');
    image.src = comments[i].url;
    photoElement.querySelector('.picture__likes').textContent = comments[i].likes;
    photoElement.querySelector('.picture__comments').textContent = comments[i].comments;
    fragment.appendChild(photoElement);
  }
  return fragment;
};

usersPicturesList.appendChild(createUsersPictures());
