import {createArrayOfPictures} from "./data.js";
import {updateBigPicture} from "./bigPicture.js";
export function generatePictures(){
  const picturesContainer = document.querySelector(".pictures");
  const pictureTemplate = document.querySelector("#picture").content.querySelector(".picture");
  const pictureFragment = document.createDocumentFragment();

  const pictures = createArrayOfPictures();

  pictures.forEach((photo) => {
    const {url, description, comments, likes} = photo;
    const picture = pictureTemplate.cloneNode(true);
    document.querySelector(".social__comment-count").classList.add("hidden");
    document.querySelector(".comments-loader").classList.add("hidden");
    picture.querySelector(".picture__img").src = url;
    picture.querySelector(".picture__img").alt = description;
    picture.querySelector(".picture__comments").textContent = comments.length;
    picture.querySelector(".picture__likes").textContent = likes;
    pictureFragment.append(picture);
    picture.addEventListener("click", (e) =>{
      e.preventDefault();
      document.querySelector(".big-picture").classList.remove("hidden");
      document.body.classList.add("modal-open");
      updateBigPicture(url, description, comments, likes);
    });
  });

  picturesContainer.append(pictureFragment);
}

