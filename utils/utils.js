import {
  wrappers,
  AllButtons,
  formData,
  validationSettings,
} from "../pages/index.js";

class Utils {
  constructor() {}

  // Close profile, new card, and image outside of modal function
  clickOffPopUp(modalElement) {
    modalElement.addEventListener("mousedown", (evt) => {
      if (evt.target === evt.currentTarget) {
        this.closeModal(modalElement);
      }
    });
  }

  // Close modal by clicking outside of new card image modal
  clickOffPopUp(imageModal) {
    this.clickOffPopUp(imageModal);
  }

  // Close modal by clicking outside of edit profile modal
  clickOffPopUp(editProfileModal) {
    this.clickOffPopUp(editProfileModal);
  }

  // Close modal by clicking outside of new modal form
  clickOffPopUp(addCardModal) {
    this.clickOffPopUp(addCardModal);
  }

  // Close profile, new card, and image modals with ESC KEY function
  handleEscKeyDown(evt) {
    if (evt.key === "Escape") {
      const openedModal = document.querySelector(".modal_opened");
      this.closeModal(openedModal);
    }
  }

  // Close modal function
  closeModal(modal) {
    modal.classList.remove("modal_opened");
    document.removeEventListener("keydown", this.handleEscKeyDown);
  }

  // Open modal function
  openModal(modal) {
    modal.classList.add("modal_opened");
    document.addEventListener("keydown", this.handleEscKeyDown);
  }

  // Open profile edit button
  openEditProfileModal() {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    this.openModal(editProfileModal);
  }

  //open card popup
  openCardPopup() {
    modalImageElement.src = data.link;
    modalImageElement.alt = data.name;
    popUpCaption.textContent = data.name;

    this.openModal(imageModal);
  }
  // Exported functions

  openPopup(modal) {
    this.openModal(modal);
  }

  closePopup(modal) {
    this.closeModal(modal);
  }
}

export default Utils;
