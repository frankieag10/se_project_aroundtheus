import utils from "../utils/utils.js";
import { imageModal, popUpCaption, modalImageElement } from "../pages/index.js";

class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._imageModal = imageModal;
    this._openModal = openModal;
  }

  _setEventListeners() {
    const likeButton = this._element.querySelector(".card__like-button");
    const deleteButton = this._element.querySelector(".card__delete-button");

    likeButton.addEventListener("click", () => this._handleLikeIcon());
    deleteButton.addEventListener("click", () => this._handleDeleteIcon());

    this._cardImage.addEventListener("click", (e) =>
      this._handlePreviewImage(e)
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
export default new Card();
