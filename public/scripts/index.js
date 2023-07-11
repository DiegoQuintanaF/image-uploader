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
let localUrl;

//  Pop Up Confirmation

darkness.addEventListener('click', () => {
  if (darkness.classList.contains('active')) {
    form.reset();
    handlePopUpConfirm();
  }
});

popUpSubmit.addEventListener('click', async () => {
  popUpSubmit.disabled = true;
  uploadingView();
  const res = await uploadImage();
  if (res.response === 'ok') {
    successView(res.imageId);
  }
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
  main_section.classList.add('uploading-img');

  main_section.querySelector('.form').remove();

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
}

function successView(imageId) {
  const imageURL = `${window.location.href}api/v1/image/search/${imageId}`;

  const main_section = main.querySelector('section');
  main_section.classList.add('success-upload');
  main_section.classList.remove('uploading-img');
  main_section.querySelector('.uploading-container').remove();

  const successHeader = document.createElement('header');
  successHeader.classList.add('header-success');

  const spanCheck = document.createElement('span');
  const headerH1 = document.createElement('h1');
  headerH1.innerText = 'Upload successfully!';

  successHeader.append(spanCheck, headerH1);

  const imagePreview = document.createElement('img');
  imagePreview.classList.add('img-success');
  imagePreview.src = localUrl;

  const linkContainer = document.createElement('div');
  linkContainer.classList.add('link-success-container');

  const link = document.createElement('span');
  link.classList.add('link-success');
  link.innerText = imageURL.substring(0, 52) + '...';

  const copyButton = document.createElement('button');
  copyButton.classList.add('copy-btn');
  copyButton.classList.add('btn');
  copyButton.textContent = 'Copy Link';

  linkContainer.append(link, copyButton);

  main_section.append(successHeader, imagePreview, linkContainer);

  copyButton.addEventListener('click', async () => {
    await navigator.clipboard.writeText(imageURL);
    copyButton.textContent = 'Link copied!';
  });
}

// utils

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
    localUrl = imageReader.result;
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

async function uploadImage() {
  const formData = new FormData();

  formData.append('img-file', image);

  try {
    const res = await fetch('/api/v1/image/submit', {
      method: 'POST',
      body: formData,
    });

    return await res.json();
  } catch (error) {
    showAlert("We're experiencing connection problems, please try again.");
    setTimeout(() => {
      location.reload();
    }, 4000);
  }
}
