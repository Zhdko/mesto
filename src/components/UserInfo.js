

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

  setUserInfo({username, about}) {
    this._name.textContent = username;
    this._about.textContent = about
  }
}