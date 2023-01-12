const fullWidthImg = document.querySelector('.full-width__image');

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

export const openImagePopup = ({name, link}) => {
  fullWidthImg.src = link;
  fullWidthImg.alt = name;
  document.querySelector('.full-width__caption').textContent = name;
}