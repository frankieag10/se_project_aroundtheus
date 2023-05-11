import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import { openModal, closeModal } from "../utils.js";
import utils from "../utils.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Moutains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

/*______________WRAPPERS______________________*/
const cardsWrap = document.querySelector(".cards__list");
const editProfileModal = document.querySelector("#edit-modal");
const addCardModal = document.querySelector("#add-card-modal");
const profileFormElement = editProfileModal.querySelector(".modal__form");
const addCardFormElement = addCardModal.querySelector(".modal__form");
const imageModal = document.querySelector("#modal-image-popup");
const modalImageElement = imageModal.querySelector("#popup__image");
const popUpCaption = document.querySelector("#popup-caption");
const modalImagePopUp = document.querySelector("#modal-image-popup");
const modalCloseImageButton = document.querySelector(
  "#modal-close-image-button"
);

/*______________________BUTTONS AND OTHER DOM NODES_______________________ */
const profileEditButton = document.querySelector(".profile__edit-button");
const profileModalCloseButton = editProfileModal.querySelector(
  ".modal__close-button"
);
const addCardModalCloseButton = addCardModal.querySelector(
  ".modal__close-button"
);

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const addNewCardButton = document.querySelector(".profile__add-button");
const modalSaveButton = document.querySelector(".modal__save-button");

/*_______FORM DATA________*/
const nameInput = profileFormElement.querySelector(
  ".modal__form-input_type_name"
);
const jobInput = profileFormElement.querySelector(
  ".modal__form-input_type_description"
);

const cardTitleInput = addCardFormElement.querySelector(
  ".modal__form-input_type_title"
);
const cardUrlInput = addCardFormElement.querySelector(
  ".modal__form-input_type_url"
);

/*_________________________FUNCTIONS__________________________*/

//close modal function//
/*function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscKeyDown);
}
//open modal function//
function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscKeyDown);
}
// render cards//
function renderCard(cardData) {
  const cardElement = getCardElement(cardData);
  cardsWrap.prepend(cardElement);
}

function handleProfileFormSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(editProfileModal);
}

function handleAddCardFormSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardsWrap);
  closeModal(addCardModal);
  e.target.reset();
  const inputEls = [
    ...addCardFormElement.querySelectorAll(config.inputSelector),
  ];
  const submitButton = addCardFormElement.querySelector(
    config.submitButtonSelector
  );

  submitButton.classList.add(config.inactiveButtonClass);
  submitButton.disabled = true;

  toggleButtonState(inputEls, submitButton, config);
  e.target.reset();
}

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const cardButtonDelete = cardElement.querySelector(".card__button-delete");

  //deleteCard//
  cardButtonDelete.addEventListener("click", () => {
    cardElement.remove();
  });

  //open card popup//
  cardImage.addEventListener("click", () => {
    modalImageElement.src = data.link;
    modalImageElement.alt = data.name;
    popUpCaption.textContent = data.name;

    openModal(imageModal);
  });

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  return cardElement;
}

//close profile,newcard,and image oustside of modal function//
const clickOffPopUp = (modalElement) => {
  modalElement.addEventListener("mousedown", function (evt) {
    if (evt.target === evt.currentTarget) {
      closeModal(modalElement);
    }
  });
};

//close modal by clicking outside of new card image modal//
clickOffPopUp(imageModal);

//close modal by clicking outside of edit profile modal//
clickOffPopUp(editProfileModal);

//close modal by clicking outside of new modal form//
clickOffPopUp(addCardModal);

//close profile,newcard, and image modals with ESC KEY function//
const handleEscKeyDown = (evt) => {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    closeModal(openedModal);
  }
};
/* ____________________EVENT LISTENERS__________________*/

profileFormElement.addEventListener("submit", handleProfileFormSubmit);
addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);

//open profile edit button//
function openEditProfileModal() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(editProfileModal);
}

profileEditButton.addEventListener("click", openEditProfileModal);

//close profile edit button//
profileModalCloseButton.addEventListener("click", () =>
  closeModal(editProfileModal)
);

//close newcard popup//
addCardModalCloseButton.addEventListener("click", () =>
  closeModal(addCardModal)
);

//open new card button//
addNewCardButton.addEventListener("click", () => openModal(addCardModal));

//close image modal "X button"//
modalCloseImageButton.addEventListener("click", () =>
  closeModal(modalImagePopUp)
);

//close new cardpop up outside image//

initialCards.forEach((cardData) => renderCard(cardData, cardsWrap));

//VALIDATION//
const validationSettings = {
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__save-button",
  inactiveButtonClass: "modal__save-button_inactive",
  inputErrorClass: "modal__form-input_type_error",
  errorClass: "modal__error-message_visible",
};
