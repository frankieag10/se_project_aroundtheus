import {
  openModal,
  closeModal,
  renderCard,
  initialCards,
} from "../pages/index.js";

class utils {
  constructor() {
    // Selecting DOM elements
    this.nameInput = document.querySelector("#name-input");
    this.jobInput = document.querySelector("#job-input");
    this.profileTitle = document.querySelector(".profile__title");
    this.profileDescription = document.querySelector(".profile__description");
    this.editProfileModal = document.querySelector("#edit-profile-modal");
    this.profileEditButton = document.querySelector(".profile__edit-button");
    this.profileModalCloseButton = document.querySelector(
      ".profile-modal__close-button"
    );
    this.addCardModal = document.querySelector("#add-card-modal");
    this.addNewCardButton = document.querySelector(".add-new-card-button");
    this.addCardModalCloseButton = document.querySelector(
      ".add-card-modal__close-button"
    );
    this.modalImagePopUp = document.querySelector("#modal-image-popup");
    this.modalCloseImageButton = document.querySelector(
      ".modal__close-image-button"
    );
    this.cardsWrap = document.querySelector(".cards__wrap");
    this._initialCards = initialCards;

    this.openEditProfileModal = this.openEditProfileModal.bind(this);
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
    CardButtons.forEach((cardData) => renderCard(cardData, this.cardsWrap));
  }
}

// Export the class instance
export default new utils();
