import '../page/index.css'
import {buttonEdit, formEdit, inputUsername, inputUserJob, gallery, buttonAdd, formAdd} from '../constants.js'
import {FormValidator, config} from '../components/FormValidator.js';
import {galleryList} from '../scripts/cardsArray.js';
import {Section} from '../components/Section.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { createCard } from '../utils.js/utils';

const cardFormValidation = new FormValidator(config, formAdd);
const profileFormValidation = new FormValidator(config, formEdit);

const cardsList = new Section({items: galleryList, renderer: cardData => {
  cardsList.addItem(createCard(cardData))
}}, '.gallery__list');

const user = new UserInfo({about: '.profile__userjob', username: '.profile__username'}); 
const popupEdit = new PopupWithForm({popupSelector: '.popup_action_edit-profile',
  handleFormSubmit: (formData) => { 
  }
});

const popupAdd = new PopupWithForm({popupSelector: '.popup_action_add-place', 
  handleFormSubmit: (formData) => {
    gallery.prepend(createCard(formData));
    popupAdd.close()
  }
})

const handleAddButtonClick = () => {
  popupAdd.open()
  cardFormValidation.disableSubmitButton();
}

const handleFormEditSubmit = () => {
  user.setUserInfo({name: inputUsername, about: inputUserJob})

  popupEdit.close()
}

const handleEditButtonClick = () => {
  popupEdit.open()

  const info = user.getUserInfo()
  
  inputUsername.value = info.name
  inputUserJob.value = info.about
}


// listeners
buttonAdd.addEventListener('click', handleAddButtonClick);

buttonEdit.addEventListener('click', handleEditButtonClick);

formEdit.addEventListener('submit', (evt) => {
  evt.preventDefault();

  handleFormEditSubmit();
}); 

profileFormValidation.enableValidation();
cardFormValidation.enableValidation();

cardsList.renderItems()