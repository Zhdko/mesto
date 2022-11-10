let content = document.querySelector('.content')
let editButton = content.querySelector('.button-icon_action_edit');
let popup = document.querySelector('.popup');
let saveButton = popup.querySelector('.popup__submit-btn');
let closeButton = popup.querySelector('.button-icon_action_close');
let editForm = popup.querySelector('.popup__container');
let inputUsername = popup.querySelector('.popup__text_type_username');
let inputUserjob = popup.querySelector('.popup__text_type_userjob');

let username = content.querySelector('.profile__username');
let userjob = content.querySelector('.profile__userjob');




function togglePopup() {
  popup.classList.toggle('popup_opened');
  if (popup.classList.contains('popup_opened')) {
  inputUsername.value = username.textContent;
  inputUserjob.value = userjob.textContent;
  }
}

function formSubmitHandler (evt) {
  evt.preventDefault(); 
  username.textContent = inputUsername.value;
  userjob.textContent = inputUserjob.value;
  togglePopup();
}


editButton.addEventListener('click', togglePopup);
closeButton.addEventListener('click', togglePopup);
editForm.addEventListener('submit', formSubmitHandler); 
