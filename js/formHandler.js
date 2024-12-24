
import {FILE_TYPES} from "./constants.js";
export function uploadPhotoHandler(){
  const uploadForm = document.querySelector(".img-upload__form");
  const closeBtn = document.querySelector(".img-upload__cancel");
  const uploadFile = document.querySelector("#upload-file");

  uploadForm.addEventListener("change", ()=>{
    // openForm(uploadFile.files[0]);
    openForm();
  });


  closeBtn.addEventListener("click", closeForm);
  document.addEventListener("keydown", closeFormByKey);

}


function openForm(file){
  // const fileName = file.name.toLowerCase();
  // const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  // if (matches) {
  // const filePath = URL.createObjectURL(file);
  const uploadOverlay = document.querySelector(".img-upload__overlay");
  uploadOverlay.classList.remove("hidden");
  document.body.classList.add("modal-open");
  // updatePreviewImage(filePath);
  validateHandler();
  // }
}

function updatePreviewImage(file){
  const imagePreview = document.querySelector(".img-upload__preview img");
  const effectsPreview = document.querySelectorAll(".effects__preview");
  imagePreview.src = file;
  effectsPreview.forEach((effect)=> {
    effect.style.backgroundImage = `url(${file})`;
  });

}

function closeForm(){
  const uploadOverlay = document.querySelector(".img-upload__overlay");
  const uploadFile = document.querySelector("#upload-file");
  const hashtags = document.querySelector(".text__hashtags");
  const comment = document.querySelector(".text__description");

  hashtags.value = "";
  comment.value = "";
  const formError = document.querySelector(".form__error");

  formError.innerHTML = "";
  uploadOverlay.classList.add("hidden");
  document.body.classList.remove("modal-open");

  uploadFile.value = "";
}

function closeFormByKey(e){
  if (e.key === "Escape"){
    closeForm();
  }
}

function validateHandler(){
  const form = document.querySelector(".img-upload__form");
  const pristine = new Pristine(form, {
    classTo: "img-upload__text",
    errorClass: "has-error",
    successClass: "has-success",
    errorTextParent: "img-upload__text",
    errorTextTag: "span",
    errorTextClass: "form__error"
  });

  const hashtags = document.querySelector(".text__hashtags");
  const comment = document.querySelector(".text__description");
  pristine.addValidator(hashtags, (value) => {
    const tags = value.split(" ").map((tag) => tag.toLowerCase());
    if (tags.every((tag) => tag[0] === "#")) {
      return true;
    } else {
      return false;
    }
  }, "Неправильный формат хэштега", 2, false);

  pristine.addValidator(hashtags, (value)=> {
    const tags = value.split(" ").map((tag) => tag.toLowerCase());
    const uniqueTags = new Set(tags);

    return tags.length === uniqueTags.size;
  }, "Хэштег повторяется", 2, false);

  pristine.addValidator(comment, (value) => value.length <= 140, "Комментарий не должен превышать 140 символов.", 2, false);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const valid = pristine.validate();
    if (valid){
      closeForm();
    }
  });
}

