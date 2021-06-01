export class ApiMain {
    constructor(options) {
      this._baseUrl = options.baseUrl;
      this._headers = options.headers;
    }
  
    //униформа запроса и ответа
    _getResponseData(response) {
      return response.then((res, req) => {
        if (res.ok) {
          return res.json();
        }
        if (res.status === 409 || res.status === 404 || res.status === 400) {
          return Promise.reject({
            status: res.status,
            text: res.statusText,
          });
        }
        return Promise.reject(
          new Error(`Ошибка получения данных: ${res.status} ${res.statusText}`)
        );
      });
    }
  
    // регистрация пользователя
    register(name, email, password) {
      return this._getResponseData(
        fetch(`${this._baseUrl}/signup`, {
          method: "POST",
          headers: this._headers,
          body: JSON.stringify({
            name: name,
            email: email,
            password: password,
          }),
        })
      );
    }
  
    //авторизация юзера
    login(email, password) {
      return this._getResponseData(
        fetch(`${this._baseUrl}/signin`, {
          method: "POST",
          headers: this._headers,
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        })
      );
    }
  
    //валидация токена
    checkToken(token) {
      return this._getResponseData(
        fetch(`${this._baseUrl}/users/me`, {
          method: "GET",
          headers: {
            ...this._headers,
            Authorization: `Bearer ${token}`,
          },
        })
      );
    }
  
    //получить данные профиля
    getCurrentUser(token) {
      return this._getResponseData(
        fetch(`${this._baseUrl}/users/me`, {
          method: "GET",
          headers: {
            ...this._headers,
            Authorization: `Bearer ${token}`,
          },
        })
      );
    }
  
    //изменить данные профиля
    editProfile(data) {
      console.log(data);
      const token = localStorage.getItem("token");
      return this._getResponseData(
        fetch(`${this._baseUrl}/users/me`, {
          method: "PATCH",
          headers: {
            ...this._headers,
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: data.name,
            email: data.email,
          }),
        })
      );
    }
  
    //получить фильмы из апи нашей БД
    getMovies() {
      const token = localStorage.getItem("token");
      return this._getResponseData(
        fetch(`${this._baseUrl}/movies`, {
          method: "GET",
          headers: {
            ...this._headers,
            Authorization: `Bearer ${token}`,
          },
        })
      );
    }
  
    //Записать фильм в нашу БД
    createMovie(data) {
      const token = localStorage.getItem("token");
      return this._getResponseData(
        fetch(`${this._baseUrl}/movies`, {
          method: "POST",
          headers: {
            ...this._headers,
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            country: data.country,
            director: data.director,
            duration: data.duration,
            year: data.year,
            description: data.description,
            image: data.image,
            trailer: data.trailer,
            thumbnail: data.image,
            movieId: data.id,
            nameRU: data.nameRU,
            nameEN: data.nameEN,
          }),
        })
      );
    }
  
    //удалить фильм из нашей БД
    deleteMovies(movieId) {
      const token = localStorage.getItem("token");
      return this._getResponseData(
        fetch(`${this._baseUrl}/movies/${movieId}`, {
          method: "DELETE",
          headers: {
            ...this._headers,
            Authorization: `Bearer ${token}`,
          },
        })
      );
    }
  }
  
  const apiMain = new ApiMain({
    baseUrl: "https://api.kinopoisk.nomoredomains.club",
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  export default apiMain;