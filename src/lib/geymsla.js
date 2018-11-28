const LOCALSTORAGE_KEY = 'lectures_finished';

export function load() {
  return JSON.parse(window.localStorage.getItem(LOCALSTORAGE_KEY));
}

export function check(sluggid) {
  const data = window.localStorage.getItem(LOCALSTORAGE_KEY);
  if(data === null) {
    return false;
  }
  const obj = JSON.parse(data);
  for (let i = 0; i < obj.length; i += 1) {
    if (obj[i].slug === sluggid) {
      return true;
    }
  }
  return false;
}

export function add(sluggid) {
  const data = window.localStorage.getItem(LOCALSTORAGE_KEY);

  if (data === null) {
    const fylkid = JSON.stringify([{
      slug: sluggid,
    }]);
    window.localStorage.setItem(LOCALSTORAGE_KEY, fylkid);
  } else {
    const obj = JSON.parse(data);
    obj.push({
      slug: sluggid,
    });
    window.localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(obj));
  }
}

export function remove(sluggid) {
  const data = window.localStorage.getItem(LOCALSTORAGE_KEY);

  if (data !== null) {
    let obj = JSON.parse(data);
    obj = obj.filter(item => item.slug !== sluggid);
    window.localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(obj));
  }
}


export function clear() {
  window.localStorage.removeItem(LOCALSTORAGE_KEY);
}
