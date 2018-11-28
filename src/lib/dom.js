import {el, empty} from './helpers';
import {check} from './storage';
import {finishedListener} from './list'


export function getFyrirlestur() {
  const url1 = window.location.href;
  const url2 = new URL(url1);
  return url2.searchParams.get('slug');
}

function dataUrSlug(data, slug) {
  for (let i = 0; i < data.lectures.length; i += 1) {
    const lecture = data.lectures[i];
    if (lecture.slug === slug) {
      return lecture;
    }
  }
  return null;
}

function getObject(data) {
  const object = getFyrirlestur();
  return dataUrSlug(data,object);
}

function checkFunction(element) {
  if (element.className === undefined) {
    return false;
  }
  return element.className.includes('category__button--toggled');
}

function filterButtons(buttons) {
  return buttons.filter(checkFunction);
}

function filterCheck(page) {
  const category = page.querySelector('.category__wrap');
  let buttons = Array.from(category.childNodes);
  buttons = filterButtons(buttons);
  buttons = buttons.map(x => x.outerText.toLowerCase());
  return buttons;
}

export function checkSlug(slug) {
  return check(slug);
}


function loadAllLectures(data, sida) {

  let filtered = filterCheck(sida);
  if (filtered.length === 0) {
    filtered = ["html", "css", "javascript"];
  }
  
  const lectures = sida.querySelector('.fyrirlestrar');

  empty(lectures);


  for (let i = 0; i < data.lectures.length; i += 1) {
    let lecture = data.lectures[i];

    if (filtered.includes(lecture.category)) {

      const elem = el('a');
      const column = el('div');
      column.classList.add('lectures__col');

      if (lecture.thumbnail) {
        const mynd = el('img');
        mynd.classList.add('fyrirlestrar__img');
        mynd.setAttribute('src', lecture.thumbnail);
        elem.appendChild(mynd);
      }
      else {
        elem.classList.add('fyrirlestrar__img--enginimg')
      }

      const flokkur = el('h2', lecture.category);
      flokkur.classList.add('fyrirlestrar__flokkur');
      elem.appendChild(flokkur);
  

      const titill = el('h1', lecture.title);
      titill.classList.add('fyrirlestrar__titill');

      const checkMark = el('p', '✓');
      checkMark.classList.add('lectures__checkbox');
      if (!checkSlug(lecture.slug)) {
        checkMark.classList.add('lectures__checkbox--hidden');
      }

      const wrap = el('div', titill, checkMark);
      wrap.classList.add('fyrirlestrar__titlewrap');
      elem.appendChild(wrap);
      elem.classList.add('fyrirlestrar__hluti');
      lectures.appendChild(elem);

      const href = `fyrirlestur.html?slug=${lecture.slug}`;
      elem.setAttribute('href', href);

      column.appendChild(elem);
      lectures.appendChild(column);
    }
  }
}

function loadLecture(data, sida) {
  const res = getObject(data);
  const hlutur = res.content;

  const lecture = sida.querySelector('.fyrirlestur');
  const haus = sida.querySelector('.fyrirl-haus');
  haus.style.background = `linear-gradient(rgba(255,255,255,0.2),rgba(255,255,255,0.2)), url(./${res.image})`;

  const haus2 = sida.querySelector('.fyrirl-haus2');

  const flokkur = el("h2",res.category)
  flokkur.classList.add('fyrirl-haus__flokkur');
  haus2.appendChild(flokkur);

  const titill = el("h1",res.title);
  titill.classList.add('fyrirl-haus__titill');
  haus2.appendChild(titill);
  

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
      default: {
        break;
      }
    }
  }
  const checkmark = el('p', '✓');
  checkmark.classList.add('lecture__check');
  if (!checkSlug(res.slug)) {
    checkmark.classList.add('lecture__check--hidden');
  }
  const finished = el('div', checkmark);


  finished.classList.add('lecture__finish');
  if (checkSlug(res.slug)) {
    finished.classList.add('lecture__finish--green');
    finished.appendChild(el('p', 'Fyrirlestur kláraður'));
  } else {
    finished.appendChild(el('p', 'Klára fyrirlestur'));
  }
  finished.addEventListener('click', finishedListener);
  const finishedWrap = el('div', finished);
  finishedWrap.classList.add('lecture__finishwrap');
  lecture.appendChild(finishedWrap);
}

export function loadDOMC(data, sida, isFyrirlestur) {

  if (isFyrirlestur) {
    loadLecture(data, sida);
  } else {
    loadAllLectures(data, sida);
  }
}
