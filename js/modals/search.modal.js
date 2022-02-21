import createElement from "./../utils/createElement.js";
import { Products, AppModal } from "./../events.js";

function searchModal() {
  const modalContent = createElement("div", { className: "modal-search" });
  const modalSearch = createElement("div", { className: "modal-search" });
  const title = createElement("h2", {
    textContent: "What are you looking for?",
    className: "title",
  });
  const modalSearchWrapper = createElement("div", {
    className: "modal-search-wrapper",
  });
  const searchForm = createElement("form", {
    className: "search-form",
    label: "Search products",
  });
  const modalCloseBtn = createElement("button", {
    className: "modal-back",
    type: "button",
  });
  modalCloseBtn.innerHTML = feather.icons["arrow-left"].toSvg({
    class: "feather-30",
  });
  modalCloseBtn.append(
    createElement("span", {
      textContent: "Close the modal",
      className: "hidden",
    })
  );
  const inputGroup = createElement("div", { className: "input-group" });
  const searchSubmitBtn = createElement("button", {
    className: "search-submit",
  });
  searchSubmitBtn.innerHTML = feather.icons.search.toSvg();
  searchSubmitBtn.append(
    createElement("span", {
      textContent: "Search",
      className: "hidden",
    })
  );
  const searchInput = createElement("input", {
    type: "text",
    className: "search-input",
    placeholder: "Type here",
    label: "Input product name you want to find",
  });
  const clearInput = createElement("button", { className: "clear-input" });
  clearInput.innerHTML = feather.icons.x.toSvg({ class: "feather-18" });
  clearInput.append(
    createElement("span", {
      textContent: "Clear input",
      className: "hidden",
    })
  );
  inputGroup.append(searchSubmitBtn, searchInput, clearInput);
  searchForm.append(modalCloseBtn, inputGroup);

  const searchResultsWrapper = createElement("div", {
    className: "search-results-wrapper",
  });
  const searchResultsHeading = createElement("h6", {
    textContent: "Suggestions",
  });
  const resultsElement = createElement("ul", { className: "results" });

  searchResultsWrapper.append(searchResultsHeading, resultsElement);
  modalSearchWrapper.append(searchForm, searchResultsWrapper);
  modalSearch.append(title, modalSearchWrapper);

  modalContent.append(modalSearch);

  /* Event Listeners */
  modalCloseBtn.addEventListener("click", () => {
    AppModal.closeModal();
  });
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    searchSubmit();
  });
  clearInput.addEventListener("click", (e) => {
    e.preventDefault();
    onSearchInputClear();
  });
  const inputEvents = ["change", "keyup"];
  inputEvents.forEach((event) => {
    searchInput.addEventListener(event, onSearchInputChange);
  });

  /* Functions */
  let searchInputValue = "";
  let isViewingSuggestions = false;

  function addProduct(product) {
    const li = createElement("li");
    li.append(
      createElement("a", {
        textContent: product.name.toUpperCase(),
        href: `./product.html?p=${product.slug}`,
        className: "link",
      })
    );
    resultsElement.append(li);
  }

  async function loadSearchSuggestions() {
    searchInput.value = "";
    clearResults();
    try {
      setHeadingText("Suggestions");
      const products = await Products.getRandom(3);
      products.forEach((product) => addProduct(product));
      isViewingSuggestions = true;
    } catch (err) {
      setHeadingText("Nothing to show");
    }
  }

  function onSearchInputClear() {
    if (isViewingSuggestions) return;
    clearInput.style.display = "none";
    searchInputValue = "";
    loadSearchSuggestions();
  }

  function onSearchInputChange() {
    searchInputValue = searchInput.value.trim();
    if (searchInput.value.length === 0) clearInput.style.display = "none";
    if (searchInputValue.length === 0 && isViewingSuggestions) return;
    if (searchInputValue.length === 0 && !isViewingSuggestions)
      return loadSearchSuggestions();

    if (searchInputValue.length > 0) {
      clearInput.style.display = "block";
      searchSubmit();
    }
  }

  async function searchSubmit() {
    if (searchInputValue.length === 0 && !isViewingSuggestions) {
      loadSearchSuggestions();
    }
    if (searchInputValue.length === 0) return;
    isViewingSuggestions = false;
    clearResults();
    try {
      const products = await Products.getByName(searchInputValue);
      if (products.length === 0) throw "No results";
      setHeadingText("Search results");
      products.forEach((product) => addProduct(product));
    } catch (err) {
      setHeadingText(err);
    }
  }

  function clearResults() {
    resultsElement.innerHTML = "";
  }
  function setHeadingText(text) {
    if (searchResultsHeading.textContent.toLowerCase() === text.toLowerCase())
      return;
    searchResultsHeading.textContent = text;
  }

  /* Add suggestions when modal opens */
  loadSearchSuggestions();

  return modalContent;
}

export default searchModal;
