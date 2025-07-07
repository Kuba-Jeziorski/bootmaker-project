import { handleMoreMedia } from "./handle-more-media";

export const getShowMoreButtonSetup = () => {
  const showMoreButton = document.querySelector(".gallery-img-button");

  if (showMoreButton) {
    showMoreButton.addEventListener("click", () => {
      handleMoreMedia();
    });
  }
};
