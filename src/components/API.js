export default class Api {
  constructor({ baseUrl, headers }) {
    (this._baseUrl = baseUrl), (this._headers = headers);
  }

  //GET INITIAL CARDS//
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.error(err);
      });
  }

  //ADD NEW CARD//
  addCard({ title, url }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: title,
        link: url,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.error(err);
      });
  }

  //REMOVE CARD(TRASH CAN BUTTON)//
  removeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.error(err);
      });
  }

  //GET USER INFO//
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  //USER EDIT PROFILE//
  userEditProfile({ title, description }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: title,
        about: description,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.error(err);
      });
  }

  //GET COUNT LIKES FOR CARD//
  getLikesCount(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: "GET",
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((likeData) => {
        console.log(likeData);
        return likeData;
      })
      .catch((err) => console.error(err));
  }

  //LIKE CARD//
  likeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((likeData) => {
        console.log(likeData);
        return likeData;
      })
      .catch((err) => console.error(err));
  }

  //UNLIKE CARD//
  unLikeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((likeData) => {
        console.log(likeData);
        return likeData;
      })
      .catch((err) => console.error(err));
  }

  //UPDATE USER PROFILE//
  updateUserProfile(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(avatar),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((data) => {
        return data;
      })
      .catch((err) => console.error(err));
  }
}
