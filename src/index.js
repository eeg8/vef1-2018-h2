import {saekjaData} from './lib/helpers';
import {addListeners } from './lib/list';

document.addEventListener('DOMContentLoaded', () => {
  const sida = document.querySelector('body');

  const isFyrirlestur = sida.classList.contains('fyrirlestra-sida');
  saekjaData(isFyrirlestur, sida);
  if(!isFyrirlestur)
  {
    addListeners(sida);
  }
});
