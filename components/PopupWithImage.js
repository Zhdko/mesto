import {Popup} from './Popup.js'
import { fullWidthCaption, fullWidthImg } from '../constants.js';

export class PopupWithImage extends Popup {
  constructor({popupSelector}) {
    super({popupSelector}),
    this._img = fullWidthImg,
    this._caption = fullWidthCaption
  }

  open({name, link}) {
    super.open()
    this._img.src = link;
    this._img.alt = name;
    this._caption.textContent = name;
  }
}