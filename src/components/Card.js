export class Card {
  constructor({data, handleCardClick}, username, templateSelector, handleDeleteBtnClick, userId, handleLikeCard) {
    this._name = data.name,
    this._imgLink = data.link,
    this._username = username,
    this._templateSelector = templateSelector,
    this._handleCardClick = handleCardClick,
    this._handleDeleteBtnClick = handleDeleteBtnClick
    this._cardUserId = data.owner._id
    this._userId = userId
    this._cardId = data._id
    this._handleLikeCard = handleLikeCard
    this._likesArr = data.likes
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
    this._image.alt = `${this._name}. Автор: ${this._username.textContent}`;
    this._element.querySelector('.card__title').textContent = this._name;

    this.setLike()
    this._setEventListeners();
    
    if(this._cardUserId !== this._userId){
      this._element.querySelector('.card__delete').remove();
    }
    return this._element;
  }


  _checkLike() {
    return this._likesArr.some(user => user._id === this._userId)
  }

  setLike(likes) {
    const likeCount = this._element.querySelector('.like__counter');
    

    if(likes){
      this._likesArr = likes.likes
    }

    if(this._checkLike()) {
      this._like.classList.add('card__like_active');
      likeCount.textContent = this._likesArr.length;
        if(likeCount.textContent === '0') {
          likeCount.textContent = ''
        }
    } else {
      this._like.classList.remove('card__like_active');
      likeCount.textContent = this._likesArr.length;
        if(likeCount.textContent === '0') {
          likeCount.textContent = ''
        }
    } 
  }
  
  deleteCard () {
    this._element.remove();
    this._element = null;
  }

  _handleDeleteBtn() {
    this._handleDeleteBtnClick(this ,this._cardId)
  }


  _handleLikeBtn() {
    this._handleLikeCard(this, this._cardId, this._checkLike())
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