const inputFile = document.querySelector('#img-file');
const chooseBtn = document.querySelector('#choose-btn');
const dropZone = document.querySelector('.main__form-drop-zone');
const dropText = document.querySelector('#drop-text');

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
});

chooseBtn.addEventListener('click', () => {
  inputFile.click();
});
