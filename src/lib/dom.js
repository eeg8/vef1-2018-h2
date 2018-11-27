import {
  el
} from './helpers';

export function loadDom(data, page, isLecturePage) {

  if (isLecturePage) {
    loadLecture(data, page);
  } else {
    loadLectures(data, page);
  }
  
}

function loadLectures(data, page) {
  // finna út hvað er valið efst
  const lectures = page.querySelector('.lectures');
  for (const i in data.lectures) {
    let lecture = data.lectures[i];

    const element = el('section');

    if (lecture.thumbnail) {
      const img = el('img');
      img.classList.add('lectures__img');
      img.setAttribute('src', lecture.thumbnail);
      element.appendChild(img);
    }

    const cat = el('h2', lecture.category);
    cat.classList.add('lectures__category');
    element.appendChild(cat);


    const title = el('h1', lecture.title);
    title.classList.add('lectures__title');

    const check = el('img');
    check.classList.add('lectures__checkbox--hidden');
    check.setAttribute('src', 'img/check.png');

    const wrap = el('div', title, check);
    wrap.classList.add('lectures__titlewrap');

    element.appendChild(wrap);
    element.classList.add('lectures__section');
    lectures.appendChild(element);
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

function loadLecture(data, page) {
  const res = getObject(data);
  const object = res.content;

  // ef undefined, gera eh villudót

  const lecture = page.querySelector('.lecture');

  const header = page.querySelector('.lectureheader');

  const category = el("h2",res.category)
  category.classList.add('lectureheader__category');
  header.appendChild(category);

  const title = el("h1",res.title);
  title.classList.add('lectureheader__title');
  header.appendChild(title);

  for (const i in object) {
    const data = object[i];
    switch (data.type) {
      case 'heading':
        const heading = el('h1', data.data);
        heading.classList.add('lecture__heading')
        lecture.appendChild(heading);
        break;
      case 'text':
        const text = el('p', data.data);
        text.classList.add('lecture__text')
        lecture.appendChild(text);
        break;
      case 'quote':
        const quote = el('div', el('p', data.data));
        quote.classList.add('lecture__quote');
        lecture.appendChild(quote);
        break;
      case 'youtube':
        // todo
        break;
      case 'image':
        const img = el('img');
        img.setAttribute('src', data.data);
        img.classList.add('lecture__image')
        lecture.appendChild(img);
        break;
      case 'list':
        const ul = el('ul');
        ul.classList.add('lecture__list');
        for (const j in data.data) {
          const li = el('li', data.data[j]);
          li.classList.add('lecture__listitem');
          ul.appendChild(li);
        }
        lecture.appendChild(ul);
        break;
      case 'code':
        const code = el('pre', el('p', data.data));
        code.classList.add('lecture__code')
        lecture.appendChild(code);
        break;
    }
  }
}

function getObject(data) {
  const url_string = window.location.href;
  const url = new URL(url_string);
  const slug = url.searchParams.get("slug");
  return findFromSlug(data, slug);
}

function findFromSlug(data, slug) {
  for (const i in data.lectures) {
    const lecture = data.lectures[i];
    if (lecture.slug === slug) {
      return lecture;
    }
  }
}
