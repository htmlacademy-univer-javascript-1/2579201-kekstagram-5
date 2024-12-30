export async function getArrayOfPictures(){
  try {
    const response = await fetch("https://29.javascript.htmlacademy.pro/kekstagram/data");
    if (!response.ok) {
      throw new Error("Данные не были загружены");
    }
    return response.json();
  } catch (error) {
    errorHandler(error);
    throw new Error("Ошибка");
  }
}

export async function sendData(data) {
  const response = await fetch("https://29.javascript.htmlacademy.pro/kekstagram", {
    method: "POST",
    body: data,
  });
  if (!response.ok) {
    throw new Error("Ошибка");
  }
}

function errorHandler(text){
  const picturesError = document.querySelector('.pictures__error');
  picturesError.classList.remove('hidden');
  const errorText = picturesError.querySelector('h3');
  errorText.textContent = text;
  document.body.style.pointerEvents = 'none';
}
