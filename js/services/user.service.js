import POST from "../utils/POST.js";
import GET from "../utils/GET.js";

const apiEndpoints = {
  users: "./api/users.json",
  login: "https://reqres.in/api/login",
  register: "https://reqres.in/api/register",
};

class UserService {
  constructor() {
    let loggedUser = null;

    const localStorageUser = localStorage.getItem("user");
    if (localStorageUser) loggedUser = JSON.parse(localStorageUser);

    this.setLoggedUser = (user) => (loggedUser = user);
    this.getLoggedUser = () => loggedUser;
  }
  async getUserInfo(email) {
    if (!email) return;
    try {
      const usersList = await GET(apiEndpoints.users);
      const user = usersList.find((user) => user.email === email);
      if (user) return user;
    } catch (err) {
      throw { error: "User not found" };
    }
  }

  async login(user) {
    try {
      const userAuth = await POST(apiEndpoints.login, user);
      const userInfo = await this.getUserInfo(user.email);
      if (userInfo) this.userInfo = userInfo;
      if (userAuth.token) this.token = userAuth.token;

      this.setLoggedUser({ ...userInfo, token: userAuth.token });

      localStorage.setItem("user", JSON.stringify(this.getLoggedUser()));

      return { success: true };
    } catch (err) {
      throw err;
    }
  }

  async register(user) {
    try {
      const userInfo = await POST(apiEndpoints.register, user);
      if (userInfo) return { success: true };
    } catch (err) {
      throw err;
    }
  }
  async logout() {
    this.setLoggedUser(null);
    localStorage.removeItem("user");
  }
}

export default UserService;
