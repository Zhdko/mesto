import {Popup} from './Popup.js'

export class PopupWithImage extends Popup {
  constructor({popupSelector}, img, caption) {
    super({popupSelector}),
    this._img = document.querySelector(img),
    this._caption = document.querySelector(caption)
  }

  open({name, link}) {
    super.open()
    this._img.src = link;
    this._img.alt = name;
    this._caption.textContent = name;
  }
}