export function updateBigPicture(url, description, comments, likes){
  const bigPicture = document.querySelector(".big-picture");
  const bigPictureImg = document.querySelector(".big-picture__img img");
  const bigPictureLikes = document.querySelector(".likes-count");
  const bigPictureCommentCounter = document.querySelector(".comments-count");
  const bigPictureDescription = document.querySelector(".social__caption");
  const bigPictureCancel = bigPicture.querySelector(".big-picture__cancel");

  bigPictureImg.src = url;
  bigPictureLikes.textContent = likes;
  bigPictureCommentCounter.textContent = comments.length;
  bigPictureDescription.textContent = description;

  const renderedComments = comments.slice(0, 5);
  const outstandingComments = comments.slice(5);
  const loader = () => loadCommentsHandler(renderedComments, outstandingComments, loader);
  updateComments(renderedComments, outstandingComments, loader);

  document.querySelector(".big-picture").classList.remove("hidden");
  document.body.classList.add("modal-open");
  bigPictureCancel.addEventListener("click", closeBigPicture);
  document.addEventListener("keydown", closeBigPictureByKey);

  function closeBigPicture(){
    const commentsLoader = document.querySelector(".comments-loader");

    bigPicture.classList.add("hidden");
    document.body.classList.remove("modal-open");

    bigPictureCancel.removeEventListener("click", closeBigPicture);
    document.removeEventListener("keydown", closeBigPictureByKey);
    commentsLoader.removeEventListener("click", loader);
  }

  function closeBigPictureByKey(e){
    if (e.key === "Escape"){
      closeBigPicture();
    }
  }
}


function renderComments(comments){
  const commentList = document.querySelector(".social__comments");
  commentList.innerHTML = "";
  comments.forEach((comment) => {
    const li = document.createElement("li");
    li.classList.add("social__comment");
    li.innerHTML = `
      <img class="social__picture" src="${comment.avatar}" alt="${comment.name}" width="35" height="35">
      <p class="social__text">${comment.message}</p>
    `;
    commentList.appendChild(li);
  });
}


function renderCommentsCounter(renderedComments){
  const displayedComments = document.querySelector(".social__comment-count");
  displayedComments.firstChild.textContent = `${renderedComments.length} из `;
}


function updateComments(renderedComments, outstandingComments, loader) {
  const displayedComments = document.querySelector(".social__comment-count");
  const commentsLoader = document.querySelector(".comments-loader");

  commentsLoader.addEventListener("click", loader);

  displayedComments.classList.remove("hidden");
  commentsLoader.classList.remove("hidden");

  renderComments(renderedComments);
  renderCommentsCounter(renderedComments);

  if (outstandingComments.length === 0) {
    commentsLoader.classList.add("hidden");
    commentsLoader.removeEventListener("click", loader);
  }
}

function loadCommentsHandler(renderedComments, outstandingComments, loader){
  const commentsLoader = document.querySelector(".comments-loader");
  renderedComments.push(...outstandingComments.slice(0, 5));
  outstandingComments.splice(0, 5);
  renderComments(renderedComments);
  renderCommentsCounter(renderedComments);

  if (outstandingComments.length === 0) {
    commentsLoader.classList.add("hidden");
    commentsLoader.removeEventListener("click", loader);
  }
}
