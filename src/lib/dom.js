import {
  el
} from './helpers';

export function loadDOMC(data, sida, isFyrirlestur) {

  if (isFyrirlestur) {
    loadLecture(data, sida);
  } else {
    loadAllLectures(data, sida);
  }
}

function loadAllLectures(data, sida) {
  // finna út hvað er valið efst
  const lectures = sida.querySelector('.fyrirlestrar');

  console.log(data);

  for (const i in data.lectures) {
    let lecture = data.lectures[i];

    const elem = el('section');

    if (lecture.thumbnail) {
      const image = el('img');
      image.classList.add('fyrirlestrar__img');
      image.setAttribute('src', lecture.thumbnail);
      elem.appendChild(image);
    }

    const flokkur = el('h2', lecture.category);
    flokkur.classList.add('fyrirlestrar__category');
    elem.appendChild(flokkur);
  

    const titill = el('h1', lecture.title);
    titill.classList.add('fyrirlestrar__title');

    const hak = el('img');
    hak.classList.add('fyrirlestrar__checkbox');
    hak.classList.add('fyrirlestrar__checkbox--hidden');
    hak.setAttribute('src', 'img/check.png');

    const wrap = el('div', titill, hak);
    wrap.classList.add('fyrirlestrar__titlewrap');
    elem.appendChild(wrap);

    elem.classList.add('fyrirlestrar__section');
    lectures.appendChild(elem);
  }
}

function loadLecture(data, sida) {
  const res = getObject(data);
  const obj = res.content;

  // ef undefined, gera eh villudót

  const lecture = sida.querySelector('.fyrirlestur');

  const haus = sida.querySelector('.fyrirl-haus');

  const flokkur = el("h2",res.category)
  flokkur.classList.add('fyrirl-haus__category');
  haus.appendChild(flokkur);

  const titill = el("h1",res.title);
  titill.classList.add('fyrirl-haus__title');
  header.appendChild(title);

  for (const i in obj) {
    const data = obj[i];
    switch (data.type) {
      case 'text':
        const text = el('p', data.data);
        text.classList.add('fyrirlestur__text')
        lecture.appendChild(text);
        break;
      case 'heading':
        const heading = el('h1', data.data);
        heading.classList.add('fyrirlestur__heading')
        lecture.appendChild(heading);
        break;
      case 'youtube':
        // todo
        break;
      case 'quote':
        const quote = el('div', el('p', data.data));
        quote.classList.add('fyrirlestur__quote');
        lecture.appendChild(quote);
        break;
      case 'list':
        const ul = el('ul');
        ul.classList.add('fyrirlestur__list');
        for (const j in data.data) {
          const li = el('li', data.data[j]);
          li.classList.add('fyrirlestur__listitem');
          ul.appendChild(li);
        }
        lecture.appendChild(ul);
        break;
      case 'image':
        const image = el('img');
        image.setAttribute('src', data.data);
        image.classList.add('fyrirlestur__image')
        lecture.appendChild(image);
        break;
      case 'code':
        const code = el('pre', el('p', data.data));
        code.classList.add('fyrirlestur__code')
        lecture.appendChild(code);
        break;
    }
  }
}

function getObject(data) {
  const url_string = window.location.href;
  const url = new URL(url_string);
  const slug = url.searchParams.get("slug");
  return dataUrSlug(data, slug);
}

function dataUrSlug(data, slug) {
  for (const i in data.lectures) {
    const lecture = data.lectures[i];
    if (lecture.slug === slug) {
      return lecture;
    }
  }
}
