//import { modalWithImage } from "../pages/index.js";
import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  constructor({ modalSelector }) {
    super({ modalSelector });
  }
  open({ link, name }) {
    this._modalElement.querySelector(".modal__caption").textContent = name;
    const image = this._modalElement.querySelector("#popup__image");
    image.src = link;
    image.alt = name;
    super.open();
  }
}
