export function bigPictureCloseInit(){
  const bigPicture = document.querySelector(".big-picture");
  const bigPictureCancel = bigPicture.querySelector(".big-picture__cancel");

  function closeBigPicture(){
    bigPicture.classList.add("hidden");
    document.body.classList.remove("modal-open");
  }
  document.querySelector(".big-picture").classList.remove("hidden");
  document.body.classList.add("modal-open");
  bigPictureCancel.addEventListener("click", closeBigPicture);
  document.addEventListener("keydown", (e)=>{
    if (e.key === "Escape"){
      closeBigPicture();
    }
  });
}

export function updateBigPicture(url, description, comments, likes){
  const bigPictureImg = document.querySelector(".big-picture__img img");
  const bigPictureLikes = document.querySelector(".likes-count");
  const bigPictureCommentCounter = document.querySelector(".comments-count");
  const bigPictureDescription = document.querySelector(".social__caption");

  bigPictureImg.src = url;
  bigPictureLikes.textContent = likes;
  bigPictureCommentCounter.textContent = comments.length;
  bigPictureDescription.textContent = description;
  const commentsCopy = [...comments];
  updateComments(commentsCopy);
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


function updateComments(comments) {
  const displayedComments = document.querySelector(".social__comment-count");
  const commentsLoader = document.querySelector(".comments-loader");

  const renderedComments = comments.slice(0, 5);
  const outstandingComments = comments.slice(5);

  function loadCommentsHandler(){
    renderedComments.push(...outstandingComments.slice(0, 5));
    outstandingComments.splice(0, 5);
    renderComments(renderedComments);
    renderCommentsCounter(renderedComments);

    if (outstandingComments.length === 0) {
      commentsLoader.classList.add("hidden");
      commentsLoader.removeEventListener("click", loadCommentsHandler);
    }
  }

  commentsLoader.removeEventListener("click", loadCommentsHandler);
  commentsLoader.addEventListener("click", loadCommentsHandler);

  displayedComments.classList.remove("hidden");
  commentsLoader.classList.remove("hidden");

  renderComments(renderedComments);
  renderCommentsCounter(renderedComments);

  if (outstandingComments.length === 0) {
    commentsLoader.classList.add("hidden");
  }
}
