import List from './lib/list';
import { loadLectureList } from './lib/dom';

document.addEventListener('DOMContentLoaded', () => {
  const page = document.querySelector('body');

  const isFyrirlestur = page.classList.contains('fyrirlestra-sida');

  const list = new List();

  const data = list.load(isFyrirlestur, page);
});
