export class Section {
  constructor(renderer, containerSelector) {
    this._renderer = renderer,
    this._container = document.querySelector(containerSelector)
  }

  renderItems(items) {
    items.forEach(item => {
      const card = this._renderer(item)
      this.addItem(card)
    })
  }

  addItem(element) {
    this._container.append(element)
  }
}