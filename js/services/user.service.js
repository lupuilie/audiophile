import { Cart } from "../main.js";
import POST from "../utils/POST.js";

const apiEndpoints = {
  login: "https://reqres.in/api/login",
  register: "https://reqres.in/api/register",
};

class UserService {
  constructor() {
    this.logged = {
      userName: null,
      token: null,
    };

    this.login = async function (user) {
      try {
        const userInfo = await POST(apiEndpoints.login, user);
        this.logged.token = await userInfo.token;
        this.logged.userName = "Lupu Ilie";
      } catch (err) {
        console.log(err);
      }
    };

    this.register = async function (user) {
      try {
        const userInfo = await POST(apiEndpoints.register, user);
        console.log(userInfo);
        return userInfo;
      } catch (err) {
        console.log(err);
      }
    };
  }
}

export default UserService;
