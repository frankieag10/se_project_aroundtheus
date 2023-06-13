export default class UserInfo {
  constructor({ userNameSelector, userDescriptionSelector, avatarSelector }) {
    this._userNameElement = document.querySelector(userNameSelector);
    this._userDescriptionElement = document.querySelector(userDescriptionSelector);
    this._profileAvatarElement = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      userName: this._userNameElement.textContent,
      userDescription: this._userDescriptionElement.textContent,
    };
  }

  setUserInfo({ title, description }) {
    this._userNameElement.textContent = title;
    this._userDescriptionElement.textContent = description;
    this._setAvatarInfo(this._avatar);
  }

  setAvatarInfo(avatar) {
    this._setAvatarInfo(avatar);
  }

  _setAvatarInfo(avatar) {
    this._profileAvatarElement.src = avatar;
  }
}
