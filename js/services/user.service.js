import POST from "../utils/POST.js";

const apiEndpoints = {
  login: "https://reqres.in/api/login",
  register: "https://reqres.in/api/register",
};

class UserService {
  constructor() {
    this.logged = false;

    this.login = async function (user) {
      try {
        const userInfo = await POST(apiEndpoints.login, user);
        if (userInfo.token) this.token = userInfo.token;
        return true;
      } catch (err) {
        throw err;
      }
    };

    this.register = async function (user) {
      try {
        const userInfo = await POST(apiEndpoints.register, user);
        return userInfo;
      } catch (err) {
        console.log(err);
      }
    };
  }
}

export default UserService;
