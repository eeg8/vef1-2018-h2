import {saekjaData} from './lib/helpers';
import {addListeners } from './lib/list';

document.addEventListener('DOMContentLoaded', () => {
  const page = document.querySelector('body');

  const isFyrirlestur = page.classList.contains('fyrirlestra-sida');
  saekjaData(isFyrirlestur, page);
  if(!isFyrirlestur)
  {
    addListeners(page);
  }
});
