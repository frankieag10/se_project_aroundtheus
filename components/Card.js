import Utils from "../utils/utils.js";
import {
  wrappers,
  validationSettings,
  AllButtons,
  formData,
} from "../pages/index.js";

export default class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._cardTemplate = cardTemplate;
    this._wrappers = wrappers;
  }

  _setEventListeners() {
    const likeButton = this._element.querySelector(".card__like-button");
    const deleteButton = this._element.querySelector(".card__delete-button");

    likeButton.addEventListener("click", this._handleLikeIcon.bind(this));
    deleteButton.addEventListener("click", this._handleDeleteIcon.bind(this));

    this._cardImage.addEventListener(
      "click",
      this._handlePreviewImage.bind(this)
    );
  }

  _handleLikeIcon() {
    this._element
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }

  _handleDeleteIcon() {
    this._element.remove();
    this._element = null;
  }

  _handlePreviewImage(e) {
    e.preventDefault();
    openModal(imageModal);
    popUpCaption.textContent = this._name;
    modalImageElement.src = this._link;
    modalImageElement.alt = this._name;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  getView() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".card__image");
    this._cardTitle = this._element.querySelector(".card__title");

    this._cardImage.src = this._link;
    this._cardTitle.textContent = this._name;
    this._cardImage.alt = this._name;

    this._setEventListeners();
    return this._element;
  }
}

//const Cards = new Card();
//Cards.method();
