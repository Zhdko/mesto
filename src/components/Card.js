export class Card {
  constructor({data, handleCardClick}, username, templateSelector) {
    this._title = data.title;
    this._imgLink = data.link;
    this._username = username
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);
  }

  generateCard() {
    this._element = this._getTemplate();
    this._image = this._element.querySelector('.card__image');
    this._like = this._element.querySelector('.card__like');

    this._image.src = this._imgLink;
    this._image.alt = `${this._title}. Автор: ${this._username.textContent}`;
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

  _setEventListeners() {
    this._image.addEventListener('click', () => {
      this._handleCardClick();
    });

    this._element.querySelector('.card__delete').addEventListener('click', () => {
      this._handleDeleteBtn();
    });

    this._element.querySelector('.card__like').addEventListener('click', () => {
      this._handleLikeBtn();
    });
  }
}