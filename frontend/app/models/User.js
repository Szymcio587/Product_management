export default class User {
    constructor(username, password, role = 'USER') {
      this.username = username;
      this.password = password;
      this.role = role;
    }
  }
  