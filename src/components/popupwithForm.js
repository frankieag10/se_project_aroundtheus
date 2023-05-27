import { profileFormElement } from "../utils/constants.js";
import Popup from "./popup.js";

export default class PopupwithForm extends Popup {
  constructor({ modalSelector, handleFormSubmit }) {
    super({ modalSelector });
    this._popupForm = this.modalElement.querySelector(".modal__form");
    this._inputList = this._modalElement.querySelectorAll(".modal__form-input");
    this.handleFormSubmit = handleFormSubmit;
  }

  close() {
    this._popupForm.reset();
    super.close();
  }
  _getInputValues() {
    this._newData = {};
    this._inputList.forEach((inputElement) => {
      this._newData[inputElement.name] = inputElement.value;
    });
    return this._newData;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });

    super.setEventListeners();
  }
}
