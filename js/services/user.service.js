import POST from "../utils/POST.js";
import GET from "../utils/GET.js";

const apiEndpoints = {
  usersId: "./api/users.json",
  login: "https://reqres.in/api/login",
  register: "https://reqres.in/api/register",
};

class UserService {
  constructor() {
    this.logged = false;

    this.getUserInfo = async function (email) {
      if (!email) return;
      try {
        const usersList = await GET(apiEndpoints.usersId);
        const user = usersList.find((user) => user.email === email);
        if (user) return user;
      } catch (err) {
        throw { error: "User not found" };
      }
    };

    this.login = async function (user) {
      try {
        const userAuth = await POST(apiEndpoints.login, user);
        const userInfo = await this.getUserInfo(user.email);
        this.userInfo = userInfo;
        if (userAuth.token) this.token = userAuth.token;

        localStorage.setItem(
          "user",
          JSON.stringify({ ...this.userInfo, token: this.token })
        );

        return true;
      } catch (err) {
        throw err;
      }
    };

    this.register = async function (user) {
      try {
        const userInfo = await POST(apiEndpoints.register, user);
        return true;
      } catch (err) {
        throw err;
      }
    };
    this.logout = async function () {
      delete this.userInfo;
      delete this.token;
      localStorage.removeItem("user");
    };
  }
}

export default UserService;
