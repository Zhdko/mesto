import { Popup } from "./Popup"

export class PopupWithConfirmation extends Popup {
  constructor({popupSelector}, handleSubmitDel){
    super({popupSelector}),
    this._btn = document.querySelector('.delete-submit-btn')
    this._handleSubmitDel = handleSubmitDel
    this._btnText = this._btn.textContent
  }

  disableSubmitBtn(text) {
    this._btn.disabled = true;
    this._btn.textContent = text

  }

  unDisableSubmitBtn() {
    this._btn.disabled = false;
    this._btn.textContent = this._btnText
  }

  setTarget(card ,target) {
    this._target = target
    this._card = card
  }

  setEventListeners() {
    super.setEventListeners()
    this._btn.addEventListener('click', () => {
      this._handleSubmitDel(this._card, this._target)})
  }

}