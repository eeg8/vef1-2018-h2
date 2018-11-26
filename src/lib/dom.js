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
      const mynd = el('img');
      mynd.classList.add('fyrirlestrar__img');
      mynd.setAttribute('src', lecture.thumbnail);
      elem.appendChild(mynd);
    }

    const flokkur = el('h2', lecture.category);
    flokkur.classList.add('fyrirlestrar__flokkur');
    elem.appendChild(flokkur);
  

    const titill = el('h1', lecture.title);
    titill.classList.add('fyrirlestrar__titill');

    const hak = el('img');
    hak.classList.add('fyrirlestrar__hak');
    hak.classList.add('fyrirlestrar__hak--hidden');
    hak.setAttribute('src', 'img/check.png');

    const wrap = el('div', titill, hak);
    wrap.classList.add('fyrirlestrar__titlewrap');
    elem.appendChild(wrap);

    elem.classList.add('fyrirlestrar__hluti');
    lectures.appendChild(elem);
  }
}

function loadLecture(data, sida) {
  const res = getFyrirlestur(data);
  const hlutur = res.content;

  // ef undefined, gera eh villudót

  const lecture = sida.querySelector('.fyrirlestur');

  const haus = sida.querySelector('.fyrirl-haus');

  const flokkur = el("h2",res.category)
  flokkur.classList.add('fyrirl-haus__flokkur');
  haus.appendChild(flokkur);

  const titill = el("h1",res.title);
  titill.classList.add('fyrirl-haus__titill');
  haus.appendChild(titill);

  const hausMynd = el("img");
  hausMynd.setAttribute('src', res.image);
  hausMynd.classList.add('fyrirl-haus__mynd')
  haus.appendChild(hausMynd);

  

  for (const i in hlutur) {
    const data = hlutur[i];
    switch (data.type) {
      case 'text':
        const pTexti = el('p', data.data);
        pTexti.classList.add('fyrirlestur__texti')
        lecture.appendChild(pTexti);
        break;
      case 'heading':
        const fyrirsogn = el('h1', data.data);
        fyrirsogn.classList.add('fyrirlestur__fyrirsogn')
        lecture.appendChild(fyrirsogn);
        break;
      case 'youtube':
        // todo
        break;
      case 'quote':
        const tilvitnun = el('div', el('p', data.data));

        tilvitnun.classList.add('fyrirlestur__tilvitnun');
        lecture.appendChild(tilvitnun);
        break;
      case 'list':
        const listi = el('ul');
        listi.classList.add('fyrirlestur__listi');
        for (const j in data.data) {
          const stak = el('li', data.data[j]);
          stak.classList.add('fyrirlestur__listiStak');
          listi.appendChild(stak);
        }
        lecture.appendChild(listi);
        break;
      case 'image':
        const mynd = el('img');
        mynd.setAttribute('src', data.data);
        mynd.classList.add('fyrirlestur__mynd')

        lecture.appendChild(mynd);
        break;
      case 'code':
        const kod = el('pre', el('p', data.data));
        kod.classList.add('fyrirlestur__kodi')
        lecture.appendChild(kod);
        break;
    }
  }
}

function getFyrirlestur(data) {
  const url1 = window.location.href;
  const url2 = new URL(url1);

  const slug = url2.searchParams.get("slug");

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
