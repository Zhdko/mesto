import {FormValidator, config} from './formValidator.js';
import {Card} from './Card.js';
import {galleryList} from './CardsArray.js';

const content = document.querySelector('.content');

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

// full-image popup
const popups = document.querySelectorAll('.popup');

// open and close popup
export const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keyup', handlerKeyUp);

  editFormValidation.enableValidation();
  addFormValidation.enableValidation();
}
const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keyup', handlerKeyUp);
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
  const card = {
    title: inputImgtitle.value,
    link: inputImgLink.value,
  }

  renderCard(card);

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
});


const addFormValidation = new FormValidator(config, addForm);
const editFormValidation = new FormValidator(config, editForm);