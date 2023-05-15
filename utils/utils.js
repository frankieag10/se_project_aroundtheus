import {
  wrappers,
  AllButtons,
  formData,
  validationSettings,
} from "../pages/index.js";

// Close profile, new card, and image modals with ESC KEY function
const handleEscKeyDown = (evt) => {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    this.closeModal(openedModal);
  }
};

// Close modal function
const closeModal = (modal) => {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", this.handleEscKeyDown);
};

// Open modal function
const openModal = (modal) => {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", this.handleEscKeyDown);
};

export { handleEscKeyDown, openModal, closeModal };
