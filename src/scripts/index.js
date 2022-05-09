import '../assets/styles/style.scss';
import createKeys from './createKeys';

let lang = localStorage.getItem('lang') || 'en';

const createTitle = () => {
  const title = document.createElement('h1');
  title.classList.add('title');
  title.textContent = 'RSS Virtual Keyboard';

  return title;
};

const createTextarea = () => {
  const textarea = document.createElement('textarea');
  textarea.classList.add('textarea');
  textarea.setAttribute('autofocus', 'autofocus');

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
  console.log(lang);
  keyboardContainer.append(...createKeys(lang));

  return keyboardContainer;
};

const createContainer = () => {
  const container = document.createElement('div');
  container.classList.add('container');
  document.body.append(container);

  container.append(createTitle(), createTextarea(), createKeyboard(lang), createSpecification());
};

const keyboardHandler = (event) => {
  event.preventDefault();
  // const container = document.querySelector('.container');
  const keyboard = document.querySelector('.keyboard');
  // const keyboardKey = document.querySelectorAll('.keyboard__key');
  // const textarea = document.querySelector('keyboard__textarea');

  if (event.ctrlKey && event.altKey && event.type === 'keydown') {
    if (lang === 'en') {
      lang = 'ru';
    } else {
      lang = 'en';
    }

    keyboard.textContent = '';
    keyboard.append(...createKeys(lang));
  }
};

window.addEventListener('beforeunload', () => localStorage.setItem('lang', lang));
window.addEventListener('DOMContentLoaded', createContainer());
window.addEventListener('keydown', keyboardHandler);
window.addEventListener('keyup', keyboardHandler);
