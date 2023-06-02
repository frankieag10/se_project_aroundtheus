export default class Section {
  constructor({ data, render }, cardSelector) {
    this._renderedItems = data;
    this._render = render;
    this._container = document.querySelector(cardSelector);
  }

  addItem(element) {
    this._container.prepend(element);
  }
  renderItems() {
    this._renderedItems.forEach((item) => {
      this._render(item);
    });
  }
}
