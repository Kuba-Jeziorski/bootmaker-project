export const handleGalleryImgsHidden = () => {
  const ind = 1;

  const allGalleryImgs = document.querySelectorAll(".gallery-imgs img");
  [...allGalleryImgs].forEach((img, index) =>
    index > ind ? img.classList.add("hidden") : img
  );

  const hiddenGalleryImgs = document.querySelectorAll(
    ".gallery-imgs img.hidden"
  );
  const showMoreSpan = document.querySelector(".gallery-img-button span");

  const amountDifference =
    [...allGalleryImgs].length - [...hiddenGalleryImgs].length;

  if (showMoreSpan) {
    showMoreSpan.textContent =
      amountDifference > 0 ? `(${amountDifference})` : "";
  }
};
