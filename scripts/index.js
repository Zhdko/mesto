const content = document.querySelector('.content')
const editButton = content.querySelector('.button-icon_action_edit');
const popup = document.querySelectorAll('.popup');
const saveButton = document.querySelector('.popup__submit-btn');
const closeButton = document.querySelectorAll('.button-icon_action_close');
const editForm = document.querySelector('.popup__container');
const inputUsername = document.querySelector('.popup__text_type_username');
const inputUserjob = document.querySelector('.popup__text_type_userjob');
const popupEdit = document.querySelector('.popup_action_edit-profile');
const popupAdd = document.querySelector('.popup_action_add-place');
const popupImage = document.querySelector('.popup_action_open-img')

const username = content.querySelector('.profile__username');
const userjob = content.querySelector('.profile__userjob');
const inputImgtitle = document.querySelector('.popup__text_type_place-title');
const inputImgLink = document.querySelector('.popup__text_type_photo-link');
const addButton = content.querySelector('.button-icon_action_add');
const gallery = content.querySelector('.gallery__list');
const galleryTemplate = document.querySelector('#gallery-item').content.querySelector('.card');
const addForm = document.querySelector('.add-form');

const galleryList = [
  {
    link: 'https://images.unsplash.com/photo-1538590888307-8417d434e15f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80',
    title: 'Хребет Ацунта',
  },
  {
    link: 'https://images.unsplash.com/photo-1629617708610-ea01331d53ac?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80',
    title: 'Троицкая церковь Гергети',
  },
  {
    link: 'https://images.unsplash.com/photo-1543076499-a6133cb932fd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80',
    title: 'Мартвили',
  },
  {
    link: 'https://images.unsplash.com/photo-1563284223-333497472e88?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=876&q=80',
    title: 'Казбеги',
  },
  {
    link: 'https://images.unsplash.com/photo-1621868811134-2548d9e7f147?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80',
    title: 'Тбилиси',
  },
  {
    link: 'https://images.unsplash.com/photo-1489362059928-00f6f10663bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1430&q=80',
    title: 'Гудуари',
  },
];


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

closeButton.forEach( function(element) {
  element.addEventListener('click', function () {
    popup.forEach(function(element){
      element.classList.remove('popup_opened');
    })
  });
});