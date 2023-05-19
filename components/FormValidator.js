import {
  validationSettings,
  Modals,
  AllButtons,
  formData,
} from "../pages/index.js";

export default class FormValidator {
  constructor(settings, formEl) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;

    this._form = formEl;
    this._inputEls = [...this._form.querySelectorAll(this._inputSelector)];
    this._submitButton = this._form.querySelector(this._submitButtonSelector);

    //this.enableValidation();
    this._toggleButtonState();
  }

  _showInputError(inputEl, errorMessageEl) {
    inputEl.classList.add(this._inputErrorClass);
    errorMessageEl.textContent = inputEl.validationMessage;
    errorMessageEl.classList.add(this._errorClass);
  }

  _hideInputError(inputEl, errorMessageEl) {
    inputEl.classList.remove(this._inputErrorClass);
    errorMessageEl.textContent = "";
    errorMessageEl.classList.remove(this._errorClass);
  }

  _hasInvalidInputs() {
    return this._inputEls.some((inputEl) => !inputEl.validity.valid);
  }

  _hasEmptyInputs() {
    return this._inputEls.some((inputEl) => inputEl.value.trim() === "");
  }

  _checkInputValidity(inputEl) {
    const errorMessageEl = this._form.querySelector(`#${inputEl.id}-error`);
    if (inputEl.validity.valid) {
      this._hideInputError(inputEl, errorMessageEl);
    } else {
      this._showInputError(inputEl, errorMessageEl);
    }
  }

  _setEventListeners() {
    this._inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", () => {
        this._checkInputValidity(inputEl);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    this._setEventListeners();
  }

  resetValidation() {
    this._inputEls.forEach((inputEl) => {
      const errorMessageEl = this._form.querySelector(`#${inputEl.id}-error`);
      this._hideInputError(inputEl, errorMessageEl);
    });
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.disabled = true;
  }

  _toggleButtonState() {
    const isFormValid = !this._hasInvalidInputs() && !this._hasEmptyInputs();
    this._submitButton.disabled = !isFormValid;
    this._submitButton.classList.toggle(
      this._inactiveButtonClass,
      !isFormValid
    );
  }
}
