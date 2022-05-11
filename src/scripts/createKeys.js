import keysValues from './keys';

export default (lang, prop) => {
  const arr = [];
  keysValues.forEach((item) => {
    const line = document.createElement('div');
    line.classList.add('keyboard__line');

    Object.entries(item).forEach(keyFromMap => {
      let key = document.createElement('div');
      key.classList.add('keyboard__key');
      key.classList.add(keyFromMap[0]);
      if (keyFromMap[1].colored) key.classList.add('keyboard__colored');
      key.textContent = keyFromMap[1][lang][prop];
      if (keyFromMap[1].isShow === false) {
        key.classList.add('control');
      } else {
        key.classList.add('btn-showed');
      }
      line.append(key);
    });

    arr.push(line);
  });

  return arr;
};
