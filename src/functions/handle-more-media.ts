export const handleMoreMedia = () => {
  const allGalleryImgs = document.querySelectorAll(".gallery-imgs img");
  const showMoreButton = document.querySelector(".gallery-img-button");

  [...allGalleryImgs].forEach((img) => img.classList.remove("hidden"));
  showMoreButton?.classList.add("hidden");
};
