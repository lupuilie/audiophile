import createElement from "./../../../utils/createElement.js";

export function aboutSection(productInfo) {
  if (!productInfo) return;

  const about = createElement("section", { className: "about" });
  const features = createElement("div", { className: "features" });
  features.append(createElement("h3", { textContent: "Features" }));
  const featuresTexts = productInfo.features.split("\n\n");
  featuresTexts.forEach((text) =>
    features.append(createElement("p", { textContent: text }))
  );
  const packageDiv = createElement("div", { className: "package" });
  const packageItems = createElement("ul", { className: "package-items" });
  productInfo.includes.forEach((included) => {
    const packageItem = createElement("li", { className: "package-item" });
    const qty = createElement("span", {
      textContent: `${included.quantity}x`,
      className: "qty",
    });
    const item = createElement("span", {
      textContent: included.item,
      className: "item",
    });
    packageItem.append(qty, item);
    packageItems.append(packageItem);
  });
  packageDiv.append(
    createElement("h3", { textContent: "In The Box" }),
    packageItems
  );

  about.append(features, packageDiv);
  return about;
}

export default aboutSection;
