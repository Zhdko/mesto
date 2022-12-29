export class FormValidator {
  constructor(config, formSelector) {
    this._formSelector = formSelector;
    this._button = this._formSelector.querySelector(config.submitButtonSelector);
    this._inputs = Array.from(this._formSelector.querySelectorAll(config.inputSelector));
  }

  _showInputError(input) {
    const error = this._formSelector.querySelector(`.${input.id}-error`);
    error.textContent = input.validationMessage;
    input.classList.add(config.inputErrorClass);
  }
  
  _hideInputError(input) {
    const error = this._formSelector.querySelector(`.${input.id}-error`);
    error.textContent = '';
    input.classList.remove(config.inputErrorClass);
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
      this._button.classList.add(config.inactiveButtonClass);
      this._button.disabled = 'disabled';
    } else {
      this._button.classList.remove(config.inactiveButtonClass);
      this._button.disabled = '';
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
    this._button.classList.add(config.inactiveButtonClass);
    this._button.disabled = 'disabled'
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