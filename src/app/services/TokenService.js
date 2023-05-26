class TokenService {
  getLocalRefreshToken() {
    return localStorage.getItem("refreshToken");
  }

  getLocalAccessToken() {
    return localStorage.getItem("accessToken");
  }

  updateLocalRefreshToken(token) {
    localStorage.setItem("refreshToken", token);
  }

  updateLocalAccessToken(token) {
    localStorage.setItem("accessToken", token);
  }
}

export default new TokenService();
