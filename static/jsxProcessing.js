function convertJsx(tag, attrs, ...children) {
  if (tag === "svg") {
    return createAndAppendSVG(attrs, ...children);
  }

  const elem = createElement(tag, attrs);

  for (const child of children) {
    appendChild(elem, child);
  }

  return elem;
}

function createElement(elem, attrs) {
  if (elem instanceof Function) {
    return elem(attrs);
  }
  if (elem instanceof HTMLElement) {
    addAttributes(elem, attrs);
    return elem;
  }

  const element = document.createElement(elem);
  addAttributes(element, attrs);
  return element;
}

const createAndAppendSVG = (attrs, ...children) => {
  const element = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  addAttributes(element, attrs);

  for (const child of children) {
    const childElement = document.createElementNS('http://www.w3.org/2000/svg', child.nodeName.toLowerCase())

    for (const attribute of child.attributes) {
      childElement.setAttributeNS(null, attribute.nodeName, attribute.nodeValue);
    }

    appendChild(element, childElement);
  }

  return element;
}

function appendChild(elem, children) {
  if (!children || children === undefined) return;

  if (children instanceof Array) {
    children.map(child => appendChild(elem, child));
    return;
  }

  let child = children;

  if (!(child instanceof Node)) {
    child = document.createTextNode(child.toString());
  }

  elem.appendChild(child);
}

function splitCamelCase(str) {
  return str.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}

function addAttributes(elem, attrs) {
  if (attrs === null || attrs === undefined) attrs = {};
  for (let [attr, value] of Object.entries(attrs)) {
    if (value === true) elem.setAttribute(attr, attr);
    else if (attr.startsWith("on") && typeof value === "function") {
      elem.addEventListener(attr.substr(2).toLowerCase(), value);
    } else if (value !== false && value !== null && value !== undefined) {
      if (value instanceof Object) {
        const modifier =
          attr === "style" ? splitCamelCase : str => str.toLowerCase();

        value = Object.entries(value)
          .map(([key, val]) => `${modifier(key)}: ${val}`)
          .join("; ");
      }

      if (attr === "className" && value !== "")
        elem.classList.add(
          ...value
            .toString()
            .trim()
            .split(" ")
        );
      else elem.setAttribute(attr, value.toString());
    }
  }
}

function ConsoleRenderer() {
  this.render = (content, root) => console.log(content);
}

function DocumentRenderer() {
  this.render = (content, root) => {
    root.appendChild(content);
  };
}

var jsxRenderer = new DocumentRenderer();

var jsxConverter = {
    Fragment: () => new DocumentFragment(),
    createElement: convertJsx
};