import createElement from "../../../utils/createElement.js";
import Picture from "../../../components/Picture/index.js";

function imageGallerySection(productInfo) {
  const { gallery, name } = productInfo;
  const imageGallery = createElement("section", { className: "image-gallery" });

  const image1 = Picture({
    ...gallery.first,
    className: "image-1",
    alt: `${name} image 1 `,
  });
  const image2 = Picture({
    ...gallery.second,
    className: "image-2",
    alt: `${name} image 2`,
  });
  const image3 = Picture({
    ...gallery.third,
    className: "image-3",
    alt: `${name} image 3`,
  });

  imageGallery.append(image1, image2, image3);

  return imageGallery;
}

export default imageGallerySection;
