import {openPopup} from './utils.js';
import {username} from './index.js';

export class Card {
  constructor(data, templateSelector, openPopup, openImagePopup) {
    this._title = data.title;
    this._imgLink = data.link;
    this._templateSelector = templateSelector;
    this._popupImage = document.querySelector('.popup_action_open-img');
    this._openPopup = openPopup;
    this._openImagePopup = openImagePopup
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
    this._image = this._element.querySelector('.card__image');
    this._like = this._element.querySelector('.card__like');

    this._image.src = this._imgLink;
    this._image.alt = `${this._title}. Автор: ${username.textContent}`;
    this._element.querySelector('.card__title').textContent = this._title;

    this._setEventListeners();

    return this._element;
  }

  _handleDeleteBtn() {
    this._element.remove();
  }

  _handleLikeBtn() {
    this._like.classList.toggle('card__like_active');
  }

  _openFullImg() {
    openPopup(this._popupImage);
    const name = this._title;
    const link = this._imgLink;
    this._openImagePopup({name, link})
  }

  _setEventListeners() {
    this._image.addEventListener('click', () => {
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