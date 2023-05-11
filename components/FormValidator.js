class FormValidator {
  constructor(settings, formEl) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass; // Corrected variable name

    this._form = formEl;
    this._inputEls = [...this._form.querySelectorAll(this._inputSelector)];
    this._submitButton = this._form.querySelector(this._submitButtonSelector);

    this._setEventListeners();
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

  _toggleButtonState() {
    const hasInvalidInputEls = this._hasInvalidInput();
    this._submitButton.classList.toggle(
      this._inactiveButtonClass,
      hasInvalidInputEls
    );
    this._submitButton.disabled = hasInvalidInputEls;
  }

  _hasInvalidInput() {
    return this._inputEls.some((inputEl) => !inputEl.validity.valid);
  }

  _checkInputValidity(inputEl) {
    // Corrected method declaration
    const errorMessageEl = this._form.querySelector(`#${inputEl.id}-error`);
    if (inputEl.validity.valid) {
      this._hideInputError(inputEl, errorMessageEl);
    } else {
      this._showInputError(inputEl, errorMessageEl);
    }
  }

  _setEventListeners() {
    // Corrected method declaration
    this._toggleButtonState();

    this._inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", () => {
        this._checkInputValidity(inputEl);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    // Corrected method declaration
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
    });
  }
}

export default FormValidator;
