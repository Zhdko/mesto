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
const popupImage = document.querySelector('.popup_action_open-img')
const fullImage = document.querySelector('.full-width__image');
const fullImageCaption = document.querySelector('.full-width__caption');
const popups = document.querySelectorAll('.popup')


// open and close popup
const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keyup', handlerKeyUp);
}

const closePopup = (popup, form, input, config) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keyup', handlerKeyUp);
}


// create new card
const createElement = (item) => {
  const galleryItem = galleryTemplate.cloneNode(true);
  const galleryItemTitle = galleryItem.querySelector('.card__title');
  const galleryItemImg = galleryItem.querySelector('.card__image');
  const likeButton = galleryItem.querySelector('.card__like');
  const deleteButton = galleryItem.querySelector('.card__delete');

  galleryItemImg.addEventListener('click', function() {
    openPopup(popupImage)

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

const renderItem = (item) => {
  const element = createElement(item);
  gallery.prepend(element);
}

const formSubmitHandlerEdit = () => {
  username.textContent = inputUsername.value;
  userjob.textContent = inputUserjob.value;

  closePopup(popupEdit);
}

const formSubmitHandlerAdd = () => {
  const galleryItem = {
    title: inputImgtitle.value,
    link: inputImgLink.value,
  }

  renderItem(galleryItem);

  addForm.reset();
  closePopup(popupAdd);
}

const handlerKeyUp = (evt) => {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}

// likes
const handleLikeButton = (evt) => {
  evt.target.classList.toggle('card__like_active')
}


// delete card
const handleDeleteButton = (evt) => {
  evt.target.closest('.card').remove()
}

galleryList.forEach(renderItem)


// listeners
addButton.addEventListener('click', () => openPopup(popupAdd));

editButton.addEventListener('click', () => {
  openPopup(popupEdit);
  
  inputUsername.value = username.textContent;
  inputUserjob.value = userjob.textContent;
});

editForm.addEventListener('submit', formSubmitHandlerEdit); 

addForm.addEventListener('submit', formSubmitHandlerAdd);

closeButtons.forEach((item) => {
  const close = item.closest('.popup');
  const form = close.querySelector('.form')
  item.addEventListener('click', () => {
    closePopup(close)
    form.reset()
  })
})

fullImage.addEventListener('click', () => closePopup(popupImage));

popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    const popup = evt.target;
    closePopup(popup);
  })
})