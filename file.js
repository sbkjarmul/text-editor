const fileUploader = document.querySelector('#file-upload');
const fileSaver = document.querySelector('#file-save');

fileUploader.addEventListener('change', (e) => {
  openFile(e.target.files[0]);
})

fileSaver.addEventListener('click', () => {
  createModal('Name a file', 'Save', 'save');
})

const openFile = (file) => {
  if (file !== undefined) {
    let fileReader = new FileReader();

    fileReader.onload = function() {
      textEditor.textContent = fileReader.result;
    }

    fileReader.readAsText(file);
  }
}

const saveFile = (content, filename, contentType) => {
  const a = document.createElement('a');
  const file = new Blob([content], {type: contentType});

  a.href = URL.createObjectURL(file);
  a.download = filename;

  if(isValidJSON(content)) {
    a.click();
  }

  if (!isValidJSON(content)) {
    createModal('This is not a JSON format!', 'OK', 'error');
  }

  URL.revokeObjectURL(a.href);
}

const isValidJSON = (text) => {
  try {
    JSON.parse(text);
  } catch (e) {
    return false;
  } 
  return true;
}

const createModal = (infoText, buttonText, modalType) => {
  const modalEl = document.createElement('div');
  const infoEl = document.createElement('p');
  const buttonEl = document.createElement('button');
  const buttonContainer = document.createElement('div');

  infoEl.innerText = infoText;
  buttonEl.innerText = buttonText;

  modalEl.classList.add('modal');
  buttonEl.classList.add('modal__button');
  infoEl.classList.add('modal__info');

  container.appendChild(modalEl);
  modalEl.appendChild(infoEl);
  
  if (modalType === 'save') {
    const fileNameInput = document.createElement('input');
    const cancelButton = document.createElement('button');
    
    cancelButton.innerText = 'Cancel';
    fileNameInput.placeholder = 'File name...'

    fileNameInput.classList.add('modal__input');
    cancelButton.classList.add('modal__button');
    
    modalEl.appendChild(fileNameInput);
    buttonContainer.appendChild(cancelButton);

    buttonEl.addEventListener('click', () => {
      saveFile(textEditor.textContent, `${fileNameInput.value}.json`, 'text/plain');
    });

    cancelButton.addEventListener('click', () => {
      modalEl.remove();
    });
  }

  buttonContainer.prepend(buttonEl);
  modalEl.appendChild(buttonContainer);

  buttonEl.addEventListener('click', () => {
    modalEl.remove();
  });
};