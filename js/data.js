import {getARandomNumber} from './utils.js';
import {names, comments, descriptions} from './constants.js';
export function createArrayOfPhotos(){
  const photos = [];
  for (let i = 0; i < 25; i++){
    const newPhoto = {
      id : i + 1,
      url: `photos/${i + 1}.jpg`,
      description: descriptions[getARandomNumber(descriptions.length)],
      likes: getARandomNumber(200, 15),
      comments: createArrayOfComments(),
    };
    photos.push(newPhoto);
  }
  return photos;
}

export function createArrayOfComments(){
  const randomNumberOfComments = getARandomNumber(30);
  const newComments = [];
  for (let i = 0; i < randomNumberOfComments; i++){
    const newComment = {
      id: i + 1,
      avatar: `img/avatar-${getARandomNumber(6, 1)}.svg`,
      message: Array.from({ length: getARandomNumber(2, 1) }, () => comments[getARandomNumber(comments.length)]).join('\n'),
      name: names[getARandomNumber(names.length)],
    };
    newComments.push(newComment);
  }
  return newComments;
}

