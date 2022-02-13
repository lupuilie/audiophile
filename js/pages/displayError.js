import createElement from "../utils/createElement.js";

function displayError(err) {
  const breadcrumbs = document.querySelector(".breadcrumbs");
  const pageContainer = document.querySelector("main .container");

  const errorElement = createElement("section", { className: "not-found" });
  errorElement.append(createElement("h1", { textContent: "404" }));
  errorElement.append(
    createElement("h2", {
      textContent: "Ooops! You weren't supposed to see this",
    })
  );
  errorElement.append(
    createElement("p", {
      textContent: `ERROR: ${err}`,
    })
  );

  if (breadcrumbs)
    return pageContainer.insertBefore(errorElement, breadcrumbs.nextSibling);
  pageContainer.prepend(errorElement);
}

export default displayError;
