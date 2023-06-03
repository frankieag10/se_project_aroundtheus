import { data } from "autoprefixer";

export default class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  _setEventListeners() {
    const likeButton = this._element.querySelector(".card__like-button");
    const deleteButton = this._element.querySelector(".card__button-delete");

    likeButton.addEventListener("click", (event) => {
      event.stopPropagation();
      this._handleLikeIcon();
    });

    deleteButton.addEventListener("click", (event) => {
      event.stopPropagation();
      this._handleDeleteIcon();
    });
    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._data);
    });
  }

  _handleLikeIcon() {
    this._element.querySelector(".card__like-button").classList.toggle("card__like-button_active");
  }

  _handleDeleteIcon() {
    this._element.remove();
    this._element = null;
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
