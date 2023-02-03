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

const fullImg = new PopupWithImage({popupSelector: '.popup_action_open-img'}, '.full-width__image', '.full-width__caption');

const user = new UserInfo({about: '.profile__userjob', username: '.profile__username', avatar: '.profile__img'}); 

const section = new Section(cardData => createCard(cardData), '.gallery__list');

Promise.all([api.getUserData(), api.getInitialCards()])
  .then((res) => {
    username.textContent = res[0].name;
    userAbout.textContent = res[0].about;
    avatar.src = res[0].avatar
    user.getUserId(res[0])
    return res[1]
  })
  .then(res => section.renderItems(res))
  .catch((err) => console.log(err))

const openImage = (imageData) => {
  fullImg.open({name: imageData.name, link: imageData.link})
}

const createCard = (formData) => {
  const card = new Card({data: formData, handleCardClick: () => openImage(formData)}, username, '#gallery-item', handleDeleteBtnClick, user.id, handleLikeCard)
  const cardElement = card.generateCard();
  return cardElement
}

// Попапы
const popupDel = new PopupWithConfirmation({popupSelector: '.popup_action_delete-card'},(card, cardId) => {
  popupDel.disableSubmitBtn('В мусор...')
  api.deleteCard(cardId)
   .then(() => {
    card.deleteCard()
    popupDel.close()
   })
   .catch((err) => popupDel.renderError(err))
   .finally(() => popupDel.unDisableSubmitBtn())
})

const popupEdit = new PopupWithForm({popupSelector: '.popup_action_edit-profile', inputSelector: '.popup__text',
  handleFormSubmit: (formData) => { 
    popupEdit.disableSubmitBtn('Сохранение...')
    api.setUserInfo(formData)
      .then(res => {
        user.setUserInfo(res)
        popupEdit.close()
      })
      .catch((err) => popupEdit.renderError(err))
      .finally(() => popupEdit.unDisableSubmitBtn())
  }
});

const popupEditAvatar = new PopupWithForm({popupSelector: '.popup_action_edit-avatar', inputSelector: '.popup__text',
  handleFormSubmit: (formData) => {
    popupEditAvatar.disableSubmitBtn('Сохранение...')
    api.editAvatar(formData)
      .then((res) => {
        user.setAvatar(res)
        popupEditAvatar.close()
      })
      .catch((err) => popupEditAvatar.renderError(err))
      .finally(() => popupEditAvatar.unDisableSubmitBtn())
  }
});

const popupAdd = new PopupWithForm({popupSelector: '.popup_action_add-place', inputSelector: '.popup__text', 
  handleFormSubmit: (formData) => {
    popupAdd.disableSubmitBtn('Создаем...')
    api.addNewCard(formData)
      .then(res => {
        section.addItem(createCard(res))
        popupAdd.close()
      })
      .catch((err) => popupAdd.renderError(err))
      .finally(() => popupAdd.unDisableSubmitBtn()) 
  }
});

//Обработчики
const handleDeleteBtnClick = (card ,cardId) => {
  popupDel.setTarget(card, cardId)
  popupDel.open()
}

const handleLikeCard = (card ,cardId, isLiked) => {
  api.toggleLike(cardId, isLiked)
    .then(res =>  card.setLike(res))
    .catch((err) => console.log(err))
}

const handleEditAvatarBtnClick = () => {
  popupEditAvatar.open()
  editAvatarFormValidation.disableSubmitButton();

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

// Слушатели
buttonAdd.addEventListener('click', handleAddButtonClick);
buttonEdit.addEventListener('click', handleEditButtonClick);
btnEditAvatar.addEventListener('click', handleEditAvatarBtnClick);
popupEdit.setEventListeners();
popupAdd.setEventListeners();
popupEditAvatar.setEventListeners()
fullImg.setEventListeners();
popupDel.setEventListeners()