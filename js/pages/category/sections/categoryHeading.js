import createElement from "../../../utils/createElement.js";

function categoryHeading(text) {
  return createElement("h1", {
    textContent: text,
    className: "category-heading",
  });
}

export default categoryHeading;
