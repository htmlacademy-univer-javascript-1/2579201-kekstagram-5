import { sendData } from "./data.js";


export function uploadPhotoHandler(){
  const uploadForm = document.querySelector(".img-upload__form");
  const uploadFile = document.querySelector("#upload-file");

  uploadForm.addEventListener("change", ()=>{
    openForm(uploadFile.files[0]);

  });

}


function openForm(file){
  const filePath = URL.createObjectURL(file);
  const uploadOverlay = document.querySelector(".img-upload__overlay");
  const closeBtn = document.querySelector(".img-upload__cancel");

  uploadOverlay.classList.remove("hidden");
  document.body.classList.add("modal-open");

  updatePreviewImage(filePath);
  validateHandler();

  closeBtn.addEventListener("click", closeForm);
  document.addEventListener("keydown", closeFormByKey);
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
  const closeBtn = document.querySelector(".img-upload__cancel");

  hashtags.value = "";
  comment.value = "";
  const formError = document.querySelector(".form__error");

  if (formError) {
    formError.innerHTML = "";
  }
  uploadOverlay.classList.add("hidden");
  document.body.classList.remove("modal-open");

  uploadFile.value = "";

  closeBtn.removeEventListener("click", closeForm);
  document.removeEventListener("keydown", closeFormByKey);
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

  const comment = document.querySelector(".text__description");
  const hashtags = document.querySelector(".text__hashtags");
  pristine.addValidator(hashtags, (value) => {
    const HASHTAG_REGEX = /^#[a-zа-яё0-9]{1,19}$/i;
    const tags = value.split(" ").map((tag) => tag.toLowerCase().trim()).filter((tag) => tag.length > 0);
    if (tags.every((tag) => tag[0] === "#" && HASHTAG_REGEX.test(tag))) {
      return true;
    } else {
      return false;
    }
  }, "Неправильный формат хэштега", 2, false);

  pristine.addValidator(hashtags, (value)=> {
    const tags = value.split(" ").map((tag) => tag.toLowerCase().trim()).filter((tag) => tag.length > 0);
    const uniqueTags = new Set(tags);

    return tags.length === uniqueTags.size;
  }, "Хэштег повторяется", 2, false);

  pristine.addValidator(comment, (value) => value.length <= 140, "Комментарий не должен превышать 140 символов.", 2, false);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const valid = pristine.validate();
    if (valid){
      submitForm();
      closeForm();
    }
  });
}

function submitForm(){
  const data = new FormData(document.querySelector(".img-upload__form"));
  const successTemplate = document.querySelector("#success").content.querySelector(".success");
  const errorTemplate = document.querySelector("#error").content.querySelector(".error");
  sendData(data)
    .then(()=>messageHandler(successTemplate))
    .catch(()=>messageHandler(errorTemplate));
}

function messageHandler(element){
  const message = element.cloneNode(true);
  document.body.appendChild(message);

  const button = message.querySelector("button");
  function closeByEsc(e){
    if (e.key === "Escape"){
      closeMessage();
    }
  }
  function closeByClick(e){
    if (!message.querySelector("div").contains(e.target)){
      closeMessage();
    }
  }

  button.addEventListener("click", closeMessage);
  document.addEventListener("keydown", closeByEsc);
  document.addEventListener("click", closeByClick);

  function closeMessage() {
    message.remove();
    document.removeEventListener("keydown", closeByEsc);
    document.removeEventListener("click", closeByClick);
  }
}
