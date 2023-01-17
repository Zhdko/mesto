export class Popup {
  constructor({popupSelector}) {
    this._popupSelector = document.querySelector(popupSelector);
  }

  open() {
    this._popupSelector.classList.add('popup_opened');
    this._setEventListeners();
  }

  close() {
    this._popupSelector.classList.remove('popup_opened');
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _setEventListeners() {
    this._popupSelector.querySelector('.button-icon_action_close').addEventListener('click', () => {
      this.close()
    });
    this._popupSelector.addEventListener('click', (evt) =>{
      if (evt.target === this._popupSelector) {
        this.close();
      }
    });
    document.addEventListener('keydown', (evt) => this._handleEscClose(evt))
  }
}