export class Popup {
  constructor({popupSelector}) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', (evt) => this._handleEscClose(evt))
    this._setEventListeners(); //Не понимаю где нужно вызвать этот метод, если нельзя при открытии 
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', (evt) => this._handleEscClose(evt))
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _setEventListeners() {
    this._popup.querySelector('.button-icon_action_close').addEventListener('click', () => {
      this.close()
    });
    this._popup.addEventListener('click', (evt) =>{
      if (evt.target === this._popup) {
        this.close();
      }
    });
  }
}