import './index.css'
import {buttonEdit, formEdit, inputUsername, inputUserJob, gallery, buttonAdd, formAdd, config} from '../utils/constants.js'
import {FormValidator} from '../components/FormValidator.js';
import {galleryList} from '../utils/cardsArray.js';
import {Section} from '../components/Section.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { createCard } from '../utils/utils';

const cardFormValidation = new FormValidator(config, formAdd);
const profileFormValidation = new FormValidator(config, formEdit);

const cardsList = new Section({items: galleryList, renderer: cardData => {
  cardsList.addItem(createCard(cardData))
}}, '.gallery__list');

const user = new UserInfo({about: '.profile__userjob', username: '.profile__username'}); 
const popupEdit = new PopupWithForm({popupSelector: '.popup_action_edit-profile', inputSelector: '.popup__text',
  handleFormSubmit: (formData) => { 
    user.setUserInfo({formData}),
    popupEdit.close()
  }
});

const popupAdd = new PopupWithForm({popupSelector: '.popup_action_add-place', inputSelector: '.popup__text', 
  handleFormSubmit: (formData) => {
    cardsList.addItem(createCard(formData));
    popupAdd.close()
  }
})

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