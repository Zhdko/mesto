const content = document.querySelector('.content')

const closeButtons = document.querySelectorAll('.button-icon_action_close');

//edit profile info form
const editButton = content.querySelector('.button-icon_action_edit');
const username = content.querySelector('.profile__username');
const userjob = content.querySelector('.profile__userjob');
const popupEdit = document.querySelector('.popup_action_edit-profile');
const editForm = document.forms.edit;
const inputUsername = editForm.elements.username
const inputUserjob = editForm.elements.job

// add card form
const addButton = content.querySelector('.button-icon_action_add');
const popupAdd = document.querySelector('.popup_action_add-place');
const addForm = document.forms.add
const inputImgtitle = addForm.elements.title
const inputImgLink = addForm.elements.link
const gallery = content.querySelector('.gallery__list');
const galleryTemplate = document.querySelector('#gallery-item').content.querySelector('.card');

// full-image popup
const popupImage = document.querySelector('.popup_action_open-img');
const fullImage = document.querySelector('.full-width__image');
const fullImageCaption = document.querySelector('.full-width__caption');
const popups = document.querySelectorAll('.popup');

// open and close popup
const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keyup', handlerKeyUp);
}

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keyup', handlerKeyUp);
}


class Card {
  constructor(data, templateSelector) {
    this._title = data.title;
    this._imgLink = data.link;
    this._templateSelector = templateSelector;
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
    openPopup(popupImage);

    fullImage.src = this._imgLink;
    fullImage.alt = `${this._title}. Автор: ${username.textContent}`
    fullImageCaption.textContent = this._title;
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

const renderCard = (item) => {
  const card = new Card(item, '#gallery-item');
  const cardElement = card.generateCard();
  document.querySelector('.gallery__list').prepend(cardElement);
}

galleryList.forEach((item) => {
  renderCard(item)
});

const handleFormEditSubmit = () => {
  username.textContent = inputUsername.value;
  userjob.textContent = inputUserjob.value;

  closePopup(popupEdit);
}

const handleFormAddSubmit = () => {
  const galleryItem = {
    title: inputImgtitle.value,
    link: inputImgLink.value,
  }

  renderCard(galleryItem);

  addForm.reset();
  closePopup(popupAdd);
}

const handlerKeyUp = (evt) => {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}


// listeners
addButton.addEventListener('click', () => {
  openPopup(popupAdd);
  addForm.reset();

  const button = popupAdd.querySelector('.popup__submit-btn');
  button.classList.add('popup__submit-btn_invalid');
  button.disabled = 'disabled'
});

editButton.addEventListener('click', () => {
  openPopup(popupEdit);
  
  inputUsername.value = username.textContent;
  inputUserjob.value = userjob.textContent;
});

editForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  handleFormEditSubmit();
}); 

addForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  handleFormAddSubmit();
});

closeButtons.forEach((item) => {
  const close = item.closest('.popup');
  item.addEventListener('click', () => {
    closePopup(close)
  })
});

popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target === popup) {
      closePopup(popup);
    }
  })
})