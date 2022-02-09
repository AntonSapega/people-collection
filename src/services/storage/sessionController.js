export const sessionController = {
  setToken(token) {
    sessionStorage.setItem('token', JSON.stringify(token));
  },
  getToken() {
    return sessionStorage.getItem('token');
  },
  removeToken() {
    sessionStorage.removeItem('token');
  },
  setUser(user) {
    delete user.token;
    sessionStorage.setItem('user', JSON.stringify(user));
  },
  getUser() {
    return JSON.parse(sessionStorage.getItem('user'));
  },
  removeUser() {
    sessionStorage.removeItem('user');
  }
}