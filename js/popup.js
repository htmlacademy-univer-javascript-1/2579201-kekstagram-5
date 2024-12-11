// написать онКлик на document.querySelector(".pictures") потом написать проверку на элемент.
// const picturesContainer = document.querySelector(".pictures");
const pictures = document.querySelectorAll('.picture');
const bigPicture = document.querySelector('.big-picture');
const bigPictureCancel = document.querySelector('.big-picture__cancel');
const bigPictureImg = document.querySelector('.big-picture__img');
function openBigPicture(e){
  bigPictureImg.src = e.target.src;
  console.log(e.target);
  bigPicture.classList.remove('hidden');
}

function closeBigPicture(){
  bigPicture.classList.add('hidden');
}

bigPictureCancel.addEventListener('click', closeBigPicture);
pictures.forEach((picture)=> picture.addEventListener('click', openBigPicture));
// передать значения в элемент big-picture:
{/* <section class="big-picture  overlay  hidden">
        <div class="big-picture__img">
          <img src="img/logo-background-3.jpg" alt="Девушка в купальнике" width="600" height="600">
        </div>
        <div class="big-picture__social  social">
          <div class="social__header">
            <img class="social__picture" src="img/avatar-1.svg" alt="Аватар автора фотографии" width="35" height="35">
            <p class="social__caption">Тестим новую камеру! =)</p>
            <p class="social__likes">Нравится <span class="likes-count">356</span></p>
          </div>

          <!-- Комментарии к изображению -->
          <div class="social__comment-count">5 из <span class="comments-count">125</span> комментариев</div>
          <ul class="social__comments">
            <li class="social__comment">
              <img class="social__picture" src="img/avatar-4.svg" alt="Аватар комментатора фотографии" width="35" height="35">
              <p class="social__text">Мега фото! Просто обалдеть. Как вам так удалось?</p>
            </li>
            <li class="social__comment">
              <img class="social__picture" src="img/avatar-3.svg" alt="Аватар комментатора фотографии" width="35" height="35">
               <p class="social__text">Да это фоташоп!!!!!!!!</p>
            </li>
          </ul>
    </section> */}

