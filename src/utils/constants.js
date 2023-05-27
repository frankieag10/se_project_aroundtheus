export const initialCards = [
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
//MODALS//
export const cardsWrap = document.querySelector(".cards__list");
export const editProfileModal = document.querySelector("#edit-modal");
export const addCardModal = document.querySelector("#add-card-modal");
export const profileFormElement = editProfileModal.querySelector(".modal__form");
export const addCardFormElement = addCardModal.querySelector(".modal__form");
export const imageModal = document.querySelector("#modal-image-popup");
export const modalImageElement = imageModal.querySelector("#popup__image");
export const popUpCaption = document.querySelector("#popup-caption");
export const cardList = document.querySelector(".cards__list");
//BUTTONS//
export const profileEditButton = document.querySelector(".profile__edit-button");
export const profileModalCloseButton = editProfileModal.querySelector(".modal__close-button");
export const addCardModalCloseButton = addCardModal.querySelector(".modal__close-button");
export const profileTitle = document.querySelector(".profile__title");
export const profileDescription = document.querySelector(".profile__description");
export const addNewCardButton = document.querySelector(".profile__add-button");
export const modalSaveButton = document.querySelector(".modal__save-button");
export const cardButtonDelete = document.querySelector(".card__button-delete");
export const modalCloseImageButton = document.querySelector("#modal-close-image-button");
//FORM DATA//
export const nameInput = profileFormElement.querySelector(".modal__form-input_type_name");
export const jobInput = profileFormElement.querySelector(".modal__form-input_type_description");
export const cardTitleInput = addCardFormElement.querySelector(".modal__form-input_type_title");
export const cardUrlInput = addCardFormElement.querySelector(".modal__form-input_type_url");

export const validationSettings = {
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__save-button",
  inactiveButtonClass: "modal__save-button_inactive",
  inputErrorClass: "modal__form-input_type_error",
  errorClass: "modal__error-message_visible",
};

export const Modals = {
  cardsWrap: ".cards__list",
  editProfileModal: "#edit-modal",
  addCardModal: "#add-card-modal",
  profileFormElement: ".modal__form",
  addCardFormElement: ".modal__form",
  imageModal: "#modal-image-popup",
  modalImageElement: () => document.querySelector("#popup__image"),
  popUpCaption: "#popup-caption",
};

export const AllButtons = {
  profileEditButton: ".profile__edit-button",
  profileModalCloseButton: ".modal__close-button",
  addCardModalCloseButton: ".modal__close-button",
  profileTitle: ".profile__title",
  profileDescription: ".profile__description",
  addNewCardButton: ".profile__add-button",
  modalSaveButton: ".modal__save-button",
  modalCloseImageButton: () => document.querySelector("#modal-close-image-button"),
};

export const formData = {
  nameInput: profileFormElement.querySelector(".modal__form-input_type_name"),
  jobInput: profileFormElement.querySelector(".modal__form-input_type_description"),
  cardTitleInput: addCardFormElement.querySelector(".modal__form-input_type_title"),
  cardUrlInput: addCardFormElement.querySelector(".modal__form-input_type_url"),
};
