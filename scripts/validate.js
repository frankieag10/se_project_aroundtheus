/*import FormValidator from "../components/FormValidator.js";

export default class FormValidator {
  constructor(config) {
    this.config = config;
  }

  showInputError(formEl, inputEl) {
    const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(this.config.inputErrorClass);
    errorMessageEl.textContent = inputEl.validationMessage;
    errorMessageEl.classList.add(this.config.errorClass);
  }

  hideInputError(formEl, inputEl) {
    const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove(this.config.inputErrorClass);
    errorMessageEl.textContent = "";
    errorMessageEl.classList.remove(this.config.errorClass);
  }

  checkInputValidity(formEl, inputEl) {
    if (inputEl.validity.valid) {
      this.hideInputError(formEl, inputEl);
    } else {
      this.showInputError(formEl, inputEl);
    }
  }

  hasInvalidInput(inputList) {
    return !inputList.every((inputEl) => inputEl.validity.valid);
  }

  toggleButtonState(inputEls, submitButton) {
    const hasInvalidInputEls = this.hasInvalidInput(inputEls);
    submitButton.classList.toggle(
      this.config.inactiveButtonClass,
      hasInvalidInputEls
    );
    submitButton.disabled = hasInvalidInputEls;
  }

  setEventListeners(formEl) {
    const inputEls = [...formEl.querySelectorAll(this.config.inputSelector)];
    const submitButton = formEl.querySelector(this.config.submitButtonSelector);
    this.toggleButtonState(inputEls, submitButton);
    inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", (e) => {
        this.checkInputValidity(formEl, inputEl);
        this.toggleButtonState(inputEls, submitButton);
      });
    });
  }

  enableValidation() {
    const formEls = [...document.querySelectorAll(this.config.formSelector)];
    formEls.forEach((formEl) => {
      formEl.addEventListener("submit", (e) => {
        e.preventDefault();
      });

      this.setEventListeners(formEl);
    });
  }
}*/
