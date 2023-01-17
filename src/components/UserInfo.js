

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

  setUserInfo({formData}) {
    this._name.textContent = formData.username;
    this._about.textContent = formData.about
  }
}