export function bigPictureCloseInit(){
  const bigPicture = document.querySelector(".big-picture");
  const bigPictureCancel = bigPicture.querySelector(".big-picture__cancel");

  function closeBigPicture(e){
    if (e.type === "click"){
      bigPicture.classList.add("hidden");
      document.body.classList.remove("modal-open");
    }
    if (document.body.classList.contains("modal-open") && e.key === "Escape"){
      bigPicture.classList.add("hidden");
      document.body.classList.remove("modal-open");
    }
  }

  bigPictureCancel.addEventListener("click", closeBigPicture);
  document.addEventListener("keydown", closeBigPicture);
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
  renderComments(comments);
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
