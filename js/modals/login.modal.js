import createElement from "./../utils/createElement.js";
import { loginUser } from "../events.js";

async function loginModal() {
  console.log("loginModal");
  const userInfo = {
    email: "eve.holt@reqres.in",
    password: "pistol",
  };
  const login = await loginUser(userInfo);
  if (login.error) console.log(login.error);
  if (login.success) console.log("utilizator logat");
}

export default loginModal;
