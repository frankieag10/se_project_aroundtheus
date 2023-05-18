import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import { handleEscKeyDown, openModal, closeModal } from "../utils/utils.js";

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

export const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

//////////////////
////MODALS////____
//////////////////

const cardsWrap = document.querySelector(".cards__list");
const editProfileModal = document.querySelector("#edit-modal");
const addCardModal = document.querySelector("#add-card-modal");
const profileFormElement = editProfileModal.querySelector(".modal__form");
const addCardFormElement = addCardModal.querySelector(".modal__form");
const imageModal = document.querySelector("#modal-image-popup");
const modalImageElement = imageModal.querySelector("#popup__image");
const popUpCaption = document.querySelector("#popup-caption");

///////////////////////
/////BUTTONS////_______
///////////////////////

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
const cardButtonDelete = document.querySelector(".card__button-delete");
const modalCloseImageButton = document.querySelector(
  "#modal-close-image-button"
);

///////////////////////////
////FORM DATA////__________
///////////////////////////

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

//////////////////////////////
////____EVENT HANDLERS____////
//////////////////////////////

//profile submit
function handleProfileFormSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(editProfileModal);
}

//add card form submit
function handleAddCardFormSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardsWrap);
  closeModal(addCardModal);
  e.target.reset();
}

/////////////////////////
//___FUNCTIONS___//
////////////////////////

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

//////////////////////////////////////////////////////////
/* ____________________EVENT LISTENERS__________________*/
//////////////////////////////////////////////////////////

profileFormElement.addEventListener("submit", handleProfileFormSubmit);
addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);

//open profile edit button(function)//
function openEditProfileModal() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(editProfileModal);
}

//open profile to type new name and description//
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
//(disabled submit button everytime it opens with reset validation)//
addNewCardButton.addEventListener("click", () => {
  addFormValidator._resetValidation();
  openModal(addCardModal);
});

//close image modal "X button"//
modalCloseImageButton.addEventListener("click", () => closeModal(imageModal));

//////////////////////
//____VALIDATION____//
//////////////////////

export const validationSettings = {
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__save-button",
  inactiveButtonClass: "modal__save-button_inactive",
  inputErrorClass: "modal__form-input_type_error",
  errorClass: "modal__error-message_visible",
};

const editformValidator = new FormValidator(
  validationSettings,
  profileFormElement
);

editformValidator._enableValidation();

const addFormValidator = new FormValidator(
  validationSettings,
  addCardFormElement
);

addFormValidator._enableValidation();

//create card function//
function createCard(item) {
  const card = new Card(item, "#card-template");
  return card.getView();
}

//render card//
function renderCard(cardData, list) {
  const card = createCard(cardData);
  list.prepend(card);
}

//rendering cards from array//
initialCards.forEach((cardData) => renderCard(cardData, cardsWrap));

///////////////////////
////____EXPORTS____ ///
///////////////////////

export const Modals = {
  cardsWrap: ".cards__list",
  editProfileModal: "#edit-modal",
  addCardModal: "#add-card-modal",
  profileFormElement: ".modal__form",
  addCardFormElement: ".modal__form",
  imageModal: "#modal-image-popup",
  modalImageElement: () => document.querySelector("#popup__image"),
  popUpCaptionaddCardFormElement: "#popup-caption",
  modalImagePopUpaddCardFormElement: "#modal-image-popup",
  modalCloseImageButtonaddCardFormElement: "#modal-close-image-button",
};

export const AllButtons = {
  profileEditButton: ".profile__edit-button",
  profileModalCloseButton: ".modal__close-button",
  addCardModalCloseButton: ".modal__close-button",
  profileTitle: ".profile__title",
  profileDescription: ".profile__description",
  addNewCardButton: ".profile__add-button",
  modalSaveButton: ".modal__save-button",
  modalCloseImageButton: () =>
    document.querySelector("#modal-close-image-button"),
};

export const formData = {
  nameInput: profileFormElement.querySelector(".modal__form-input_type_name"),
  jobInput: profileFormElement.querySelector(
    ".modal__form-input_type_description"
  ),
  cardTitleInput: addCardFormElement.querySelector(
    ".modal__form-input_type_title"
  ),
  cardUrlInput: addCardFormElement.querySelector(".modal__form-input_type_url"),
};

export { modalImageElement, imageModal, popUpCaption };
