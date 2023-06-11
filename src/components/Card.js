import { data } from "autoprefixer";

export default class Card {
  constructor(
    { cardData, myId, handleLikeClick, handleDeleteClick, handleCardClick },
    cardSelector
  ) {
    this._cardData = cardData;
    this._name = cardData.name;
    this._link = cardData.link;
    this._cardSelector = cardSelector;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
    this._likes = cardData.likes;
    this._owner = cardData.owner;
    this._id = cardData._id;
    this._myId = myId;
    this._handleCardClick = handleCardClick;
  }

  _setEventListeners() {
    this._likeButton = this._element.querySelector(".card__like-button");
    this._deleteButton = this._element.querySelector(".card__button-delete");
    this._likesAmount = this._element.querySelector(".card__like-amount");
    this._likeButton.addEventListener("click", () => this._handleLikeClick());
    this._deleteButton.addEventListener("click", () => this._handleDeleteClick());
    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._cardData);
    });
  }

  getId() {
    return this._id;
  }
  isLiked() {
    return this._likes.some((like) => like._id === this._myId);
  }

  _setLikeCounter() {
    this._likesAmount.textContent = this._likes.length;
  }

  setLikes(likes) {
    this._likes = likes;
    this._handleLikeIcon();
    this.updateLikes();
  }
  updateLikes() {
    this._likesAmount.textContent = this._likes.length;
  }

  _handleLikeIcon() {
    if (this.isLiked()) {
      this._likeButton.classList.add("card__like-button_active");
    } else {
      this._likeButton.classList.remove("card__like-button_active");
    }
  }

  handleDeleteIcon() {
    this._element.remove();
    this._element = null;
  }

  _cardIdOwner() {
    if (this._myId !== this._owner._id) {
      this._deleteButton.classList.add("card__delete-button-hidden");
    }
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
    this._handleLikeIcon();
    this.updateLikes();
    this._cardIdOwner();
    return this._element;
  }
}
