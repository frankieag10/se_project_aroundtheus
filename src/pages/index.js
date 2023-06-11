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

//CONST VALIDATORS//
const editFormValidator = new FormValidator(validationSettings, profileFormElement);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(validationSettings, addCardFormElement);
addFormValidator.enableValidation();

//CONST FOR CARD//
const userInfo = new UserInfo({ userNameSelector, userDescriptionSelector, avatarSelector });
//api.getUserInfo().then((res) => console.log(res));

let userId;
api.getUserInfo().then((userData) => {
  userId = userData._id;
  userInfo.setUserInfo({
    title: userData.name,
    description: userData.about,
  });
  userInfo.setAvatarInfo(userData.avatar);
});

export const cardTemplate = document.querySelector("#card-template").content.querySelector(".card");

const modalWithImage = new PopupWithImage({
  modalSelector: imageModalSelector,
});

const changeProfilePopup = new PopupwithForm({
  modalSelector: modalChangeProfileSelector,
  handleFormSubmit: (data) => {
    api.updateUserProfile({ avatar: data.url }).then((data) => {
      userInfo.setAvatarInfo(data.avatar);
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
      })
      .finally(() => {
        modalFormUser.renderLoading(false);
      });
  },
  loadingText: "Saving...",
});

api.getInitialCards().then((cardData) => {
  const cardSection = new Section(
    {
      data: cardData,
      render: renderCard,
    },
    cardListSelector
  );

  function renderCard(cardData) {
    const cardImage = createCard(cardData);
    cardSection.prependItem(cardImage);
  }

  cardSection.renderItems();
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

api.getInitialCards().then((cardData) => {
  const cardSection = new Section(
    {
      data: cardData,
      render: renderCard,
    },
    cardListSelector
  );

  function renderCard(cardData) {
    const cardImage = createCard(cardData);
    cardSection.prependItem(cardImage);
  }

  cardSection.renderItems();
});

const deleteModal = new PopupWithForm({
  handleFormSubmit: () => {
    deleteModal.renderLoading(true);
  },
  modalSelector: cardDeleteModal,

  loadingText: "Deleting...",
});

editFormValidator.enableValidation();
addFormValidator.enableValidation();

//EVENT LISTENERS(PROFILE BUTTON AND NEW CARD BUTTON)//
modalFormImage.setEventListeners();
modalWithImage.setEventListeners();
modalFormUser.setEventListeners();
deleteModal.setEventListeners();
changeProfilePopup.setEventListeners();

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
editButtonAvatar.addEventListener("click", () => {
  changeProfilePopup.open();
});

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
          const id = card.getId();
          api.removeCard(id);
          const modalFormImage = new PopupWithForm({
            modalSelector: cardModalSelector,
            handleFormSubmit: (data) => {
              console.log(data);
              modalFormImage.renderLoading(true);
              api
                .addCard(data)
                .then((data) => {
                  renderCard(data);
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

          card.handleDeleteIcon();
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
