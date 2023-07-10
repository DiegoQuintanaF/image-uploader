const main = document.querySelector('.main');
const form = document.querySelector('.form');
const inputFile = document.querySelector('#img-file');
const chooseBtn = document.querySelector('#choose-btn');
const dropZone = document.querySelector('.main__form-drop-zone');
const dropText = document.querySelector('#drop-text');
const popUp = document.querySelector('.pop-up-confirm');
const popUpImage = popUp.querySelector('img');
const popUpSubmit = popUp.querySelector('.submit-btn');
const popUpCancel = popUp.querySelector('.cancel-btn');
const darkness = document.querySelector('.darkness');

let image;

//  Pop Up Confirmation

darkness.addEventListener('click', () => {
  if (darkness.classList.contains('active')) {
    form.reset();
    handlePopUpConfirm();
  }
});

popUpSubmit.addEventListener('click', () => {
  uploadingView();
});

popUpCancel.addEventListener('click', () => {
  form.reset();
  handlePopUpConfirm();
});

// Choose file

chooseBtn.addEventListener('click', () => {
  inputFile.click();
});

dropZone.addEventListener('dragover', (e) => {
  e.preventDefault();
  dropZone.classList.add('active');
  dropText.innerText = 'Drop your image here';
});

dropZone.addEventListener('dragleave', (e) => {
  e.preventDefault();
  dropZone.classList.remove('active');
  dropText.innerText = 'Drag & Drop your image here';
});

dropZone.addEventListener('drop', (e) => {
  e.preventDefault();
  dropZone.classList.remove('active');
  dropText.innerText = 'Drag & Drop your image here';

  const validExtensions = ['image/png', 'image/jpeg', 'image/jpg'];

  let files = e.dataTransfer.files;
  [image] = files;

  if (files.length > 1) {
    showAlert('Only one image, please.');
  } else if (!validExtensions.includes(image.type)) {
    image = undefined;
    showAlert('Invalid file extension, only accept png, jpg and jpeg.');
  } else {
    showPreviewImage(image);
  }
});

inputFile.addEventListener('change', (e) => {
  [image] = e.target.files;
  showPreviewImage(image);
});

// Views

function uploadingView() {
  handlePopUpConfirm();
  const main_section = main.querySelector('section');
  main_section.querySelector('.form').remove();
  main_section.classList.add('uploading-img');

  // <h2>Uploading...</h2>

  // <div class="loader">
  //   <div class="loaderBar"></div>
  // </div>

  const divContainer = document.createElement('div');
  divContainer.classList.add('uploading-container');

  const headerH2 = document.createElement('h2');
  headerH2.innerText = 'Uploading...';

  const divLoader = document.createElement('div');
  divLoader.classList.add('loader');

  const divLoaderBar = document.createElement('div');
  divLoaderBar.classList.add('loaderBar');

  divLoader.append(divLoaderBar);

  divContainer.append(headerH2, divLoader);

  main_section.append(divContainer);
  console.log('hola');
}

// utilis

function haldleStatus(property) {
  property.classList.toggle('unactive');
  property.classList.toggle('active');
}

function handlePopUpConfirm() {
  haldleStatus(popUp);
  haldleStatus(darkness);
}

function showPreviewImage(image) {
  const imageReader = new FileReader();

  imageReader.addEventListener('load', () => {
    const localUrl = imageReader.result;
    popUpImage.src = localUrl;
  });

  imageReader.readAsDataURL(image);

  removeAlert();
  handlePopUpConfirm();
}

function showAlert(alertText) {
  const alertDiv = document.createElement('div');
  alertDiv.classList.add('alert');
  const span = document.createElement('span');
  const p = document.createElement('p');
  p.innerText = alertText;

  alertDiv.append(span, p);

  removeAlert();
  document.querySelector('body').append(alertDiv);
  setTimeout(() => {
    removeAlert();
  }, 5000);

  form.reset();
}

function removeAlert() {
  const alert = document.querySelector('.alert');

  if (alert) {
    alert.remove();
  }
}
