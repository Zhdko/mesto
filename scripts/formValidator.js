export class FormValidator {
  constructor(setting, form) {
    this._setting = setting
    this._form = form;
    this._button = this._form.querySelector(this._setting.submitButtonSelector);
    this._inputs = Array.from(this._form.querySelectorAll(this._setting.inputSelector));
  }

  _showInputError(input) {
    const error = this._form.querySelector(`.${input.id}-error`);
    error.textContent = input.validationMessage;
    input.classList.add(this._setting.inputErrorClass);
  }
  
  _hideInputError(input) {
    const error = this._form.querySelector(`.${input.id}-error`);
    error.textContent = '';
    input.classList.remove(this._setting.inputErrorClass);
  }

  _checkInputValidity(input) {
    if (!input.validity.valid) {
      this._showInputError(input)
    } else {
      this._hideInputError(input)
    }
  }

  _toggleButtonState() {
    const isFormValid = this._inputs.every(input => {
      return input.validity.valid;
    })
    
    if (!isFormValid) {
      this.disableSubmitButton()
    } else {
      this._button.classList.remove(this._setting.inactiveButtonClass);
      this._button.disabled = false;
    }
  }

  _setEventListeners() {
    this._inputs.forEach(input => {
      input.addEventListener('input', () => {
    
        this._checkInputValidity(input);
    
        this._toggleButtonState();
      })
    })
  }

  disableSubmitButton() {
    this._button.classList.add(this._setting.inactiveButtonClass);
    this._button.disabled = true
  }

  enableValidation() {
    this._setEventListeners();
  };
}

export const config = {
  formSelector: '.form',
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_invalid',
  inputErrorClass: 'popup__text_invalid',
  errorClass: 'popup__error_visible'
}