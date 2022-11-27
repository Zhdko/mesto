const content = document.querySelector('.content')
const editButton = content.querySelector('.button-icon_action_edit');
const popups = document.querySelectorAll('.popup');
const closeButtons = document.querySelectorAll('.button-icon_action_close');
const editForm = document.querySelector('[name="edit-form"]');
const inputUsername = document.querySelector('[name="username"]');
const inputUserjob = document.querySelector('[name="job"]');
const popupEdit = document.querySelector('.popup_action_edit-profile');
const popupAdd = document.querySelector('.popup_action_add-place');
const popupImage = document.querySelector('.popup_action_open-img')

const username = content.querySelector('.profile__username');
const userjob = content.querySelector('.profile__userjob');
const inputImgtitle = document.querySelector('[name="place-title"]');
const inputImgLink = document.querySelector('[name="photo-link"]');
const addButton = content.querySelector('.button-icon_action_add');
const gallery = content.querySelector('.gallery__list');
const galleryTemplate = document.querySelector('#gallery-item').content.querySelector('.card');
const addForm = document.querySelector('[name="add-form"]');

const openPopupEdit = () => {
  popupEdit.classList.toggle('popup_opened');
  
  if (popupEdit.classList.contains('popup_opened')) {
  inputUsername.value = username.textContent;
  inputUserjob.value = userjob.textContent;
  }
}

const openPopupAdd = () => {
  popupAdd.classList.toggle('popup_opened');
}

const formSubmitHandlerEdit = (evt) => {
  evt.preventDefault(); 

  username.textContent = inputUsername.value;
  userjob.textContent = inputUserjob.value;

  openPopupEdit();
}

const createElement = (item) => {
  const galleryItem = galleryTemplate.cloneNode(true);
  const galleryItemTitle = galleryItem.querySelector('.card__title');
  const galleryItemImg = galleryItem.querySelector('.card__image');
  const likeButton = galleryItem.querySelector('.card__like');
  const deleteButton = galleryItem.querySelector('.card__delete');

  galleryItemImg.addEventListener('click', function() {
    const fullImage = document.querySelector('.full-width__image');
    const fullImageCaption = document.querySelector('.full-width__caption');

    popupImage.classList.toggle('popup_opened');

    fullImage.src = item.link;
    fullImage.alt = galleryItemImg.alt
    fullImageCaption.textContent = item.title;

    fullImage.addEventListener('click', function () {
      fullImage.closest('.popup').classList.remove('popup_opened');
    })
  });

  likeButton.addEventListener('click', handleLikeButton);
  deleteButton.addEventListener('click', handleDeleteButton);

  galleryItemImg.src = item.link;
  galleryItemImg.alt = `${item.title}. Автор: ${username.textContent}`
  galleryItemTitle.textContent = item.title;

  return galleryItem;
}

const handleLikeButton = (evt) => {
  evt.target.classList.toggle('card__like_active')
}

const handleDeleteButton = (evt) => {
  evt.target.closest('.card').remove()
}

const createItem = (item) => {
  const element = createElement(item);
  gallery.prepend(element);
}

const formSubmitHandlerAdd = (evt) => {
  evt.preventDefault(); 
  const galleryItem = {
    title: inputImgtitle.value,
    link: inputImgLink.value,
  }
  createItem(galleryItem);
  inputImgtitle.value = '';
  inputImgLink.value = '';
  openPopupAdd();
}

galleryList.forEach (function(item){
  createItem(item);
})

addButton.addEventListener('click', openPopupAdd);

editButton.addEventListener('click', openPopupEdit);

editForm.addEventListener('submit', formSubmitHandlerEdit); 

addForm.addEventListener('submit', formSubmitHandlerAdd);

closeButtons.forEach( function(element) {
  element.addEventListener('click', function () {
    popups.forEach(function(element){
      element.classList.remove('popup_opened');
    })
  });
});