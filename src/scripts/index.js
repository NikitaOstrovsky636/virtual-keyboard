import '../assets/styles/style.scss';
import createKeys from './createKeys';

let lang = localStorage.getItem('lang') || 'en';
let isCaps = false;
let isShift = false;

const createTitle = () => {
  const title = document.createElement('h1');
  title.classList.add('title');
  title.textContent = 'RSS Virtual Keyboard';

  return title;
};

const createTextarea = () => {
  const textarea = document.createElement('textarea');
  textarea.classList.add('textarea');
  // textarea.setAttribute('autofocus', 'autofocus');

  return textarea;
};

const createSpecificationItem = (value) => {
  const p = document.createElement('p');
  p.classList.add('specification__item');
  p.textContent = value;

  return p;
};

const createSpecification = () => {
  const specification = document.createElement('div');
  const p1 = document.createElement('p');
  specification.classList.add('specification');
  p1.classList.add('specification__item');
  specification.append(createSpecificationItem('The virtual keyboard was created in Windows'));
  specification.append(createSpecificationItem('For switching keyboard layout press left CTRL+ALT'));

  return specification;
};

const createKeyboard = () => {
  const keyboardContainer = document.createElement('div');
  keyboardContainer.classList.add('keyboard');
  keyboardContainer.append(...createKeys(lang, 'caseDown'));

  return keyboardContainer;
};

const createContainer = () => {
  const container = document.createElement('div');
  container.classList.add('container');
  document.body.append(container);

  container.append(createTitle(), createTextarea(), createKeyboard(lang), createSpecification());
};

const keyboardHandler = (event) => {
  const keyboard = document.querySelector('.keyboard');
  const keyboardKeys = document.querySelectorAll('.keyboard__key');
  const textarea = document.querySelector('.textarea');

  if (event.ctrlKey && event.altKey && event.type === 'keydown') {
    if (lang === 'en') {
      lang = 'ru';
    } else {
      lang = 'en';
    }

    keyboard.textContent = '';
    keyboard.append(...createKeys(lang, 'caseDown'));
  }

  if (event.code === 'Tab') {
    event.preventDefault();
  }

  if (event.code === 'Tab' && event.type === 'keyup') {
    textarea.value += '\t';
  }

  if (event.code === 'CapsLock' && event.type === 'keyup') {
    if (!isCaps) {
      keyboard.textContent = '';
      keyboard.append(...createKeys(lang, 'caps'));
    } else {
      keyboard.textContent = '';
      keyboard.append(...createKeys(lang, 'caseDown'));
    }

    isCaps = !isCaps;
  }

  if (event.code === 'ShiftLeft' && event.type === 'keydown') {
    if (!isShift) {
      keyboard.textContent = '';
      keyboard.append(...createKeys(lang, 'caseUp'));
    } else {
      keyboard.textContent = '';
      keyboard.append(...createKeys(lang, 'caseDown'));
    }
  }

  if (event.code === 'ShiftLeft' && event.type === 'keyup') {
    if (!isShift) {
      keyboard.textContent = '';
      keyboard.append(...createKeys(lang, 'caseDown'));
    }

    isShift = !isShift;
  }

  keyboardKeys.forEach(key => {
    if (key.classList.contains(event.code) && event.type === 'keydown') {
      key.classList.add('keyboard__active');
    }

    if (key.classList.contains('keyboard__active') && event.type === 'keyup') {
      setTimeout(() => {
        key.classList.remove('keyboard__active');
      }, 100);
    }
  });
};

const clickHandler = (event) => {
  const textarea = document.querySelector('.textarea');
  const keyboard = document.querySelector('.keyboard');
  textarea.focus();

  if (event.currentTarget.classList.contains('Enter') && event.type === 'mousedown') textarea.value += '\n';
  if (event.currentTarget.classList.contains('Tab') && event.type === 'mousedown') textarea.value += '\t';

  if (event.target.textContent === 'CapsLock' && event.type === 'mouseup') {
    if (!isCaps) {
      keyboard.textContent = '';
      keyboard.append(...createKeys(lang, 'caps'));
    } else {
      keyboard.textContent = '';
      keyboard.append(...createKeys(lang, 'caseDown'));
    }

    isCaps = !isCaps;
  }

  if (event.type === 'mouseup' && !event.target.classList.contains('control')) {
    textarea.value += event.target.textContent;
  }
};

window.addEventListener('beforeunload', () => localStorage.setItem('lang', lang));
window.addEventListener('DOMContentLoaded', createContainer());
window.addEventListener('keydown', keyboardHandler);
window.addEventListener('keyup', keyboardHandler);
document.querySelectorAll('.keyboard__key').forEach(key => key.addEventListener('mousemove', clickHandler));
document.querySelectorAll('.keyboard__key').forEach(key => key.addEventListener('mouseup', clickHandler));
