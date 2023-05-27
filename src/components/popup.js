import { profileFormElement } from "../utils/constants";

export default class Popup {
  constructor({ modalSelector }) {
    this._modalElement = document.querySelector(profileFormElement);
    this._handleEscKey = this._handleEscKey.bind(this);
  }

  //open popup(modal)
  open() {
    this._modalElement.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscKey);
  }

  //close popup(modal)
  close() {
    this._modalElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscKey);
  }

  //ESC KEY listener
  _handleEscKey(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    const modalCloseButton = this._modalElement.querySelector("#modal-close-image-button");
    modalCloseButton.addEventListener("click", () => this.close());
    this._modalElement.addEventListener("click", (event) => {
      if (event.target === this._modalElement) {
        this.close();
      }
    });
  }
}
