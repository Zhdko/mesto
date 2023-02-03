export class Section {
  constructor(renderer, containerSelector) {
    this._renderer = renderer,
    this._container = document.querySelector(containerSelector)
  }

  renderItems(items) {
    items.forEach(item => {
      const card = this._renderer(item)
      this._container.append(card)
    })
  }

  addItem(element) {
    this._container.prepend(element)
  }
}