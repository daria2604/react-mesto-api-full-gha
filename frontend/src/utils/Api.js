class Api {
  #baseUrl
  #headers

  constructor(options) {
    this.#baseUrl = options.baseUrl
    this.#headers = options.headers
  }

  #checkResponse(res) {
    if(res.ok) {
      return res.json()
    }

    return Promise.reject(`Ошибка: ${res.status}`)
  }

  #request(endpoint, options) {
    return fetch(this.#baseUrl + endpoint, options).then(this.#checkResponse)
  }

  getInitialInfo() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()])
  }

  getInitialCards() {
    return this.#request('/cards', {
      credentials: 'include',
      headers: this.#headers
    })
  }

  getUserInfo() {
    return this.#request('/users/me', {
      credentials: 'include',
      headers: this.#headers
    })
  }

  updateUserInfo({ name, about }) {
    return this.#request('/users/me', {
      method: 'PATCH',
      credentials: 'include',
      headers: this.#headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
  }

  addCard({ title, link }) {
    return this.#request('/cards', {
      method: 'POST',
      credentials: 'include',
      headers: this.#headers,
      body: JSON.stringify({
        name: title,
        link: link
      })
    })
  }

  updateAvatar({ avatar }) {
    return this.#request('/users/me/avatar', {
      method: 'PATCH',
      credentials: 'include',
      headers: this.#headers,
      body: JSON.stringify({
        avatar: avatar
      })
    })
  }

  deleteCard(cardId) {
    return this.#request('/cards/' + cardId, {
      method: 'DELETE',
      credentials: 'include',
      headers: this.#headers
    })
  }

  likeCard(cardId) {
    return this.#request('/cards/' + cardId + '/likes', {
      method: 'PUT',
      credentials: 'include',
      headers: this.#headers
    })
  }

  unlikeCard(cardId) {
    return this.#request('/cards/' + cardId + '/likes', {
      method: 'DELETE',
      credentials: 'include',
      headers: this.#headers
    })
  }
}

const api = new Api({
  baseUrl: 'https://api.mesto.dvr.nomoreparties.co',
  headers: {
    'Content-Type': 'application/json'
  }
})

export default api;

