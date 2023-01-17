import {username} from './constants.js';
import { Card } from '../components/Card';
import { PopupWithImage } from '../components/PopupWithImage.js';

export const createCard = (formData) => {
  const card = new Card({data: formData, handleCardClick: () =>{
    const fullImg = new PopupWithImage({popupSelector: '.popup_action_open-img'}, '.full-width__image', '.full-width__caption')
    fullImg.open({name: formData.title, link: formData.link})
  }}, username, '#gallery-item');
  const cardElement = card.generateCard();

  return cardElement
}