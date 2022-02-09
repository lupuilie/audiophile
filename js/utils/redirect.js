function redirect(to) {
  if (!to) return;

  if (to === "404" || to === 404) {
    window.location.href = "/404.html";
  }
}

export default redirect;
