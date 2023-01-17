import {username} from '../constants.js';
import { Card } from '../components/Card';

export const createCard = (formData) => {
  const card = new Card({data: formData}, username, '#gallery-item');
  const cardElement = card.generateCard();

  return cardElement
}

export const openImage = () => {
    const fullImg = new PopupWithImage({popupSelector: this._popupImage})
    fullImg.open({name: this._title, link: this._imgLink})
}