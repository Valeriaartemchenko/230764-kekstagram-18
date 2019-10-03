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
var AVATARS = ['avatar-1.svg','avatar-2.svg','avatar-3.svg','avatar-4.svg','avatar-5.svg','avatar-6.svg'];
var DESCRIPTION_ARRAY_LENGTH = 25;
var MIN_LIKES = 15;
var MAX_LIKES = 200 - MIN_LIKES;//тут надо отнимать количество минимальных лайков?

// получть cлучайное число в указанном диапазоне
var getRandomNumber = function (max) {
  return Math.floor(Math.random()* max);
};

// создаем случайный коментарий
var createRandomComment = function () {
  return {
    avatar: AVATARS[getRandomNumber(AVATARS.length -1)],
    message: COMMENTS[getRandomNumber(COMMENTS.length - 1)],
    name: NAMES[getRandomNumber(NAMES.length - 1)]
  };

};

// создаем массив из случайных комментариев
var createCommentsList = function (randomCommentsAmount) {
  var commentsList = [];
  for (var i = 0; i < randomCommentsAmount; i++) {
    commentsList.push(createRandomComment());
  }
  return commentsList;
};

//var commentsList = createCommentsList(); сама не пойму нафига я вызываю функцию тут

// функция для создания массива объектов из n-количеством описаний фотографий
var createPhotoDescription = function (amount) {
  var photoDescription = [];
  for (var i = 0; i < amount; i++) {
    photoDescription.push({
      url: 'photos/' + (i+1) + '.jpg',
      description: ' ',
      likes: getRandomNumber(MAX_LIKES)+ MIN_LIKES,
      comments: createCommentsList(getRandomNumber(3)+1), //тут должно быть просто колличество коментов или commentsList[]?

    });
  }
  return photoDescription;
};
// создаем масив из 25 описаний фотографии
var photoDescription = createPhotoDescription(DESCRIPTION_ARRAY_LENGTH);

// создание dom елемента

var usersPicturesList = document.querySelector('.pictures');
var userPictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
var fragment = document.createDocumentFragment();

var createUsersPictures = function () {
  for (var i = 0; i < DESCRIPTION_ARRAY_LENGTH; i++) {
    var photoElement = userPictureTemplate.cloneNode(true);
    var image = photoElement.querySelector('.picture__img');
    image.src = photoDescription[i].url;
    photoElement.querySelector('.picture__likes').textContent = photoDescription[i].likes;
    photoElement.querySelector('.picture__comments').textContent = photoDescription[i].comments.length; //тут длина масива commentsList
    fragment.appendChild(photoElement);
  }
  return fragment;
};

usersPicturesList.appendChild(createUsersPictures());
