import './index.css'
import { buttonEdit, formEdit, inputUsername, inputUserJob, buttonAdd, formAdd, config, username } from '../utils/constants.js'
import { galleryList } from '../utils/cardsArray.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { Card } from '../components/Card';

const cardFormValidation = new FormValidator(config, formAdd);
const profileFormValidation = new FormValidator(config, formEdit);


const openImage = (imageData) => {
  fullImg.open({name: imageData.title, link: imageData.link})
}

const createCard = (formData) => {
  const card = new Card({data: formData, handleCardClick: () => openImage(formData)}, username, '#gallery-item');
  const cardElement = card.generateCard();
  return cardElement
}

const fullImg = new PopupWithImage({popupSelector: '.popup_action_open-img'}, '.full-width__image', '.full-width__caption');

const user = new UserInfo({about: '.profile__userjob', username: '.profile__username'}); 

const cardsList = new Section({items: galleryList, renderer: cardData => {
  cardsList.addItem(createCard(cardData))
}}, '.gallery__list');

const popupEdit = new PopupWithForm({popupSelector: '.popup_action_edit-profile', inputSelector: '.popup__text',
  handleFormSubmit: (formData) => { 
    user.setUserInfo(formData),
    popupEdit.close()
  }
});

const popupAdd = new PopupWithForm({popupSelector: '.popup_action_add-place', inputSelector: '.popup__text', 
  handleFormSubmit: (formData) => {
    cardsList.addItem(createCard(formData));
    popupAdd.close()
  }
});

const handleAddButtonClick = () => {
  popupAdd.open()
  cardFormValidation.disableSubmitButton();
}

const handleEditButtonClick = () => {
  popupEdit.open()

  const info = user.getUserInfo()

  inputUsername.value = info.name
  inputUserJob.value = info.about
}

cardsList.renderItems()
profileFormValidation.enableValidation();
cardFormValidation.enableValidation();

buttonAdd.addEventListener('click', handleAddButtonClick);
buttonEdit.addEventListener('click', handleEditButtonClick);
popupEdit.setEventListeners();
popupAdd.setEventListeners();
fullImg.setEventListeners()