import {openPopup} from './index.js'
export class Card {
  constructor(data, templateSelector) {
    this._title = data.title;
    this._imgLink = data.link;
    this._templateSelector = templateSelector;
    this._fullImg = document.querySelector('.full-width__image');
    this._fullImgCaption = document.querySelector('.full-width__caption');
    this._popupImage = document.querySelector('.popup_action_open-img')
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);
    return cardElement
  }

  generateCard() {
    this._element = this._getTemplate();
    
    this._element.querySelector('.card__image').src = this._imgLink;
    this._element.querySelector('.card__title').textContent = this._title;
    this._element.querySelector('.card__image').alt = `${this._title}. Автор: ${username.textContent}`

    this._setEventListeners();

    return this._element;
  }

  _handlerDeleteCard() {
    this._element.remove();
  }

  _handlerLikeBtn() {
    this._element.querySelector('.card__like').classList.toggle('card__like_active');
  }

  _handleOpenFullImg() {
    openPopup(this._popupImage);

    this._fullImg.src = this._imgLink;
    this._fullImg.alt = `${this._title}. Автор: ${username.textContent}`
    this._fullImgCaption.textContent = this._title;
  }

  _setEventListeners() {
    this._element.querySelector('.card__image').addEventListener('click', () => {
      this._handleOpenFullImg();
    });

    this._element.querySelector('.card__delete').addEventListener('click', () => {
      this._handlerDeleteCard();
    });

    this._element.querySelector('.card__like').addEventListener('click', () => {
      this._handlerLikeBtn();
    });
  }
}