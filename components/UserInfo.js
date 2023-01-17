

export class UserInfo {
  constructor({about, username}) {
    this._name = document.querySelector(username)
    this._about = document.querySelector(about)
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._about.textContent
    }
  }

  setUserInfo({name, about}) {
    this._name.textContent = name.value;
    this._about.textContent = about.value
  }
}