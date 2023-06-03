import Popup from "./Popup.js";

export default class PopupwithForm extends Popup {
  constructor({ modalSelector, handleFormSubmit }) {
    super({ modalSelector });
    this._modalForm = this._modalElement.querySelector(".modal__form");
    this._inputList = this._modalElement.querySelectorAll(".modal__form-input");
    this._handleFormSubmit = handleFormSubmit;
  }

  close() {
    this._modalForm.reset();
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
    this._modalForm.addEventListener("submit", (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
      this._handleCardClick(cardData);
    });

    super.setEventListeners();
  }
}
