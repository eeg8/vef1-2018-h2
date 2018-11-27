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
  

  const hausMynd = `background: url(../${res.image})`;
  haus.setAttribute('style', hausMynd);

  const haus2 = sida.querySelector('.fyrirl-haus2');

  const flokkur = el("h2",res.category)
  flokkur.classList.add('fyrirl-haus__flokkur');
  haus2.appendChild(flokkur);

  const titill = el("h1",res.title);
  titill.classList.add('fyrirl-haus__titill');
  haus2.appendChild(titill);
  

  /*const hausMynd = el("img");
  hausMynd.setAttribute('src', res.image);
  hausMynd.classList.add('fyrirl-haus__mynd')
  haus.appendChild(hausMynd);
  document.getElementById('fyrirl-haus').style.backgroundImage = "url('res.image')";
  */

  for (const i in hlutur) {
    const data = hlutur[i];
    switch (data.type) {
      case 'text':
        const malsgrein = el('div');
        const pTexti = data.data.split("\n");
        for (const j in pTexti) {
          const skipting = el('p', pTexti[j]);
          skipting.classList.add('fyrirlestur__malsgrein');
          malsgrein.appendChild(skipting);
        }
        malsgrein.classList.add('fyrirlestur__texti')
        lecture.appendChild(malsgrein);
        break;
      case 'heading':
        const fyrirsogn = el('h2', data.data);
        fyrirsogn.classList.add('fyrirlestur__fyrirsogn')
        lecture.appendChild(fyrirsogn);
        break;
      case 'youtube':
        // todo
        const youtube = el('iframe');
        youtube.setAttribute('frameBorder', 0);
        youtube.setAttribute('src', data.data);
        youtube.classList.add('fyrirlestur__youtube')
        lecture.appendChild(youtube);
        break;
      case 'quote':
        const tilvitnun = el('div', el('p', data.data));
        const hofundur = el('div', el('p', data.attribute))
        tilvitnun.classList.add('fyrirlestur__tilvitnun');
        hofundur.classList.add('fyrirlestur__tilvitnun--hofundur')
        tilvitnun.appendChild(hofundur);
        lecture.appendChild(tilvitnun);
        break;
      case 'list':
        const listi = el('ul');
        listi.classList.add('fyrirlestur__listi');
        for (const j in data.data) {
          const stak = el('li', data.data[j]);
          stak.classList.add('fyrirlestur__listi--stak');
          listi.appendChild(stak);
        }
        lecture.appendChild(listi);
        break;
      case 'image':
        const mynd = el('img');
        mynd.setAttribute('src', data.data);
        mynd.classList.add('fyrirlestur__mynd')
        const yfirskrift = el('div',el('p', data.caption))
        yfirskrift.classList.add('fyrirlestur__mynd--yfirskrift')
        
        lecture.appendChild(mynd);
        lecture.appendChild(yfirskrift);
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
