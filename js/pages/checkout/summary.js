import createElement from "../../utils/createElement.js";
import { formatUsd } from "./../../utils/string.js";

export function productsList(products) {
  const ul = createElement("ul", { className: "products-list" });
  products.forEach((product) => {
    const li = createElement("li", { className: "product" });
    const img = createElement("img", {
      src: `./images/cart/image-${product.slug}.jpg`,
      className: "product-image",
      alt: product.name,
    });
    const productDetails = createElement("div", {
      className: "product-details",
    });
    const productTitle = createElement("div", { className: "product-title" });
    const productName = createElement("p", {
      textContent: product.name,
      className: "product-name",
    });
    const productPrice = createElement("p", {
      textContent: formatUsd(product.value),
      className: "product-price",
    });
    const productQty = createElement("span", {
      textContent: `x${product.qty}`,
    });
    productTitle.append(productName, productPrice);
    productDetails.append(productTitle, productQty);
    li.append(img, productDetails);

    ul.append(li);
  });

  return ul;
}

export function summaryInfo(AppCart) {
  const summaryInfoDiv = createElement("div", { className: "summary-info" });
  const subtotalSummaryLine = createElement("p", { className: "summary-line" });
  subtotalSummaryLine.append(
    createElement("span", { textContent: "Total", className: "left" })
  );
  subtotalSummaryLine.append(
    createElement("span", {
      textContent: formatUsd(AppCart.getTotalValue()),
      className: "h6",
    })
  );
  const shippingSummaryLine = createElement("p", { className: "summary-line" });
  shippingSummaryLine.append(
    createElement("span", { textContent: "Shipping", className: "left" })
  );
  shippingSummaryLine.append(
    createElement("span", {
      textContent: formatUsd(AppCart.shippingCost),
      className: "h6",
    })
  );
  const grandTotalSummaryLine = createElement("p", {
    className: "summary-line",
  });
  grandTotalSummaryLine.append(
    createElement("span", { textContent: "Grand Total", className: "left" })
  );
  grandTotalSummaryLine.append(
    createElement("span", {
      textContent: formatUsd(AppCart.getGrandTotal()),
      className: "h6 orange",
    })
  );

  summaryInfoDiv.append(
    subtotalSummaryLine,
    shippingSummaryLine,
    grandTotalSummaryLine
  );
  return summaryInfoDiv;
}
