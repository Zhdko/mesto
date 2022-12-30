export const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keyup', handleKeyUp);
}

const handleKeyUp = (evt) => {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}

export const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keyup', handleKeyUp);
}

export function openImagePopup({name, link}) {
  popupImage = document.querySelector('.popup_action_open-img');

  document.querySelector('.full-width__image').src = link;
  document.querySelector('.full-width__image').alt = name;
  document.querySelector('.full-width__caption').textContent = name;

  openPopup(popupImage);
}