import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import PopupwithForm from "../components/PopupwithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import "../pages/index.css";
import {
  profileFormElement,
  addCardFormElement,
  initialCards,
  cardList,
  validationSettings,
  userDescriptionSelector,
  userNameSelector,
  profileModalSelector,
  cardModalSelector,
  cardListSelector,
  profileEditButton,
  modalNameInput,
  modalDescriptionInput,
  addNewCardButton,
  imageModalSelector,
} from "../utils/constants.js";

//CONST VALIDATORS//
const editFormValidator = new FormValidator(validationSettings, profileFormElement);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(validationSettings, addCardFormElement);
addFormValidator.enableValidation();

//CONST FOR CARD//
const userInfo = new UserInfo({ userNameSelector, userDescriptionSelector });

export const cardTemplate = document.querySelector("#card-template").content.querySelector(".card");

const modalWithImage = new PopupWithImage({
  modalSelector: imageModalSelector,
  handleImageClick: handleCardClick,
});

const modalFormUser = new PopupwithForm({
  modalSelector: profileModalSelector,
  handleFormSubmit: (cardData) => {
    userInfo.setUserInfo(cardData);
  },
});

const modalFormImage = new PopupwithForm({
  modalSelector: cardModalSelector,
  handleFormSubmit: (inputValues) => {
    const name = inputValues.title;
    const link = inputValues.url;

    renderCard({ link, name }, cardList);
  },
});

const cardSection = new Section(
  {
    data: initialCards,
    render: renderCard,
  },
  cardListSelector
);
cardSection.renderItems();

editFormValidator.enableValidation();
addFormValidator.enableValidation();

//EVENT LISTENERS(PROFILE BUTTON AND NEW CARD BUTTON)//
modalFormImage.setEventListeners();
modalWithImage.setEventListeners();
modalFormUser.setEventListeners();

profileEditButton.addEventListener("click", () => {
  modalFormUser.open();
  const userData = userInfo.getUserInfo();
  modalNameInput.value = userData.userName;
  modalDescriptionInput.value = userData.userDescription;
  editFormValidator.resetValidation();
});
addNewCardButton.addEventListener("click", () => {
  addFormValidator.resetValidation();
  modalFormImage.open();
});

//CARD RENDER (FUNCTION)//
function renderCard(cardData) {
  const cardImage = createCard(cardData);
  cardSection.addItem(cardImage);
}

function createCard(cardData) {
  const card = new Card(
    {
      name: cardData.name,
      link: cardData.link,
    },
    "#card-template"
  );

  const cardElement = card.getView();
  cardElement.addEventListener("click", () => handleCardClick(cardData));
  return cardElement;
}

function handleCardClick(cardData) {
  if (cardData && cardData.link && cardData.name) {
    modalWithImage.open({ link: cardData.link, name: cardData.name });
  }
}
