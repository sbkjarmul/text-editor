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