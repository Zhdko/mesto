const checkInputValidity = (form, input, config) => {
  const error = form.querySelector(`.${input.id}-error`);

  if (!input.validity.valid) {
    error.textContent = input.validationMessage;
    input.classList.add(config.inputErrorClass)
  } else {
    error.textContent = '';
    input.classList.remove(config.inputErrorClass)
  }
}

const toggleButtonState = (inputs, button, config) => {
  const isFormValid = inputs.every(input => {
    return input.validity.valid
  })
  
  if (!isFormValid) {
    button.classList.add(config.inactiveButtonClass);
    button.disabled = 'disabled'
  } else {
    button.classList.remove(config.inactiveButtonClass);
    button.disabled = ''
  }
}


const enableValidation = (config) => {
  const {formSelector, inputSelector, submitButtonSelector, ...rest} = config

  const forms = Array.from(document.querySelectorAll(formSelector));

  forms.forEach(form => {
    const inputs = Array.from(form.querySelectorAll(inputSelector))
    const button = form.querySelector(submitButtonSelector);
  
    form.addEventListener('submit', evt => evt.preventDefault());
  
    inputs.forEach(input => {
      input.addEventListener('input', () => {
  
        checkInputValidity(form, input, rest);
  
        toggleButtonState(inputs, button, rest);
      })
    })
  });
}

enableValidation({
  formSelector: '.form',
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_invalid',
  inputErrorClass: 'popup__text_invalid',
  errorClass: 'popup__error_visible'
})