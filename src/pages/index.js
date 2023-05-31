import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Popup from "../components/Popup.js";
import PopupwithForm from "../components/PopupwithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import "../pages/index.css";
import { handleEscKeyDown, openModal, closeModal } from "../utils/utils.js";
import {
  profileFormElement,
  addCardFormElement,
  initialCards,
  cardList,
  validationSettings,
  imageModal,
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

//INITIATING CARD//
const editFormValidator = new FormValidator(validationSettings, profileFormElement);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(validationSettings, addCardFormElement);
addFormValidator.enableValidation();

const userInfo = new UserInfo({ userNameSelector, userDescriptionSelector });

export const modalWithImage = new PopupWithImage({ modalSelector: imageModalSelector });

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
    renderer: renderCard,
  },
  cardListSelector
);
cardSection.renderItems();

editFormValidator.enableValidation();
addFormValidator.enableValidation();
//SET EVENT LISTENERS//
modalFormImage.setEventListeners();
modalWithImage.setEventListeners();
modalFormUser.setEventListeners();

//create card function//
/*function createCard(item) {
  const card = new Card(item, "#card-template");
  return card.getView();
}

//render card//
function renderCard(cardData, list) {
  const card = createCard(cardData);
  list.prepend(card);
}

//rendering cards from array//
initialCards.forEach((cardData) => renderCard(cardData, cardList));
*/

//SETTING EVENT LISTENERS//

//profile submit
/*function handleProfileFormSubmit(e) {
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
  renderCard({ name, link }, cardList);
  closeModal(addCardModal);
  e.target.reset();
}*/

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

function renderCard(cardData) {
  const cardImage = createCard(cardData);
  cardSection.addItem(cardImage);
}

function createCard(cardData) {
  const card = new Card(
    {
      cardData,
      handleImageClick: (data) => {
        modalWithImage.open(data);
      },
    },
    "#card-template"
  );
  return card.getView();
}

/////////////////////////
//___FUNCTIONS___//
////////////////////////

//close profile,newcard,and image oustside of modal function//
/*const clickOffPopUp = (modalElement) => {
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
clickOffPopUp(addCardModal);*/

//////////////////////////////////////////////////////////
/* ____________________EVENT LISTENERS__________________*/
//////////////////////////////////////////////////////////

//profileFormElement.addEventListener("submit", handleProfileFormSubmit);
//addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);

//open profile edit button(function)//
/*function openEditProfileModal() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(editProfileModal);
}

//open profile to type new name and description//
profileEditButton.addEventListener("click", openEditProfileModal);

//close profile edit button//
profileModalCloseButton.addEventListener("click", () => closeModal(editProfileModal));

//close newcard popup//
addCardModalCloseButton.addEventListener("click", () => closeModal(addCardModal));

//open new card button//
//(disabled submit button everytime it opens with reset validation)//
addNewCardButton.addEventListener("click", () => {
  addFormValidator.resetValidation();
  openModal(addCardModal);
});

//close image modal "X button"//
modalCloseImageButton.addEventListener("click", () => closeModal(imageModal));

/////for popupwithForm.js and popup.js/////////
//const newCardPopup = new popupWithForm("#add-card-modal", () => {});
//newCardPopup.open();
//newCardPopup.close();
*/
export const cardTemplate = document.querySelector("#card-template").content.querySelector(".card");
