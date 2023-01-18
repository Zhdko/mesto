import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor({popupSelector, inputSelector, handleFormSubmit}) {
    super({popupSelector})
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.form')
    this._inputList = Array.from(this._form.querySelectorAll(inputSelector))
  }

  close() {
    super.close();
    this._form.reset()
  }
  
  _getInputValues() {
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

  setEventListeners() {
    super.setEventListeners()
    this._form.addEventListener('submit', this._handleSubmit)
  }
}