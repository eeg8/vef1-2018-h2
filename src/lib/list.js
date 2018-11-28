import {saekjaData } from './helpers';
import { add, remove } from './geymsla';
import {getFyrirlestur, athugaSlug} from './utlit'

function athVirkni(el) {
  return el.className === '.takki';
}

function siaTakka(takkar) {
  return takkar.filter(athVirkni);
}

function onToggle(e) {
  const element = e.srcElement;
  element.classList.toggle('takki--toggled');
  saekjaData(false, document.querySelector('body'));
}


export function addListeners(sida) {
  const flokkur = sida.querySelector('.takkar__saman');
  console.log(flokkur);
  let takkar = Array.from(flokkur.childNodes);

  takkar = siaTakka(takkar);

  for (let i = 0; i < takkar.length; i += 1) {
    takkar[i].addEventListener('click', onToggle);
  }
}

export function finishedListener(e) {
  const slug = getFyrirlestur();
  const fyrirlestur = e.path[1];
  const img = fyrirlestur.firstChild;
  const p = fyrirlestur.lastChild;
  if (athugaSlug(slug)) {
    remove(slug);
    p.textContent = 'Klára fyrirlestur';
  } else {
    add(slug);
    p.textContent = 'Fyrirlestri lokið';
  }
  img.classList.toggle('fyrirlestur__hak--falid');
  fyrirlestur.classList.toggle('fyrirlestur__lok--gron');
}