import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import PopupwithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import "../pages/index.css";
import API from "../components/API.js";
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
  cardDeleteModal,
  modalChangeProfileSelector,
  editButtonAvatar,
  avatarSelector,
  modalProfileForm,
  editModalFormSelector,
  addCardFormSelector,
  avatarModalFormSelector,
} from "../utils/constants.js";
import { data } from "autoprefixer";
import PopupWithForm from "../components/PopupWithForm.js";

//API CONST//
const api = new API({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "e30d567a-d5ea-4872-a247-be3778cbdcd9",
    "Content-Type": "application/json",
  },
});
//test for request

//CONST FOR CARD//
const userInfo = new UserInfo({ userNameSelector, userDescriptionSelector, avatarSelector });

let userId;

const cardSection = new Section(
  {
    data: [],
    render: renderCard,
  },
  cardListSelector
);

function renderCard(cardData) {
  const cardImage = createCard(cardData);
  cardSection.prependItem(cardImage);
}

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cardData]) => {
    userId = userData._id;
    userInfo.setUserInfo({
      title: userData.name,
      description: userData.about,
    });
    userInfo.setAvatarInfo(userData.avatar);
    cardData.forEach((card) => {
      renderCard(card);
    });

    cardSection.renderItems();
  })
  .catch((err) => {
    console.error(err);
  });

export const cardTemplate = document.querySelector("#card-template").content.querySelector(".card");

const modalWithImage = new PopupWithImage({
  modalSelector: imageModalSelector,
});

const changeProfilePopup = new PopupWithForm({
  modalSelector: modalChangeProfileSelector,
  handleFormSubmit: (data) => {
    changeProfilePopup.renderLoading(true);
    api
      .updateUserProfile({ avatar: data.url })
      .then((data) => {
        userInfo.setAvatarInfo(data.avatar);
        changeProfilePopup.close();
      })
      .catch(console.error)
      .finally(() => {
        changeProfilePopup.renderLoading(false);
      });
  },
  loadingText: "Saving...",
});

const modalFormUser = new PopupwithForm({
  modalSelector: profileModalSelector,
  handleFormSubmit: (data) => {
    modalFormUser.renderLoading(true);
    api
      .userEditProfile(data)
      .then((data) => {
        userInfo.setUserInfo({
          title: data.name,
          description: data.about,
        });
        userInfo.setAvatarInfo(data.avatar);
        modalFormUser.close();
      })
      .catch(console.error)
      .finally(() => {
        modalFormUser.renderLoading(false);
      });
  },
  loadingText: "Saving...",
});

const modalFormImage = new PopupWithForm({
  modalSelector: cardModalSelector,
  handleFormSubmit: (data) => {
    console.log(data);
    modalFormImage.renderLoading(true);
    api
      .addCard(data)
      .then((data) => {
        renderCard(data);
        modalFormImage.close();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        modalFormImage.renderLoading(false);
      });
  },
  loadingText: "Saving...",
});

const deleteModal = new PopupWithForm({
  handleFormSubmit: () => {
    deleteModal.renderLoading(true);
  },
  modalSelector: cardDeleteModal,
  loadingText: "Deleting...",
});

//EVENT LISTENERS(PROFILE BUTTON AND NEW CARD BUTTON)//
modalFormImage.setEventListeners();
modalWithImage.setEventListeners();
modalFormUser.setEventListeners();
deleteModal.setEventListeners();
changeProfilePopup.setEventListeners();
modalFormUser.setEventListeners();

const formValidators = {};

// enable validation
const enableValidation = (validationSettings) => {
  const formList = Array.from(document.querySelectorAll(validationSettings.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(validationSettings, formElement);

    const formId = formElement.getAttribute("id");

    formValidators[formId] = validator;
    validator.enableValidation();
  });
};

enableValidation(validationSettings);

//open profile to change name/description
profileEditButton.addEventListener("click", () => {
  modalFormUser.open();
  const userData = userInfo.getUserInfo();
  modalNameInput.value = userData.userName;
  modalDescriptionInput.value = userData.userDescription;
  if (formValidators.hasOwnProperty(editModalFormSelector))
    formValidators[editModalFormSelector].resetValidation();
});

//add new card
addNewCardButton.addEventListener("click", () => {
  modalFormImage.open();
  if (formValidators.hasOwnProperty(addCardFormSelector)) {
    formValidators[addCardFormSelector].resetValidation();
  }
});

//change avatar picture
editButtonAvatar.addEventListener("click", () => {
  changeProfilePopup.open();
  if (formValidators.hasOwnProperty(avatarModalFormSelector)) {
    formValidators[avatarModalFormSelector].resetValidation();
  }
});

//create card//
function createCard(cardData) {
  const likes = cardData.likes || [];
  const card = new Card(
    {
      cardData: {
        ...cardData,
        likes: likes,
      },
      myId: userId,
      handleCardClick: (data) => {
        modalWithImage.open(data);
      },

      handleDeleteClick: () => {
        deleteModal.open();
        deleteModal.setSubmitAction(() => {
          deleteModal.renderLoading(true);
          const id = card.getId();
          api
            .removeCard(id)
            .then(() => {
              card.handleDeleteIcon();
              deleteModal.close();
            })
            .catch(console.error)
            .finally(() => {
              deleteModal.renderLoading(false);
            });
        });
      },

      handleLikeClick: () => {
        const id = card.getId();
        if (card.isLiked()) {
          api
            .unLikeCard(id)
            .then((data) => {
              card.setLikes(data.likes);
            })
            .catch((err) => console.error(err));
        } else {
          api
            .likeCard(id)
            .then((data) => {
              card.setLikes(data.likes);
            })
            .catch((err) => console.error(err));
        }
      },
    },
    "#card-template"
  );
  return card.getView();
}
