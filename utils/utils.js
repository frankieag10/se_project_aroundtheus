import {
  openModal,
  closeModal,
  renderCard,
  initialCards,
} from "../pages/index.js";

class utils {
  constructor() {
    // Selecting DOM elements
    this._nameInput = document.querySelector("#name-input");
    this._jobInput = document.querySelector("#job-input");
    this._profileTitle = document.querySelector(".profile__title");
    this._profileDescription = document.querySelector(".profile__description");
    this._editProfileModal = document.querySelector("#edit-profile-modal");
    this._profileEditButton = document.querySelector(".profile__edit-button");
    this._profileModalCloseButton = document.querySelector(
      ".profile-modal__close-button"
    );
    this._addCardModal = document.querySelector("#add-card-modal");

    this._addNewCardButton = document.querySelector(".add-new-card-button");
    this._addCardModalCloseButton = document.querySelector(
      ".add-card-modal__close-button"
    );
    this._modalImagePopUp = document.querySelector("#modal-image-popup");
    this._modalCloseImageButton = document.querySelector(
      ".modal__close-image-button"
    );
    this._cardsWrap = document.querySelector(".cards__wrap");
    this._initialCards = initialCards;

    this.openEditProfileModal = this.openEditProfileModal.bind(this);
    this.closeModal = closeModal;
    this._openModal = openModal;
  }

  // Open profile edit button
  openEditProfileModal() {
    this.nameInput.value = this.profileTitle.textContent;
    this.jobInput.value = this.profileDescription.textContent;
    openModal(this.editProfileModal);
  }

  CardButtons() {
    // Event listeners
    this.profileEditButton.addEventListener("click", this.openEditProfileModal);
    this.profileModalCloseButton.addEventListener("click", () =>
      closeModal(this.editProfileModal)
    );
    this.addCardModalCloseButton.addEventListener("click", () =>
      closeModal(this.addCardModal)
    );
    this.addNewCardButton.addEventListener("click", () =>
      openModal(this.addCardModal)
    );
    this.modalCloseImageButton.addEventListener("click", () =>
      closeModal(this.modalImagePopUp)
    );

    // Render initial cards
    this._initialCards.forEach((cardData) =>
      renderCard(cardData, this.cardsWrap)
    );
  }
}
export default new utils();
