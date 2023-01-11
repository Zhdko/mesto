import {openPopup, openImagePopup} from './utils.js';
import {username} from './index.js';

export class Card {
  constructor(data, templateSelector, openPopup) {
    this._title = data.title;
    this._imgLink = data.link;
    this._templateSelector = templateSelector;
    this._fullImg = document.querySelector('.full-width__image');
    this._fullImgCaption = document.querySelector('.full-width__caption');
    this._popupImage = document.querySelector('.popup_action_open-img');
    this._openPopup = openPopup
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
    const image =  this._element.querySelector('.card__image');

    image.src = this._imgLink;
    image.alt = `${this._title}. Автор: ${username.textContent}`;
    this._element.querySelector('.card__title').textContent = this._title;

    this._setEventListeners(image);

    return this._element;
  }

  _handleDeleteBtn() {
    this._element.remove();
  }

  _handleLikeBtn() {
    this._element.querySelector('.card__like').classList.toggle('card__like_active');
  }

  _openFullImg() {
    openPopup(this._popupImage);

    this._fullImg.src = this._imgLink;
    this._fullImg.alt = `${this._title}. Автор: ${username.textContent}`
    this._fullImgCaption.textContent = this._title;
  }

  _setEventListeners(image) {
    image.addEventListener('click', () => {
      this._openFullImg();
    });

    this._element.querySelector('.card__delete').addEventListener('click', () => {
      this._handleDeleteBtn();
    });

    this._element.querySelector('.card__like').addEventListener('click', () => {
      this._handleLikeBtn();
    });
  }
}