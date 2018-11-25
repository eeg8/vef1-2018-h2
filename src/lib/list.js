import { empty, el, saekjaData } from './helpers';

export default class List {
  constructor() {
    this.container = document.querySelector('.list');
  }

  load(isFyrirlestur, sida) {
    const data = saekjaData(isFyrirlestur, sida);
  }
}
