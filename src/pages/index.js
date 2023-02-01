import './index.css'
import { avatar, buttonEdit, formEdit, inputUsername, inputUserJob, buttonAdd, formAdd, config, username, userAbout, btnEditAvatar, formEditAvatar, } from '../utils/constants.js'
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { Card } from '../components/Card';
import { Api } from '../components/Api';
import { PopupWithConfirmation } from '../components/PopupWithConfirmation';

const cardFormValidation = new FormValidator(config, formAdd);
const profileFormValidation = new FormValidator(config, formEdit);
const editAvatarFormValidation = new FormValidator(config, formEditAvatar)

const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/cohort-59',
  headers: {
    authorization: 'ff3362f2-f839-4db5-95dc-c0695413c82c',
    'Content-Type': 'application/json'
  }
})

const cardsArray = {}

// Загрузка данных о пользователе 
api.getUserData()
  .then((userData) => {
    username.textContent = userData.name;
    userAbout.textContent = userData.about;
    avatar.src = userData.avatar
    user.getUserId(userData)
  });

api.getInitialCards()
  .then(res => section.renderItems(res))

const openImage = (imageData) => {
  fullImg.open({name: imageData.name, link: imageData.link})
}

const popupDel = new PopupWithConfirmation({popupSelector: '.popup_action_delete-card'},(cardId) => {
  api.deleteCard(cardId)
   .then(() => {
    popupDel.close()
    cardsArray[cardId].deleteCard()
   })
})

const handleDeleteBtnClick = (cardId) => {
  popupDel.setTarget(cardId)
  console.log(cardId)
  popupDel.open()
}



const handleLikeCard = (cardId, isLiked, count) => {
  api.toggleLike(cardId, isLiked)
    .then(res => {
      count.textContent = res.likes.length
    })
}

const createCard = (formData) => {
  const card = new Card({data: formData, handleCardClick: () => openImage(formData)}, username, '#gallery-item', handleDeleteBtnClick, user.id, handleLikeCard)
  const cardElement = card.generateCard();
  cardsArray[formData._id] = card
  return cardElement
}

const fullImg = new PopupWithImage({popupSelector: '.popup_action_open-img'}, '.full-width__image', '.full-width__caption');

const user = new UserInfo({about: '.profile__userjob', username: '.profile__username', avatar: '.profile__img'}); 

const section = new Section(cardData => createCard(cardData), '.gallery__list');

const popupEdit = new PopupWithForm({popupSelector: '.popup_action_edit-profile', inputSelector: '.popup__text',
  handleFormSubmit: (formData) => { 
    api.setUserInfo(formData)
      .then(res => {
        user.setUserInfo(res)
      })
    popupEdit.close()
  }
});

const popupEditAvatar = new PopupWithForm({popupSelector: '.popup_action_edit-avatar', inputSelector: '.popup__text',
  handleFormSubmit: (formData) => {
    console.log(formData)
    api.editAvatar(formData)
      .then((res) => user.setAvatar(res))
    popupEditAvatar.close()
  }})

const popupAdd = new PopupWithForm({popupSelector: '.popup_action_add-place', inputSelector: '.popup__text', 
  handleFormSubmit: (formData) => {
    api.addNewCard(formData)
      .then(res => {
        section.addItem(createCard(res))})
    popupAdd.close()
  }
});

const handleEditAvatarBtnClick = () => {
  popupEditAvatar.open()
}

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


profileFormValidation.enableValidation();
cardFormValidation.enableValidation();
editAvatarFormValidation.enableValidation()


buttonAdd.addEventListener('click', handleAddButtonClick);
buttonEdit.addEventListener('click', handleEditButtonClick);
btnEditAvatar.addEventListener('click', handleEditAvatarBtnClick);
popupEdit.setEventListeners();
popupAdd.setEventListeners();
popupEditAvatar.setEventListeners()
fullImg.setEventListeners();
popupDel.setEventListeners()