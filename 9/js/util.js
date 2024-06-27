const NUMBER_COMMENTS = 5;

const isKeydownEscape = (evt) => (evt.key === 'Escape');

const createShownComment = () => {
  let shownComment = 0;
  return () => {
    shownComment += NUMBER_COMMENTS;
    return shownComment;
  };
};

export {isKeydownEscape, createShownComment};
