const create = (tagName, attributes) => {
    const element = document.createElement(tagName);
    if (attributes) {
        const attrs = Object.keys(attributes);
        attrs.forEach(attr => element.setAttribute(attr, attributes[`${attr}`]));
    }
    
    return element;
}