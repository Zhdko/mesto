import { Popup } from "./Popup"

export class PopupWithConfirmation extends Popup {
  constructor({popupSelector}, handleSubmitDel){
    super({popupSelector}),
    this._btn = document.querySelector('.delete-submit-btn')
    this._handleSubmitDel = handleSubmitDel
  }

  setTarget(target) {
    this._target = target
  }

  setEventListeners() {
    super.setEventListeners()
    this._btn.addEventListener('click', () => {
      this._handleSubmitDel(this._target)})
  }

}