import {FormValidator, config} from './formValidator.js';
import {Card} from './Card.js';
import {galleryList} from './CardsArray.js';
import {openPopup, closePopup, openImagePopup} from './utils.js';

const content = document.querySelector('.content');

const buttonsCloseList = document.querySelectorAll('.button-icon_action_close');

//edit profile info form
const buttonEdit = content.querySelector('.button-icon_action_edit');
export const username = content.querySelector('.profile__username');
const userJob = content.querySelector('.profile__userjob');
const popupEdit = document.querySelector('.popup_action_edit-profile');
const formEdit = document.forms.edit;
const inputUsername = formEdit.elements.username
const inputUserJob = formEdit.elements.job

// add card form
const buttonAdd = content.querySelector('.button-icon_action_add');
const popupAdd = document.querySelector('.popup_action_add-place');
const formAdd = document.forms.add
const inputImgTitle = formAdd.elements.title
const inputImgLink = formAdd.elements.link
const gallery = document.querySelector('.gallery__list')


const popups = document.querySelectorAll('.popup');

// form validator
const cardFormValidation = new FormValidator(config, formAdd);
const profileFormValidation = new FormValidator(config, formEdit);



const createCard = (cardData) => {
  const card = new Card(cardData, '#gallery-item', openPopup, openImagePopup);
  const cardElement = card.generateCard();
  return cardElement
}

galleryList.forEach((cardData) => {
  gallery.prepend(createCard(cardData))
});

const handleFormEditSubmit = () => {
  username.textContent = inputUsername.value;
  userJob.textContent = inputUserJob.value;

  closePopup(popupEdit);
}

const handleFormAddSubmit = () => {
  const card = {
    title: inputImgTitle.value,
    link: inputImgLink.value,
  }

  gallery.prepend(createCard(card));

  formAdd.reset();
  closePopup(popupAdd);
}

const handleAddButtonClick = () => {
  openPopup(popupAdd);
  formAdd.reset();
  cardFormValidation.disableSubmitButton();
}

const handleEditButtonClick = () => {
  openPopup(popupEdit);
  inputUsername.value = username.textContent;
  inputUserJob.value = userJob.textContent;
}


// listeners
buttonAdd.addEventListener('click', handleAddButtonClick);

buttonEdit.addEventListener('click', handleEditButtonClick);

formEdit.addEventListener('submit', (evt) => {
  evt.preventDefault();

  handleFormEditSubmit();
}); 

formAdd.addEventListener('submit', (evt) => {
  evt.preventDefault();

  handleFormAddSubmit();
});

buttonsCloseList.forEach((item) => {
  const popup = item.closest('.popup');
  item.addEventListener('click', () => {
    closePopup(popup)
  })
});

popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target === popup) {
      closePopup(popup);
    }
  })
});


profileFormValidation.enableValidation();
cardFormValidation.enableValidation();
