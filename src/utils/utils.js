// Close profile, new card, and image modals with ESC KEY function
const handleEscKeyDown = (evt) => {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    closeModal(openedModal);
  }
};

// Close modal function
const closeModal = (modal) => {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscKeyDown);
};

// Open modal function
const openModal = (modal) => {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscKeyDown);
};

export { handleEscKeyDown, openModal, closeModal };
