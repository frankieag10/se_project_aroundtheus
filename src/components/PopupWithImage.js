import Popup from "./Popup.js.js";
export default class PopupWithImage extends Popup {
  constructor({ modalSelector }) {
    super({ modalSelector });
  }
  open({ link, name }) {
    this._popupElement.querySelector(".modal__caption").textContent = name;
    const image = this._popupElement.querySelector("#popup__image");
    image.src = link;
    image.alt = name;
    super.open();
  }
}
