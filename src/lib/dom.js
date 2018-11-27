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
  const shit = page.getElementsByClassName('lectures__titlewrap');

  for(let i = 0; i < shit.length; i++) {
    shit[i].addEventListener('click', () => {
      clickHandler(shit[i].children[1]);
    });
  }

  const htmlElement = page.getElementsByClassName("html__takki");
  const cssElement = page.getElementsByClassName("css__takki");
  const javascriptElement = page.getElementsByClassName("javascript__takki");

  htmlElement[0].addEventListener('click' , () => {
    htmlHandler(htmlElement[0]);
  });
  cssElement[0].addEventListener('click' , () => {
    cssHandler(cssElement[0]);
  });
  javascriptElement[0].addEventListener('click' , () => {
    jsHandler(javascriptElement[0]);
  });
}

function clickHandler(e) {
  const foreldri = e.parentNode;
  var t = foreldri.removeChild(e);
  if(e.className == "lectures__checkbox") {
    const source = document.createElement('img');
    source.setAttribute('class' , 'lectures__checkbox--hidden');
    source.setAttribute('src' , 'img/check.png');
    foreldri.appendChild(source);
  } 
  else {
    const source = document.createElement('img');
    source.setAttribute('class' , 'lectures__checkbox');
    source.setAttribute('src' , 'img/check.png');
    foreldri.appendChild(source);
  }
}

function htmlHandler(e) {
  const foreldri = e.parentNode;
  foreldri.removeChild(e);
  const source = document.createElement('button');
  source.setAttribute('class' , 'html__takki--active');
  source.innerHTML = 'HTML';
  foreldri.insertBefore(source, foreldri.childNodes[1]);
  console.log(foreldri);

  const htmlElement2 = document.getElementsByClassName("html__takki--active");
  htmlElement2[0].addEventListener('click' , () => {
    htmlHandler2(htmlElement2[0]);
  });
}

function htmlHandler2(e) {
  const foreldri = e.parentNode;
  foreldri.removeChild(e);
  const source = document.createElement('button');
  source.setAttribute('class' , 'html__takki');
  source.innerHTML = 'HTML';
  foreldri.insertBefore(source, foreldri.childNodes[1]);
  console.log(e);

  const foreldri2 = foreldri.parentNode;
  const placeholder = document.getElementsByClassName("lectures__section");
  console.log(foreldri2);
  console.log(placeholder[0]);
  console.log(placeholder[1]);
  console.log(placeholder[2]);
  var t = foreldri2.removeChild(placeholder[0]);
  var f = foreldri2.removeChild(placeholder[0]);
  var x = foreldri2.removeChild(placeholder[0]);
  console.log(f);
  console.log(t);
  console.log(x);
  const htmlElement = document.getElementsByClassName("html__takki");
  htmlElement[0].addEventListener('click' , () => {
    htmlHandler(htmlElement[0]);
  });
}

function cssHandler(e) {
  const foreldri = e.parentNode;
  foreldri.removeChild(e);
  const source = document.createElement('button');
  source.setAttribute('class' , 'css__takki--active');
  source.innerHTML = 'CSS';
  foreldri.insertBefore(source, foreldri.childNodes[2]);
  console.log(foreldri);

  const cssElement2 = document.getElementsByClassName("css__takki--active");
  cssElement2[0].addEventListener('click' , () => {
    cssHandler2(cssElement2[0]);
  });
}

function cssHandler2(e) {
  const foreldri = e.parentNode;
  foreldri.removeChild(e);
  const source = document.createElement('button');
  source.setAttribute('class' , 'css__takki');
  source.innerHTML = 'CSS';
  foreldri.insertBefore(source, foreldri.childNodes[2]);
  console.log(foreldri);
  const eh = document.querySelector('.lectures');
  const eh2 = eh.querySelector('.lectures__section');
  console.log(eh2);
  console.log(eh);

  const cssElement = document.getElementsByClassName("css__takki");
  cssElement[0].addEventListener('click' , () => {
    cssHandler(cssElement[0]);
  });

  const foreldri2 = foreldri.parentNode;
  const lengd = document.getElementsByClassName('lectures__section');
  const lectures__foreldri = lengd[1].parentNode;
  console.log(lectures__foreldri);
  if(lengd.length == 13) {
    /*for(let i = 0; i < lengd.length; i++) {
      console.log(lengd[i]);
      console.log(elementPlaceholder);
      const elementPlaceholder = lengd[i].getElementsByClassName('lectures__category');
      if(elementPlaceholder.innerText != "css") {
        lectures__foreldri.removeChild(lengd[i]);
        i--;
      }
    }*/
    for(let i = 0; i < 3; i++) {
      lectures__foreldri.removeChild(lengd[0]);
      console.log(lectures__foreldri);
    }
  } else {
    return 1337;
  }
  /*const placeholder = document.getElementsByClassName("lectures__section");
  foreldri2.removeChild(placeholder[3]);
  foreldri2.removeChild(placeholder[3]);
  foreldri2.removeChild(placeholder[3]);
  foreldri2.removeChild(placeholder[3]);*/
}

function jsHandler(e) {
  const foreldri = e.parentNode;
  foreldri.removeChild(e);
  const source = document.createElement('button');
  source.setAttribute('class' , 'javascript__takki--active');
  source.innerHTML = 'JavaScript';
  foreldri.appendChild(source);
  console.log(foreldri);

  const jsElement2 = document.getElementsByClassName("javascript__takki--active");
  jsElement2[0].addEventListener('click' , () => {
    jsHandler2(jsElement2[0]);
  });
}

function jsHandler2(e) {
  const foreldri = e.parentNode;
  foreldri.removeChild(e);
  const source = document.createElement('button');
  source.setAttribute('class' , 'javascript__takki');
  source.innerHTML = 'JavaScript';
  foreldri.appendChild(source);
  console.log(foreldri);

  const jsElement = document.getElementsByClassName("javascript__takki");
  jsElement[0].addEventListener('click' , () => {
    jsHandler(jsElement[0]);
  });
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
