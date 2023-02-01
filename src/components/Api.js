import { data } from "autoprefixer"

export class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl,
    this._headers = headers
  }

  _checkResponce(res) { 
    (res.ok) ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
}

  getInitialCards() {
    const cardsUrl = `${this._baseUrl}/cards`
    return fetch(cardsUrl, {
    headers: this._headers
    })
      .then((res) => (res.ok) ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
  }

  getUserData() {
    const userInfoUrl = `${this._baseUrl}/users/me`
    return fetch(userInfoUrl, {
      headers: {
        authorization: 'ff3362f2-f839-4db5-95dc-c0695413c82c',
        'Content-Type': 'application/json'
      }
    })
      .then((res) => (res.ok) ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
  }

  setUserInfo(userData) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: userData.username,
        about: userData.about
      })
    })
      .then((res) => (res.ok) ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
  }
  addNewCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
      .then((res) => (res.ok) ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then((res) => (res.ok) ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
  }

  _setLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers
    })
      .then((res) => (res.ok) ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
  }

  _deleteLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then((res) => (res.ok) ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
  }

  toggleLike(cardId, isLiked) {
    if(isLiked) {
      return this._deleteLike(cardId)
    } else {
      return this._setLike(cardId)
    }
  }

  editAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.link
      })
    })
      .then((res) => (res.ok) ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
  }
}

