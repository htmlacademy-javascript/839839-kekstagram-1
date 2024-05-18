const containerComment = document.querySelector('.social__comments');
const Comment = document.querySelector('.social__comment');

/**
 * Заполение данными комментария
 * @param {Object} avatar, name, message, id - параметры комментария
 * @return {Object} - элемент комментария
 */
const showComment = ({avatar, name, message, id}) => {
  const cloneElementComment = Comment.cloneNode(true);
  cloneElementComment.querySelector('.social__picture').src = avatar;
  cloneElementComment.querySelector('.social__picture').alt = name;
  cloneElementComment.querySelector('.social__text').textContent = message;
  cloneElementComment.dataset.avatarId = id;
  return cloneElementComment;
};

/**
 * Заполение данными большого изображения
 * @param {Object} url, description, comments, likes - параметры изображения
 */
const showBigPicture = ({url, description, comments, likes}) => {
  document.querySelector('.big-picture__img img').src = url;
  document.querySelector('.social__caption').textContent = description;
  document.querySelector('.likes-count').textContent = likes;
  document.querySelector('.comments-count').textContent = comments.length;
  containerComment.innerHTML = '';
  comments.forEach((element) => {
    containerComment.append(showComment(element));
  });
};

export {showBigPicture};

