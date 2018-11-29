import { loadDOMC } from './utlit';


export function empty(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

export function saekjaData(isFyrirlestur, sida) {
  fetch('./lectures.json')
    .then((response) => {
      if (response.ok) 
      {
        return response.json();
      }

      throw new Error('Villa kom');

    })
    .then((data) => {
          loadDOMC(data, sida, isFyrirlestur);})
    .catch((error) => {
      displayError('Villa!');
      console.error(error);
    })

}


export function el(name, ...children) {
  const element = document.createElement(name);

  if (Array.isArray(children)) {
    children.forEach((child) => {
      if (typeof child === 'string') 
      {
        element.appendChild(document.createTextNode(child));
      } 
      else if (child) 
      {
        element.appendChild(child);
      }
    });
  }

  return element;
}