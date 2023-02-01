

export class UserInfo {
  constructor({about, username, avatar}) {
    this._name = document.querySelector(username)
    this._about = document.querySelector(about)
    this._avatar = document.querySelector(avatar)
  }

  getUserId({cohort, _id}) {
    this._cohort = cohort;
    this.id = _id;
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._about.textContent
    }
  }

  setAvatar({avatar}) {
    this._avatar.src = avatar
  }

  setUserInfo({name, about}) {
    this._name.textContent = name;
    this._about.textContent = about
  }
}