import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Popup from "../components/popup.js";
import PopupwithForm from "../components/popupwithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import {} from "../utils/constants.js";
import { handleEscKeyDown, openModal, closeModal } from "../utils/utils.js";
import {
  imageModal,
  editProfileModal,
  profileTitle,
  profileDescription,
  nameInput,
  jobInput,
  cardTitleInput,
  addCardModal,
  cardUrlInput,
  profileFormElement,
  addCardFormElement,
  profileEditButton,
  profileModalCloseButton,
  addCardModalCloseButton,
  addNewCardButton,
  modalCloseImageButton,
  initialCards,
  cardsWrap,
  cardList,
  validationSettings,
} from "../utils/constants.js";

//INITIATING CARD FROM ARRAY//
const editformValidator = new FormValidator(validationSettings, profileFormElement);
editformValidator.enableValidation();

const addFormValidator = new FormValidator(validationSettings, addCardFormElement);
addFormValidator.enableValidation();

const userInfo = new UserInfo({ profileTitle, profileDescription });

const modalWithImage = new PopupWithImage({ modalSelector: imageModal });

const modalFormUser = new PopupwithForm({
  modalSelector: editProfileModal,
  handleFormSubmit: (data) => {
    userInfo.setUserInfo(data);
  },
});

const modalFormImage = new PopupwithForm({
  modalSelector: addCardModal,
  handleFormSubmit: (inputValues) => {
    const name = inputValues.title;
    const link = inputValues.url;

    renderCard({ link, name }, cardList);
  },
});

//SET EVENT LISTENERS//
modalFormImage.setEventListeners();
modalWithImage.setEventListeners();
modalFormUser.setEventListeners();

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
