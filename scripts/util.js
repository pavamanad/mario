var utils = (function (module) {
  window.module = window.module ? window.module : module;

  const createElements = function (tagName, childNodes, attributes) {
    let el = document.createElement(tagName);
    for (let attr in attributes) {
      el.setAttribute(attr, attributes[attr]);
    }
    childNodes.forEach(childNode => {
      if (childNode instanceof HTMLElement) {
        el.appendChild(childNode);
      } else {
        let textNode = document.createTextNode(childNode)
        el.appendChild(textNode);
      }
    });
    return el;
  }

  const randomGenerator = function () {
    return Math.floor(Math.random() * Math.floor(module.N));
  }

  return {
    createElements,
    randomGenerator
  }

})(window.module || {})