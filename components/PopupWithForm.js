import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor({popupSelector, handleFormSubmit}) {
    super({popupSelector})
    this._handleFormSubmit = handleFormSubmit
  }

  close() {
    super.close();
    this._form.reset()
  }
  
  _getInputValues() {
    this._inputList = this._form.querySelectorAll('.popup__text');

    this._formValues = {};

    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    
    return this._formValues;
  }

  _handleSubmit = (evt) => {
    evt.preventDefault();
    this._handleFormSubmit(this._getInputValues());
  }

  _setEventListeners() {
    super._setEventListeners()
    this._form = this._popupSelector.querySelector('.form')
    this._form.addEventListener('submit', this._handleSubmit)
  }
}