import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ modalSelector, handleFormSubmit, loadingText }) {
    super({ modalSelector });
    this._modalForm = this._modalElement.querySelector(".modal__form");
    this._inputList = this._modalElement.querySelectorAll(".modal__form-input");
    this._submitButton = this._modalForm.querySelector(".modal__save-button");
    this._submitButtonText = this._submitButton.textContent;
    this._loadingText = loadingText;
    this._handleFormSubmit = handleFormSubmit;
  }

  close() {
    this._modalForm.reset();
    super.close();
  }
  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach((inputElement) => {
      inputValues[inputElement.name] = inputElement.value;
    });
    return inputValues;
  }
  setSubmitAction(action) {
    this._handleFormSubmit = action;
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      if (data.hasOwnProperty(input.name)) {
        input.value = data[input.name];
      }
    });
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = this._loadingText;
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._modalForm.addEventListener("submit", (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }
}
