export const navbarSearchBtn = document.querySelector(".search-btn");
export const navbarUserBtn = document.querySelector(".user-btn");
export const navbarCartBtn = document.querySelector(".cart-btn");
export const categoriesSection = document.querySelector("main .categories");
export const mainEl = document.querySelector("main");
export const mainContainer = document.querySelector("main .container");
export function addSection(node) {
  mainContainer.insertBefore(node, categoriesSection);
}
export const loader = document.querySelector(".loader");
