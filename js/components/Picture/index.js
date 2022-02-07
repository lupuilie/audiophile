import createElement from "../../utils/createElement.js";

function Picture({
  mobile = null,
  tablet = null,
  desktop = null,
  className = null,
  alt = null,
}) {
  const picture = createElement("picture", { className });
  picture.append(
    createElement("source", {
      media: "(max-width: 500px)",
      srcset: mobile,
    })
  );
  picture.append(
    createElement("source", {
      media: "(min-width: 992px)",
      srcset: desktop,
    })
  );
  picture.append(
    createElement("source", {
      media: "(min-width: 501px)",
      srcset: tablet,
    })
  );
  picture.append(createElement("img", { src: mobile, alt }));
  return picture;
}

export default Picture;
