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
var AVATARS = ['avatar-1.svg', 'avatar-2.svg', 'avatar-3.svg', 'avatar-4.svg', 'avatar-5.svg', 'avatar-6.svg'];
var DESCRIPTION_ARRAY_LENGTH = 25;
var MIN_LIKES = 15;
var MAX_LIKES = 200 - MIN_LIKES;

// получть cлучайное число в указанном диапазоне
var getRandomNumber = function (max) {
  return Math.floor(Math.random() * max);
};

// создаем случайный коментарий
var createRandomComment = function () {
  return {
    avatar: 'img/' + AVATARS[getRandomNumber(AVATARS.length - 1)],
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

// var commentsList = createCommentsList();
// функция для создания массива объектов из n-количеством описаний фотографий
var createPhotoDescription = function (amount) {
  var photoDescription = [];
  for (var i = 0; i < amount; i++) {
    photoDescription.push({
      url: 'photos/' + (i + 1) + '.jpg',
      description: 'some description',
      likes: getRandomNumber(MAX_LIKES) + MIN_LIKES,
      comments: createCommentsList(getRandomNumber(3) + 1)
    });
  }
  return photoDescription;
};
// создаем масив из 25 описаний фотографии
var photoDescription = createPhotoDescription(DESCRIPTION_ARRAY_LENGTH);

// создание dom елемента

var usersPicturesList = document.querySelector('.pictures');
var userPictureTemplate = document.querySelector('#picture').content.querySelector('.picture');


var createUsersPictures = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < DESCRIPTION_ARRAY_LENGTH; i++) {
    var photoElement = userPictureTemplate.cloneNode(true);
    var image = photoElement.querySelector('.picture__img');
    image.src = photoDescription[i].url;
    photoElement.querySelector('.picture__likes').textContent = photoDescription[i].likes;
    photoElement.querySelector('.picture__comments').textContent = photoDescription[i].comments.length; // тут длина масива commentsList
    fragment.appendChild(photoElement);
  }
  return fragment;
};

usersPicturesList.appendChild(createUsersPictures());

/* ----------------task 3---------------- */
// просморт фото в полноэкранном режиме
var bigPicture = document.querySelector('.big-picture');
var bigPictureImage = bigPicture.querySelector('.big-picture__img');
var likesCount = bigPicture.querySelector('.likes-count');
var commentsCount = bigPicture.querySelector('.comments-count');
var socialCaption = bigPicture.querySelector('.social__caption');
var socialComments = bigPicture.querySelector('.social__comments');
// var socialComment = bigPicture.querySelector('.social__comment');
var socialPicture = bigPicture.querySelector('.social__picture');
var socialText = bigPicture.querySelector('.social__text');
var picture = photoDescription[0];

bigPicture.classList.remove('hidden');
bigPicture.querySelector('.social__comment-count').classList.add('.hidden');
bigPicture.querySelector('.comments-loader').classList.add('.hidden');

var createBigPicture = function (photo) {
  bigPictureImage.src = photo.url;
  likesCount.textContent = photo.likes;
  commentsCount.textContent = photo.comments.length;
  socialCaption.textContent = photo.description;
};

createBigPicture(picture);

var createCommentsElement = function (photo) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < photo.comments.length; i++) {
    var commentElement = document.querySelector('.social__comment').cloneNode(true);
    socialPicture.src = photo.comments[i].avatar;
    socialPicture.alt = photo.comments[i].name;
    socialText.textContent = photo.comments[i].message;
    fragment.appendChild(commentElement);
  }
  return fragment;
};

function createComments(photo) {
  var fragment = createCommentsElement(photo);
  socialComments.innerHTML = '';
  socialComments.appendChild(fragment);
}

createComments(picture);


