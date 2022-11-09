let content = document.querySelector('.content');
let editButton = content.querySelector('.button-icon_action_edit');
let popup = content.querySelector('.popup');
let saveButton = popup.querySelector('.popup__submit-btn_place_edit-form');
let closeButton = popup.querySelector('.button-icon_action_close')

function openPopup() {
  popup.classList.toggle('popup_active')
}

editButton.addEventListener('click', openPopup)
closeButton.addEventListener('click', openPopup)

let inputUsername = popup.querySelector('.popup__text_type_username')
let inputUserjob = popup.querySelector('.popup__text_type_userjob')

let username = content.querySelector('.username')
let userjob = content.querySelector('.userjob')

inputUsername.value = username.textContent
inputUserjob.value = userjob.textContent

let editForm = popup.querySelector('.popup__container');
function formSubmitHandler (evt) {
    evt.preventDefault(); 
    username.textContent = inputUsername.value;
    userjob.textContent = inputUserjob.value;
    openPopup()
}
editForm.addEventListener('submit', formSubmitHandler); 