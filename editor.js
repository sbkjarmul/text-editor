// const fileUploader = document.querySelector('#file-upload');
// const fileSaver = document.querySelector('#file-save');

const container = document.querySelector('.container');
const textEditor = document.querySelector('.text-editor');
const boldButton = document.querySelector('.tool-panel__btn--bold').parentElement;
const italicButton = document.querySelector('.tool-panel__btn--italic').parentElement;
const listButton = document.querySelector('.tool-panel__btn--list').parentElement;

let isBold = boldButton.classList.contains('active'); 
let isItalic = italicButton.classList.contains('active'); ; 
let isList = listButton.classList.contains('active');
let isEditorDisable = true;

textEditor.addEventListener('keydown', (e) => {
  if (e.keyCode === 9) {
    e.preventDefault();
    document.execCommand('insertText', false, '\t');
  }

  if (e.keyCode === 66 && e.metaKey || e.keyCode === 66 && e.ctrlKey) {
    e.preventDefault();
    setCommand(boldButton, 'bold');
  }

  if (e.keyCode === 73 && e.metaKey || e.keyCode === 73 && e.ctrlKey) {
    e.preventDefault();
    setCommand(italicButton, 'italic');
  }
});

textEditor.addEventListener('focusout', () => {
  isEditorDisable = true;
});

textEditor.addEventListener('click', () => {
  if (isBold !== document.queryCommandState('bold') && isEditorDisable) {
    document.execCommand('bold');
  }

  if (isItalic !== document.queryCommandState('italic') && isEditorDisable) {
    document.execCommand('italic');
  }

  if (isList !== document.queryCommandState('insertUnorderedList') && isEditorDisable) {
    document.execCommand('indent');
    document.execCommand('insertUnorderedList');
  }

  isEditorDisable = false;
});

boldButton.addEventListener('click', () => {
  isBold = !isBold;
  setCommand(boldButton, 'bold');
  setState(isBold, boldButton);
});

italicButton.addEventListener('click', () => {
  isItalic = !isItalic;
  setCommand(italicButton, 'italic');
  setState(isItalic, italicButton);
});

listButton.addEventListener('click', () => {
  isList = !isList;
  const state = document.queryCommandState('insertUnorderedList');

  if (!state) {
    listButton.classList.add('active');

    document.execCommand('indent');
    document.execCommand('insertUnorderedList');
  }
  
  if (state) {
    listButton.classList.remove('active');

    document.execCommand('insertUnorderedlist', false);
    document.execCommand('outdent');
  }
});

// fileUploader.addEventListener('change', (e) => {
//   openFile(e.target.files[0]);
// })

// fileSaver.addEventListener('click', () => {
//   createModal('Name a file', 'Save', 'save');
// })

const setState = (state, button) => {
  state = button.classList.contains('active');
}

const setCommand = (button, command) => {
  state = document.queryCommandState(command);

  if (!state) {
    button.classList.add('active');
  }
  
  if (state) {
    button.classList.remove('active');
  }

  document.execCommand(command);
}

// const openFile = (file) => {
//   if (file !== undefined) {
//     let fileReader = new FileReader();

//     fileReader.onload = function() {
//       textEditor.textContent = fileReader.result;
//     }

//     fileReader.readAsText(file);
//   }
// }

// const saveFile = (content, filename, contentType) => {
//   const a = document.createElement('a');
//   const file = new Blob([content], {type: contentType});

//   a.href = URL.createObjectURL(file);
//   a.download = filename;

//   if(isValidJSON(content)) {
//     a.click();
//   }

//   if (!isValidJSON(content)) {
//     createModal('This is not a JSON format!', 'OK', 'error');
//   }

//   URL.revokeObjectURL(a.href);
// }

// const isValidJSON = (text) => {
//   try {
//     JSON.parse(text);
//   } catch (e) {
//     return false;
//   } 
//   return true;
// }

// const createModal = (infoText, buttonText, modalType) => {
//   const modalEl = document.createElement('div');
//   const infoEl = document.createElement('p');
//   const buttonEl = document.createElement('button');
//   const buttonContainer = document.createElement('div');

//   infoEl.innerText = infoText;
//   buttonEl.innerText = buttonText;

//   modalEl.classList.add('modal');
//   buttonEl.classList.add('modal__button');
//   infoEl.classList.add('modal__info');

//   container.appendChild(modalEl);
//   modalEl.appendChild(infoEl);
  
//   if (modalType === 'save') {
//     const fileNameInput = document.createElement('input');
//     const cancelButton = document.createElement('button');
    
//     cancelButton.innerText = 'Cancel';
//     fileNameInput.placeholder = 'File name...'

//     fileNameInput.classList.add('modal__input');
//     cancelButton.classList.add('modal__button');
    
//     modalEl.appendChild(fileNameInput);
//     buttonContainer.appendChild(cancelButton);

//     buttonEl.addEventListener('click', () => {
//       saveFile(textEditor.textContent, `${fileNameInput.value}.json`, 'text/plain');
//     });

//     cancelButton.addEventListener('click', () => {
//       modalEl.remove();
//     });
//   }

//   buttonContainer.prepend(buttonEl);
//   modalEl.appendChild(buttonContainer);

//   buttonEl.addEventListener('click', () => {
//     modalEl.remove();
//   });
// };

